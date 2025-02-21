# Task Management Application

A full-stack task management application built with React + TypeScript (frontend), Node.js (backend), and PostgreSQL (database).

## Features

- User Authentication
  - Secure registration and login with JWT
  - Password hashing using bcrypt
  - Protected routes and API endpoints
  - Input validation and error handling
  
- Task Management
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Task filtering (All/Complete/Incomplete)
  - Multiple sorting options (Date/Title/Status)
  - Task descriptions support
  - Task filtering and sorting
  - Real-time feedback

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Database Setup

1. Install PostgreSQL if not already installed:
   ```bash
   # Windows
   Download and install from https://www.postgresql.org/download/windows/
   
   # Ubuntu
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   ```

2. Start PostgreSQL service:
   ```bash
   # Windows
   net start postgresql

   # Ubuntu
   sudo service postgresql start
   
   # macOS
   brew services start postgresql
   ```

3. Create database:
   ```sql
   CREATE DATABASE task_manager;
   ```

4. The tables will be automatically created by TypeORM when you start the backend.

## Environment Variables

### Backend (.env)
Create a `.env` file in the backend directory:
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=task_manager
```

### Frontend
No additional environment variables needed as the API URL is configured in the Vite config to proxy to http://localhost:3000.

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The backend will be available at `http://localhost:3000`.

## Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Testing Notes

### Backend Testing
- Uses Jest for unit and integration tests
- Test database is automatically created
- Run tests with:
  ```bash
  cd backend
  npm test
  ```

### Frontend Testing
- Uses Jest and React Testing Library
- Run tests with:
  ```bash
  cd frontend
  npm test
  ```

### Manual Testing
- Use curl commands for API testing:
  ```bash
  # Register
  curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"

  # Login
  curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
  ```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints
- Input validation
- Error handling
- CORS configuration

## API Documentation

See [API.md](./API.md) for detailed API documentation.

## Salary Expectations

Monthly salary expectation: $2,000 - $4,000 USD

## Video Demo

[View Project Demo Video](https://drive.google.com/file/d/13jT7Dnui-zX1pwJN82otXiONca7tPNjD/view?usp=sharing)