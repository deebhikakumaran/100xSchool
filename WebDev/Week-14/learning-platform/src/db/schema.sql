DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS problems CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id),
    description TEXT NOT NULL
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    problem_id INT REFERENCES problems(id),
    submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
    user_id INT REFERENCES users(id),
    course_id INT REFERENCES courses(id),
    completion_percentage NUMERIC(5, 2) DEFAULT 0,
    PRIMARY KEY (user_id, course_id)
);

INSERT INTO users (name, email) VALUES 
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com');

INSERT INTO courses (title) VALUES 
  ('JavaScript'),
  ('Python'),
  ('SQL');

INSERT INTO problems (course_id, description) VALUES 
  (1, 'Reverse a string'),
  (1, 'Check palindrome'),
  (1, 'Find duplicates'),
  (2, 'List comprehension'),
  (2, 'Lambda functions');