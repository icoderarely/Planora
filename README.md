# Planora

Small event booking app. Browse events, book seats, and manage bookings.

**Stack:** Vite + React (frontend) · Express + MongoDB (backend)

## Progress

- Express server with MongoDB (Docker Compose)
- Auth API: register, login, OTP email verification
- User & OTP models, JWT tokens, error handling

Frontend not started yet.

## Setup

### Prerequisites

- Node.js
- Docker

### 1. Start MongoDB

```bash
cp server/.env.example .env
# edit .env with your Mongo credentials

docker compose up -d
```

### 2. Backend

```bash
cd server
cp .env.example .env
# set MONGODB_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS

npm install
npm run dev
```

Server runs at `http://localhost:5000`.

### Auth endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account + send OTP |
| POST | `/api/auth/verify-otp` | Verify email |
| POST | `/api/auth/login` | Login (JWT) |

### 3. Frontend (coming soon)

```bash
cd client
npm install
npm run dev
```
