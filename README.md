# Dashboard V2

A modern productivity dashboard built with React and Firebase for managing tasks and notes with a clean, responsive interface.

## Features

- Authentication with Clerk
- Task Management (Create, Update, Delete, Complete)
- Notes Management (Create, Update, Delete)
- Dashboard Statistics
- Today's Tasks
- Recent Activity
- Responsive Design
- Real-time Data with Firebase
- Global Loading States
- Form Validation

## Tech Stack

- React
- React Router
- Tailwind CSS
- Firebase (Firestore)
- Clerk Authentication
- TanStack Query
- Formik
- Yup
- React Icons
- React Hot Toast

## Installation

```bash
git clone https://github.com/AmaanKhanGit/user-dashboard-v2.git

cd dashboard-v2

npm install

npm run dev
```

## Environment Variables

Create a `.env` file in the project root and add your Firebase and Clerk credentials.

```env
VITE_CLERK_PUBLISHABLE_KEY=[you key here]
NEXT_PUBLIC_CLERK_SIGN_IN_URL=[/your-route-here]

VITE_FIREBASE_API_KEY=[your key here]
VITE_FIREBASE_AUTH_DOMAIN=[your domain here]
VITE_FIREBASE_PROJECT_ID=[your id here]
VITE_FIREBASE_STORAGE_BUCKET=[your bucket here]
VITE_FIREBASE_MESSAGING_SENDER_ID=[your messaging sender id here]
VITE_FIREBASE_APP_ID=[your app id here]
VITE_FIREBASE_MEASUREMENT_ID=[your measurement id here]
```

## Project Structure

```
src/
├── components/
├── firebase/
├── pages/
├── protectedROutes/
├── provider/
├── services/
```

## Getting Started

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## License

This project is intended for learning and portfolio purposes.
