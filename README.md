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
  ## set up the users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
  ## Set up the tasks using SQL
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
    JWT_SECRET=<your_jwt_secret>
## Create and set up the database (did not use database migration)
    psql -U <your_username> -d task_manager
    CREATE DATABASE task_manager;
    -- Run the SQL commands from above to create the 'users' and 'tasks' tables
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


## Video link demo
  ## GITHUB link (requires download to watch), video in repo
  https://github.com/samj1098/lumaa-spring-2025-swe/blob/main/task-manager-demo.mp4
  ## Youtube link (watch in browser)
  https://youtu.be/xc0t8nmCAHE


## Salary Expectations
  Between $48,000 and $72,000 yearly
  $4,000 - $6,000 monthly**
  While most comparable full-stack internships average in the middle of this range,  
  I am flexible depending on the tech stack and mentorship opportunities.
  I am open to negotiation for a fair rate that aligns with responsibilities.

## Personal Info
**Email:** stjense5@asu.edu  
**Personal Email:** samuelj1316@gmail.com  
**Phone:** (605) 929-1796  
**LinkedIn:** [www.linkedin.com/in/samueltjensen](https://www.linkedin.com/in/samueltjensen)
