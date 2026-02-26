# MCM Time Tracking

Full-stack time tracking app with role-based dashboards for employees and admins.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS 4, React Router, Firebase Web SDK
- Backend: Node.js, Express 5, Firebase Admin SDK, Firestore
- Data/Auth: Firebase Authentication + Cloud Firestore

## Project Structure

```text
MCMTimeTracking/
  backend/    # Express API + Firebase Admin
  frontend/   # React + Vite client
```

## Prerequisites

- Node.js 20+
- npm 10+
- Firebase project with Authentication and Firestore enabled
- Firebase service account credentials (for backend)

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (`backend/.env`)

```env
PORT=5000
FIREBASE_API_KEY=
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

Notes:
- `FIREBASE_PRIVATE_KEY` must keep escaped newlines (`\\n`) in `.env`.
- `VITE_BACKEND_URL` should point to your running API server.

## Local Development

Open two terminals.

### 1) Run backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000` by default.

### 2) Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (default Vite port).

## Available Scripts

### Backend

- `npm start`: run API with Node watch mode

### Frontend

- `npm run dev`: start Vite dev server
- `npm run build`: build production assets
- `npm run preview`: preview production build
- `npm run lint`: run ESLint
- `npm run deploy`: build and deploy via Firebase CLI

## Authentication and Roles

- Users authenticate with Firebase Auth.
- User profiles are stored in Firestore `users` collection.
- `role` controls route access:
  - `admin`: admin dashboard/reports/settings
  - `employee`: employee dashboard/settings

## Main API Routes

Base URL: `/api`

### Attendance (`/attendance`)

- `GET /history` (auth required)
- `GET /status` (auth required)
- `POST /punch-in` (auth required)
- `POST /punch-out` (auth required)

### Admin (`/admin`)

- `GET /users` (auth + admin)
- `GET /punches` (auth + admin)
- `PUT /punches/:id` (auth + admin)
- `GET /daily-reports/:date` (auth + admin)
- `GET /daily-reports/month/:month` (auth + admin)
- `POST /register`
- `POST /login`

## Data Collections (Firestore)

- `users`
- `attendance`
- `dailySummary`

## Deployment Notes

- `frontend/firebase.json` and `backend/vercel.json` are included for deployment configuration.
- Update `VITE_BACKEND_URL` in frontend env to your deployed backend URL.
