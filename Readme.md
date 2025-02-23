# MelodyVerse

MelodyVerse is a full-stack authentication system for a fictional music streaming service. It is built using **Node.js, Express, TypeScript, Prisma ORM** on the backend and **Vite, TypeScript, TailwindCSS, ShadCN UI, Zustand** on the frontend. The project includes secure authentication with JWT and httpOnly cookies, ensuring protection against XSS attacks.

## Features

- **Authentication**: Sign-up, login, and JWT-based authentication
- **Security**: Rate limiting, httpOnly cookie authentication
- **User Experience**:
  - Password reset functionality
  - Password visibility toggle
  - Animations using Framer Motion
- **Database**: Prisma ORM with PostgreSQL (or other supported databases)
- **Frontend**: Modern UI with TailwindCSS and ShadCN UI components
- **State Management**: Zustand for client-side state handling

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/Deep-Thakkar-1910/infloso-assessment.git melody-verse
cd melody-verse
```

### 2. Backend Setup

#### Install dependencies

```sh
cd server
npm install
```

#### Setup environment variables

```sh
cp .env.example .env
```

You need to configure the `DATABASE_URL` in `.env` with your **PostgreSQL instance URL**. You can either:

- Use a **Docker-based PostgreSQL** setup.
- Provide a **remote PostgreSQL instance URL** from a cloud provider (e.g., Supabase, Railway, NeonDB, or your own hosted database).

#### Migrate the database

```sh
npx prisma db push
```

#### Run the backend in development mode

```sh
npm run dev
```

---

### 3. Frontend Setup

#### Install dependencies

```sh
cd ../client
npm install --legacy-peer-deps
```

#### Setup environment variables

```sh
cp .env.example .env
```

#### Run the development server

```sh
npm run dev
```

---

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Authenticate user and return JWT
- **POST** `/api/auth/reset-password` - Initiate password reset

### User Data Endpoint

- **GET** `/api/dashboard-data` - For getting user data and persistent auth

### Middleware & Security

- **Rate Limiting**: Protection against brute-force attacks
- **HttpOnly Cookies**: Prevents XSS attacks

---

## Additional Notes

- The frontend uses **React 19**, so `--legacy-peer-deps` is required during installation.
- The backend uses **Prisma ORM**, and database migrations are handled via `npx prisma db push`.
- Animations are implemented using **Framer Motion** for smooth UI transitions.
- Passwords are hashed securely using **bcryptjs**.

<h1 align="center">THANK YOU</h1>
