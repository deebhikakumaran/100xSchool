# payments backend

simple node.js + express payments api with jwt auth, mongodb transactions, and zod validation.

## setup

```bash
npm install
npm run dev
```

server runs on port 3000.

## environment

create `.env`:
```
MONGODB_URI=mongodb://localhost:27017/payments
JWT_SECRET=your-secret-key
```

## api routes

### user
- `POST /user/signup` - create account
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "john",
    "lastName": "doe"
  }
  ```
- `POST /signin` - login
- `PUT /user/` - update profile (protected)
- `GET /user/bulk?filter=search` - search users

### account
- `GET /account/balance` - get balance (protected)
- `POST /account/transfer` - send money (protected)
  ```json
  {
    "to": "user_id",
    "amount": 100.50
  }
  ```

## auth

token returned on signin and stored in cookie, automatically sent on all requests.

## key features

- jwt tokens (expires in session)
- bcrypt password hashing
- mongodb transactions for transfers
- zod input validation
- cors enabled

## database

schemas:
- user: email (unique), password (hashed), firstName, lastName
- account: userId, balance 

## notes

- uses bearer token auth (jwt)
- transfers use mongodb transactions (atomic)
- passwords hashed with bcrypt salt 10
- all inputs validated with zod