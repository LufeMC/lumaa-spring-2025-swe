# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a "Task Management" application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus on **correctness**, **functionality**, and **code clarity** rather than visual design.  
This challenge is intended to be completed within ~3 hours, so keep solutions minimal yet functional.

---

## Requirements

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a token (e.g., JWT)
- **Secure the Tasks Routes**: Only authenticated users can perform task operations.  
  - **Password Hashing**: Use `bcrypt` or another hashing library to store passwords securely.
  - **Token Verification**: Verify the token (JWT) on each request to protected routes.

### 2. Backend (Node.js or Nest.js)

- **Tasks CRUD**:  
  - `GET /tasks` – Retrieve a list of tasks (optionally filtered by user).  
  - `POST /tasks` – Create a new task.  
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).  
  - `DELETE /tasks/:id` – Delete a task.
- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default `false`)
  - _(Optional)_ `userId` to link tasks to the user who created them
- **Database**: PostgreSQL
  - Provide instructions/migrations to set up:
    - `users` table (with hashed passwords)
    - `tasks` table
- **Setup**:
  - `npm install` to install dependencies
  - `npm run start` (or `npm run dev`) to run the server
  - Document any environment variables (e.g., database connection string, JWT secret)

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
  - Store JWT (e.g., in `localStorage`) upon successful login.
  - If not authenticated, the user should not see the tasks page.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks` (including auth token in headers).
  - Display the list of tasks.
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
- **Navigation**:
  - Show `Login`/`Register` if not authenticated.
  - Show `Logout` if authenticated.
- **Setup**:
  - `npm install` then `npm start` (or `npm run dev`) to run.
  - Document how to point the frontend at the backend (e.g., `.env` file, base URL).

---

## Deliverables

1. **Fork the Public Repository**: **Fork** this repo into your own GitHub account.
2. **Implement Your Solution** in the forked repository. Make sure you're README file has:
   - Steps to set up the database (migrations, environment variables).
   - How to run the backend.
   - How to run the frontend.
   - Any relevant notes on testing.
   - Salary Expectations per month (Mandatory)
3. **Short Video Demo**: Provide a link (in a `.md` file in your forked repo) to a brief screen recording showing:
   - Registering a user
   - Logging in
   - Creating, updating, and deleting tasks
4. **Deadline**: Submissions are due **Sunday, Feb 23th 11:59 pm PST**.

> **Note**: Please keep your solution minimal. The entire project is intended to be completed in around 3 hours. Focus on core features (registration, login, tasks CRUD) rather than polished UI or extra features.

---

## Evaluation Criteria

1. **Functionality**  
   - Does registration and login work correctly (with password hashing)?
   - Are tasks protected by authentication?
   - Does the tasks CRUD flow work end-to-end?

2. **Code Quality**  
   - Is the code structured logically and typed in TypeScript?
   - Are variable/function names descriptive?

3. **Clarity**  
   - Is the `README.md` (in your fork) clear and detailed about setup steps?
   - Easy to run and test?

4. **Maintainability**  
   - Organized logic (controllers/services, etc.)
   - Minimal hard-coded values

Good luck, and we look forward to your submission!

# Task Management Application

A full-stack task management application built with React, TypeScript, Node.js, and PostgreSQL.

## Features

1. User Authentication
   - Register new users
   - Login with JWT tokens
   - Secure password hashing

2. Task Management
   - View all tasks
   - Create new tasks
   - Update existing tasks
   - Delete tasks
   - Mark tasks as complete

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Project Structure
```
task-management/
├── task-management-frontend/  # React + TypeScript frontend
└── task-management-backend/   # Node.js backend with PostgreSQL
```

## Setup Instructions

### 1. Database Setup

```bash
# Start PostgreSQL
brew services start postgresql@14

# Create database and user
createuser -s postgres
psql postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"
createdb -U postgres task_management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd task-management-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_management
JWT_SECRET=your-secret-key-here
EOL

# Run migrations
npm run migration:run

# Start development server
npm run dev
```

The backend will be running at http://localhost:3001

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd task-management-frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:3001" > .env

# Start development server
npm start
```

The frontend will be running at http://localhost:3000

## Testing

### API Endpoints Testing

1. **Register a User**
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

2. **Login**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

3. **Create Task** (requires auth token)
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title": "Test Task", "description": "This is a test task"}'
```

4. **Get Tasks**
```bash
curl -X GET http://localhost:3001/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Frontend Testing

Run the test suite:
```bash
cd task-management-frontend
npm test
```

## Troubleshooting

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Verify database credentials in .env
   - Check if database exists

2. **Migration Issues**
   - Run `npm run build` first
   - Check entity definitions
   - Verify migration files

3. **API Connection Issues**
   - Verify backend is running
   - Check CORS configuration
   - Ensure correct API URL in frontend .env

## Salary Expectations

Monthly salary expectation: $8,000 - $10,000 USD

## Video Demo

A video demonstration of the application can be found at: [Demo Link]

The demo shows:
- User registration
- User login
- Creating a task
- Updating a task
- Deleting a task

## Tech Stack

- Frontend: React, TypeScript, Material-UI
- Backend: Node.js, Express, TypeORM
- Database: PostgreSQL
- Authentication: JWT
- Password Hashing: bcrypt
