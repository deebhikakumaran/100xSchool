# learning platform — a mini backend for tracking course progress

a full-stack learning management system built with node.js, express, and postgresql. demonstrates **transactions** (atomic updates), **joins** (querying across multiple tables), and real-time progress tracking.

---

## what i built

a backend api that lets users:
- submit problem solutions
- automatically track course completion percentage
- fetch progress across multiple courses
- ensure data consistency via database transactions

no docker needed — uses neon (serverless postgresql).

---

## tech stack

- **runtime:** node.js
- **framework:** express.js
- **database:** postgresql (neon)
- **driver:** pg (node-postgres)
- **config:** dotenv

---

## key concepts demonstrated

### 1. transactions (atomicity)
when a user submits a problem, multiple things happen:
- insert a new submission record
- count total problems in the course
- count user's solved problems
- calculate completion percentage
- update the progress table

if **any** step fails, everything rolls back. this prevents inconsistent data (like a submission recorded but progress not updated).

```javascript
await client.query("BEGIN")     // start transaction
// ... multiple queries ...
await client.query("COMMIT")    // all-or-nothing ✓
// or on error:
await client.query("ROLLBACK")  // undo everything ✗
```

### 2. joins (relational queries)
to get user progress, we join across 3 tables in **one query**:

```sql
SELECT c.title, p.completion_percentage
FROM progress p 
JOIN users u ON p.user_id = u.id 
JOIN courses c ON p.course_id = c.id
WHERE u.id = $1
```

much faster than fetching data separately and stitching it together in code.

### 3. data consistency
- submissions table stores every problem solved
- progress table stores aggregated stats (denormalized for speed)
- both updated together via transactions = no stale data

---

## project structure

```
learning-platform/
├── src/
│   ├── app.js                          # express entry point
│   ├── config/
│   │   └── db.js                       # neon connection pool
│   ├── controllers/
│   │   ├── submitController.js         # POST /submit logic (transactions)
│   │   └── progressController.js       # GET /progress logic (joins)
│   ├── routes/
│   │   ├── submit.js
│   │   └── progress.js
│   └── db/
│       └── schema.sql                  # table definitions + test data
├── .env                                # environment variables
├── package.json
└── README.md
```

---

## setup (what i did)

### step 1: created a neon project
- signed up at neon.tech
- created new project named `learning-platform`
- copied connection string from dashboard

### step 2: installed dependencies
```bash
npm install express pg dotenv
```

### step 3: configured environment
created `.env` file with neon connection string:
```env
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.neon.tech/learning_platform?sslmode=require
```

### step 4: ran database schema
opened neon sql editor and executed `schema.sql`:
- dropped existing tables
- created 5 tables (users, courses, problems, submissions, progress)
- inserted test data (2 users, 3 courses, 7 problems)

### step 5: built the api
wrote 4 main files:
- `submitController.js` — handles problem submissions with transactions
- `progressController.js` — fetches user progress with joins
- `db.js` — manages connection pool
- `app.js` — express server setup

### step 6: tested with curl
started server: `npm run dev`
ran test requests (see below)

---

## testing workflow

### test 1: fetch initial progress

**command:**
```bash
curl "http://localhost:3000/progress?user_id=1"
```

**what it does:**
- queries the progress table with a join across users → progress → courses
- fetches all courses for user_id=1

**expected response (before any submissions):**
```json
[]
```

**actual result from my test:**
```json
[]
```

✅ **passed** — no courses tracked yet

---

### test 2: submit a problem (triggers transaction)

**command:**
```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "problem_id": 1}'
```

**what it does:**
1. inserts submission (user 1 solved problem 1)
2. fetches course_id from problems table (problem 1 is in course 1 = javascript)
3. counts total problems in javascript course (3 total)
4. counts user's solved problems in javascript (1 solved)
5. calculates completion: 1/3 * 100 = 33.33%
6. inserts/updates progress record
7. commits transaction

**expected response:**
```json
{
  "message": "submitted and progress updated successfully."
}
```

**actual result from my test:**
```json
{"message":"submitted and progress updated successfully."}
```

✅ **passed** — submission recorded and progress calculated

---

### test 3: fetch updated progress (with join)

**command:**
```bash
curl "http://localhost:3000/progress?user_id=1"
```

**what it does:**
- queries progress table again
- joins with courses to get course titles
- returns all progress for user 1

**expected response:**
```json
[
  {
    "title": "JavaScript",
    "completion_percentage": "33.33"
  }
]
```

**actual result from my test:**
```json
[{"title":"JavaScript","completion_percentage":"33.33"}]
```

✅ **passed** — progress tracked correctly, joined with course title

---

### test 4: submit another problem (same course)

**command:**
```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "problem_id": 2}'
```

**what it does:**
- inserts new submission (user 1 solved problem 2)
- recalculates javascript progress: 2/3 * 100 = 66.67%
- updates progress via `ON CONFLICT` upsert

**expected response:**
```json
{
  "message": "submitted and progress updated successfully."
}
```

**actual result:**
```json
{"message":"submitted and progress updated successfully."}
```

✅ **passed** — multiple submissions tracked, progress updated correctly

---

### test 5: fetch progress again (should be higher)

**command:**
```bash
curl "http://localhost:3000/progress?user_id=1"
```

**expected response:**
```json
[
  {
    "title": "JavaScript",
    "completion_percentage": "66.67"
  }
]
```

**actual result from my test:**
```json
[{"title":"JavaScript","completion_percentage":"66.67"}]
```

✅ **passed** — completion percentage increased from 33.33 to 66.67

---

## how transactions saved me

let me show why transactions matter.

**without transaction (❌ risky):**
```
1. insert submission ✓
2. count problems ✓
3. calculate percentage ✓
4. update progress ✗ (database error!)

result: submission recorded but progress NOT updated. data is inconsistent.
```

**with transaction (✅ safe):**
```
BEGIN
1. insert submission ✓
2. count problems ✓
3. calculate percentage ✓
4. update progress ✗ (database error!)
ROLLBACK (undo everything)

result: nothing inserted, database stays clean. no partial data.
```

this is why my code uses:
```javascript
try {
  await client.query("BEGIN")
  // ... all the queries ...
  await client.query("COMMIT")
} catch (error) {
  await client.query("ROLLBACK")
}
```

---

## how joins improved performance

**without join (n+1 query problem):**
```
1. query progress table → get [{ user_id, course_id, percentage }]
2. for each row, query courses table → get course title
3. for each row, query users table → get user name

5+ database calls for 1 user's progress
```

**with join (single query):**
```sql
SELECT c.title, p.completion_percentage
FROM progress p
JOIN users u ON p.user_id = u.id
JOIN courses c ON p.course_id = c.id
WHERE u.id = $1
```

1 database call, returns all needed data. much faster.

---

## what i learned

✅ **transactions** prevent data corruption by making multiple database operations atomic (all-or-nothing)

✅ **joins** let you query across related tables efficiently instead of making multiple separate queries

✅ **connection pooling** (built into `pg` driver) reuses database connections instead of creating new ones per request

✅ **on conflict** clause in postgresql lets you do upsert operations (insert or update) without checking first

✅ **neon** makes it easy to host postgres without docker or local setup

---

## testing summary

| test | endpoint | method | result |
|------|----------|--------|--------|
| fetch progress (empty) | /progress?user_id=1 | GET | ✅ empty array |
| submit problem 1 | /submit | POST | ✅ recorded, 33.33% |
| fetch progress (1 solved) | /progress?user_id=1 | GET | ✅ returned 33.33% |
| submit problem 2 | /submit | POST | ✅ recorded, 66.67% |
| fetch progress (2 solved) | /progress?user_id=1 | GET | ✅ returned 66.67% |

all tests passed. data consistency maintained throughout.

---

## key files explained

### submitController.js
handles `POST /submit`:
- validates user_id and problem_id
- starts transaction
- inserts submission
- counts problems/solved
- calculates completion
- updates progress
- commits or rolls back

~70 lines, core logic of the whole system.

### progressController.js
handles `GET /progress?user_id=1`:
- extracts user_id from query params
- joins progress → users → courses
- returns user's completion across all courses

~30 lines, simple join query.

### db.js
creates and manages connection pool:
- loads `.env` variables
- creates pool with neon connection string
- logs connection events
- exported globally so all controllers use the same pool

### schema.sql
defines database structure:
- 5 tables with proper foreign keys
- cascade delete to prevent orphaned records
- indexes on frequently queried columns
- test data (2 users, 3 courses, 7 problems)

---

## next steps i could build

- add authentication (jwt/oauth)
- add problem details endpoint
- add course management endpoints
- add user leaderboards
- build a react frontend
- deploy to vercel + neon

but for now, the core transaction + join concepts work perfectly ✓

---

## conclusion

built a working learning platform that demonstrates:
- ✅ database transactions for data consistency
- ✅ sql joins for efficient querying
- ✅ rest api design with express
- ✅ postgresql with neon (no docker)
- ✅ real-world error handling

tested end-to-end with curl. all passing.