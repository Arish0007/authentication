# Authentication App (NestJS + Next.js + PostgreSQL)

A simple, beginner-friendly app:

- **Register** with your name, gmail and a password.
- **Login** with the same gmail and password.
- After login you see: **"Hello {name}! Welcome to our website"**.

Passwords are stored **encrypted** (using bcrypt), never in plain text.

## What's inside

| Folder      | What it is        | Tech                                  |
| ----------- | ----------------- | ------------------------------------- |
| `backend/`  | The API / server  | NestJS + TypeORM + PostgreSQL         |
| `frontend/` | The web pages     | Next.js (React)                       |

The frontend (port **3000**) sends your form data to the backend (port **3001**),
and the backend saves/reads users from a PostgreSQL database called `myapp`.

---

## Step 1 — Install the tools (one time)

You need:

1. **Node.js** (v20 or newer) — https://nodejs.org
2. **PostgreSQL** — https://www.postgresql.org/download/

Check they are installed:

```bash
node -v
psql --version
```

## Step 2 — Create the database

The backend connects to a database named `myapp` using the user `postgres`
with password `postgres` (you can change these in `backend/src/app.module.ts`).

Create the database:

```bash
# Open the postgres shell (you may be asked for a password)
psql -U postgres

# Inside the psql shell, run:
CREATE DATABASE myapp;

# then quit:
\q
```

> The `user` table is created **automatically** the first time you run the
> backend (because `synchronize: true` is set). You don't need to make tables yourself.

If your Postgres user/password is different, edit these lines in
`backend/src/app.module.ts`:

```ts
username: 'postgres',   // <- your Postgres user
password: 'postgres',   // <- your Postgres password
database: 'myapp',
```

## Step 3 — Run the backend (server)

Open a terminal:

```bash
cd backend
npm install        # download the packages (one time)
npm run start:dev  # start the server with auto-reload
```

You should see: `Backend is running on http://localhost:3001`.
Leave this terminal open.

## Step 4 — Run the frontend (web pages)

Open a **second** terminal:

```bash
cd frontend
npm install   # download the packages (one time)
npm run dev   # start the website
```

Now open your browser at **http://localhost:3000/register**.

## Step 5 — Try it out

1. Go to http://localhost:3000/register and create an account.
2. You are sent to the login page — log in with the same email + password.
3. You land on the welcome page that says **"Hello {your name}! Welcome to our website"**.

---

## How it works (the short version)

**Register**
1. You type name + email + password in `frontend/pages/register.js`.
2. It sends them to the backend route `POST /auth/register`.
3. `backend/src/auth/auth.service.ts` encrypts the password with bcrypt and
   saves the user in PostgreSQL.

**Login**
1. You type email + password in `frontend/pages/login.js`.
2. It sends them to `POST /auth/login`.
3. The backend checks the email exists and the password matches the encrypted
   one. If correct, it returns a token + your name.
4. The frontend saves your name in the browser and shows the welcome page
   (`frontend/pages/welcome.js`).

## Important files to read

- `backend/src/user/user.entity.ts` — the shape of a User (id, name, email, password).
- `backend/src/auth/auth.service.ts` — the register + login logic.
- `backend/src/auth/auth.controller.ts` — the URLs (`/auth/register`, `/auth/login`).
- `backend/src/app.module.ts` — the database connection settings.
- `frontend/pages/register.js`, `login.js`, `welcome.js` — the three pages.
