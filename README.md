# FocusFlow

FocusFlow is a responsive productivity app for tracking focused work sessions, stopwatch runs, tasks, and daily activity from one dashboard.

The project is built with React and Vite, and the current version stores user data in the browser with `localStorage`, so it can run locally without a backend.

## Features

- Create an account and log in with a simple local authentication flow
- Start countdown-based focus sessions with a visual progress ring
- Run an open-ended stopwatch and record lap times
- Add, complete, and delete tasks from a lightweight task manager
- Review recent activity from the dashboard and full history page
- Delete individual history entries or clear the full activity log
- Use the app comfortably on mobile and desktop layouts

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS
- Lucide React
- React Icons
- Browser `localStorage` for persistence

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run In Development

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### Build For Production

```bash
npm run build
```

### Preview The Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build in `dist/`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint across the project

## Project Structure

```text
FocusFlow/
|-- public/
|-- src/
|   |-- app/
|   |   |-- App.jsx
|   |   `-- routes.jsx
|   |-- Components/
|   |   `-- Navbar.jsx
|   |-- Context/
|   |   `-- AuthContext.jsx
|   |-- Layout/
|   |   `-- Layout.jsx
|   |-- Pages/
|   |   |-- Dashboard.jsx
|   |   |-- History.jsx
|   |   |-- Login.jsx
|   |   |-- Signup.jsx
|   |   |-- Stopwatch.jsx
|   |   |-- Task.jsx
|   |   `-- Timer.jsx
|   |-- utils/
|   |   `-- history.js
|   `-- main.jsx
|-- package.json
`-- README.md
```

## How Data Is Stored

FocusFlow currently uses `localStorage`, including:

- `users` for registered accounts
- `currentUser` for the active session
- `tasks` for the task list
- `history` for logged timer sessions, stopwatch runs, and completed tasks

This makes the app easy to demo locally, but it also means the data is tied to the current browser on the current device.

## Routes

- `/login` login screen
- `/signup` account creation screen
- `/dashboard` daily overview and recent activity
- `/timer` countdown timer page
- `/stopwatch` stopwatch and lap tracking page
- `/task` task management page
- `/history` activity history page

## Notes

- Authentication in this version is front-end only and intended for local/demo use
- No external database or API is required to run the project

## Future Improvements

- Move authentication and persistence to a real backend
- Store tasks per user instead of a shared browser task list
- Add notifications or sound alerts for completed timer sessions
- Add tests for core flows such as auth, timer completion, and history updates
