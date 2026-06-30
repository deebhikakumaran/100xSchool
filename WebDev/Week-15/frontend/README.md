# payments frontend

a simple money-transfer app frontend with three pages.

## pages

- **signup** — create an account with email, first name, last name, and password. posts to `/user/signup`.
- **signin** — log in with email and password. posts to `/user/signin`, stores the user id in localstorage.
- **dashboard** — shows your balance, lets you search users, and send money to them. uses `/account/balance`, `/user/bulk`, and `/account/transfer`.

## setup

backend should be running at `http://localhost:3000`.

```
npm install
npm run dev
```

## notes

- built with react (hooks: usestate, useeffect).
- styling is inline, black and white only.
- requests use `credentials: include` for cookie-based auth.