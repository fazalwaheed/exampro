# ExamPro

ExamPro is a React + Vite MDCAT preparation platform with two separate areas:

- `Admin panel` for managing the website, student accounts, and MCQ bank
- `Student panel` for email-based login, OTP verification, and exam practice

## Current Features

- Separate protected routes for admin and student users
- Student registration with unique email enforcement
- Student login using email only
- OTP verification flow for registration and login
- Single active session restriction per student email
- Admin dashboard for controlling platform data
- Admin MCQ management with persistent local storage
- Student list with verification and status visibility

## Demo Access

### Admin

- Email: `admin@mdcatprep.com`
- Password: `admin123`

### Student OTP

- OTP code: `123456`

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- The current authentication and admin controls are implemented with local browser storage for frontend demo purposes.
- OTP sending is mocked in the UI.
- For production, the auth flow should be moved to a backend with real email delivery and server-side session control.
