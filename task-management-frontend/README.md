# Task Management Application

A full-stack task management application built with **React, TypeScript, Node.js, and PostgreSQL**.

## Backend Setup

### Prerequisites
- **Node.js** v20 or higher
- **PostgreSQL** installed and running
- **npm** or **yarn** package manager

### Environment Variables
Create a `.env` file in the `backend` directory:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=your_jwt_secret
```

### Database Setup

1. **Create a PostgreSQL database:**
   ```bash
   # Login to PostgreSQL
   psql postgres
   
   # Create database
   CREATE DATABASE task_management;
   
   # Create user (if needed)
   CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
   
   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE task_management TO your_username;
   ```

2. **Run the migrations:**
   ```bash
   cd backend
   npm install
   npm run migration:run
   ```

### Running the Backend (Development Mode)
Ensure you have the environment variables set up in the `.env` file and are in the `backend` directory.

```bash
cd backend
npm run dev
```

---

## Frontend Setup

### Prerequisites
- **Node.js** v20 or higher
- **npm** or **yarn** package manager

### Environment Variables
Create a `.env` file in the `task-management-frontend` directory:

```
REACT_APP_API_URL=http://localhost:3001
```

### Running the Frontend
Ensure you are in the `task-management-frontend` directory.

```bash
npm install
npm start
```

---

## API Testing with cURL

### 1. Register a New User
```bash
curl -X POST http://localhost:3001/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'
```

### 2. Login and Get Token
```bash
curl -X POST http://localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'
```
Save the token from the response:
```bash
export TOKEN="your_token_here"
```

### 3. Create a New Task
```bash
curl -X POST http://localhost:3001/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "title": "Test Task",
  "description": "This is a test task",
  "isComplete": false
}'
```

### 4. Get All Tasks
```bash
curl -X GET http://localhost:3001/tasks \
-H "Authorization: Bearer $TOKEN"
```

### 5. Update a Task (Replace `1` with the actual task ID)
```bash
curl -X PUT http://localhost:3001/tasks/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "isComplete": true
}'
```

### 6. Delete a Task (Replace `1` with the actual task ID)
```bash
curl -X DELETE http://localhost:3001/tasks/1 \
-H "Authorization: Bearer $TOKEN"
```

---

## Short Video Demo
Please visit the following link to see the short video demo:

[Demo Video](https://drive.google.com/file/d/19hYpexkviewqF74SEF9DhaIGcxemBvr8/view?usp=sharing)

---

## Desired Salary
I would like to be paid **$3000 per month**. If it's too high, please let me know, and we can discuss.

