# Task Management Application

A full-stack task management application built with React, TypeScript, Node.js, and PostgreSQL.

## Backend Setup

### Prerequisites
- Node.js v20 or higher
- PostgreSQL installed and running
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the `backend` directory:

```
env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=your_jwt_secret
```
###Database Setup
1. Create a PostgreSQL database:
```bash
CREATE DATABASE task_management;
```
2. Run the migrations:
```bash
cd backend
npm install
npm run migration:run
```
###Running the Backend using Development mode:
make sure you have the environment variables set up in the `.env` file.
and you are in the backend directory.
```bash
cd backend
npm run dev
```
## Frontend Setup

### Prerequisites
- Node.js v20 or higher
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the `task-management-frontend` directory:
make sure you have the environment variables set up in the `.env` file.
```
REACT_APP_API_URL=http://localhost:3001
```
###Running the Frontend:
make sure you are in the task-management-frontend directory.
```bash
npm install
npm start
```

####To test the api
# 1. Register a new user
curl -X POST http://localhost:3001/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'

# 2. Login and get token
curl -X POST http://localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'

# Save the token from the response
export TOKEN="your_token_here"

# 3. Create a new task
curl -X POST http://localhost:3001/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "title": "Test Task",
  "description": "This is a test task",
  "isComplete": false
}'

# 4. Get all tasks
curl -X GET http://localhost:3001/tasks \
-H "Authorization: Bearer $TOKEN"

# 5. Update a task (replace 1 with actual task ID)
curl -X PUT http://localhost:3001/tasks/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "isComplete": true
}'

# 6. Delete a task (replace 1 with actual task ID)
curl -X DELETE http://localhost:3001/tasks/1 \
-H "Authorization: Bearer $TOKEN"


## Short Video Demo
Please visit the following link to see the short video demo:

https://drive.google.com/file/d/19hYpexkviewqF74SEF9DhaIGcxemBvr8/view?usp=sharing

## Desired Salary
I would like to be paid 3000$ per month. If it's too high, please let me know we can discuss.