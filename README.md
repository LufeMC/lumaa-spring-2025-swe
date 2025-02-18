# Task Management App
A Task Management application built with React , Node.js, and PostgreSQL.  
Users can register, log in, create, update, and delete tasks.


## Features
**User Authentication** (JWT)  
**Tasks CRUD** (Create, Read, Update, Delete)  
**Secure Routes**  
**PostgreSQL Database**
**Passwords securely stored with bcrypt hashing**


## Tech Stack
**Frontend:** React, TypeScript
**Backend:** Node.js (Express)
**Database:** PostgreSQL
**Auth:** JWT & Bcrypt


  ## Inside the PostgreSQL console, run the following SQL commands:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT false,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);


## Follow these steps to clone, set up, and run the project.
    git clone <repository-url>
    cd lumaa-spring-2025-swe
 ## Go to backend
    cd backend
    npm install
## Create a .env file in the backend directory
    PORT=5001
    DATABASE_URL=postgres://<DB_USER>:<DB_PASSWORD>@localhost:5432/task_manager
    WT_SECRET=<your_jwt_secret>
## create the database (outlined above)
    psql -U <your_username> -d task_manager
## start backend server
    npm start
    npm run dev
## front end setup
    cd ../task-management-frontend
    npm install
## Create a .env file in the frontend directory
    VITE_BACKEND_URL=http://localhost:5001
## Start frontend server
    npm run dev
## visit in browser
    http://localhost:5173

