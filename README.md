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
  - Real-time feedback
  
- Modern UI/UX
  - Material-UI components
  - Responsive design
  - Loading states and animations
  - Toast notifications
  - Form validation
  - Error handling
  - Intuitive task management

## Technical Stack

### Frontend
- React 18 with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls
- Notistack for notifications
- Jest and Testing Library for tests

### Backend
- Node.js with TypeScript
- Express.js for API
- TypeORM for database
- PostgreSQL for storage
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### Database Setup

1. Install PostgreSQL if not already installed:
   ```bash
   # Ubuntu
   sudo apt update
   sudo apt install postgresql postgresql-contrib

   # macOS with Homebrew
   brew install postgresql
   ```

2. Start PostgreSQL service:
   ```bash
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

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password_here
   DB_NAME=task_manager
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.






## API Documentation

See [API.md](./API.md) for detailed API documentation.

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API endpoints
- Input validation and sanitization
- Error handling and logging
- CORS configuration
- Rate limiting

## Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

3. Start the production server:
   ```bash
   cd backend
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Ahmed Mohamed - hussah01@luther.edu

Project Link: [https://github.com/ahmed5145/lumaa-spring-2025-swe](https://github.com/ahmed5145/lumaa-spring-2025-swe)

## Salary Expectations

Monthly salary expectation: $2,000 - $4,000 USD

## Video Demo

[Link to video demo will be added] 