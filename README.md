# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

# Task Management Application

This is a full-stack task management application built with:
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + JavaScript
- **Database**: PostgreSQL

## Features
- User registration and login with JWT authentication.
- Create, read, update, and delete tasks.
- Tasks are protected by authentication.

---

## Setup Instructions

### 1. Clone the Repository
1. Create a directory
2. Navigate to the directory
3. Open a terminal and run the following command to clone the repository:
```
git clone https://github.com/your-username/task-management-app.git
```
4. Navigate to the cloned file:
```
cd lumaa-spring-2025-swe
```

### 2. Database Setup
1. Install PostgreSQL if you haven't already: [PostgreSQL Downloads](https://www.postgresql.org/download/):
    - For **Windows**:
     - During installation, make sure to:
       - Check the box to **Add PostgreSQL to the system PATH**.
       - Note down the **port number** (default is `5432`) and the **password** you set for the `postgres` superuser.
   - For **macOS**:
     - Add PostgreSQL to your PATH by adding the following line to your shell configuration file (e.g., `.bashrc`, `.zshrc`):
       ```
       export PATH="/usr/local/opt/postgresql/bin:$PATH"
       ```
     - Reload your shell configuration:
       ```
       source ~/.zshrc  # or source ~/.bashrc
       ```
    - Alternatively, install postgreSQL using Homebrew:
       ```
       brew install postgresql
       ```

2. Create a database in your terminal:
```
psql -U postgres
CREATE DATABASE task_management;
```
3. create a new user and grant priviledges:
```
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE task_management TO myuser;
```
4. Switch to `task_management` database:
```
\c task_management
```

5. Create users and tasks tables:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT false,
    userId INTEGER REFERENCES users(id)
);
```

6. Grant privileges on the `tasks` and `users` table and sequence:
```
GRANT ALL PRIVILEGES ON TABLE tasks TO myuser;
GRANT USAGE, SELECT ON SEQUENCE tasks_id_seq TO myuser;
GRANT ALL PRIVILEGES ON TABLE users TO myuser;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO myuser;
```

### 3. Backend Setup:
1. Install PostgreSQL if you haven't already: [Node Downloads](https://node.js.org/en).
2. Add the batch file to your path
3. Navigate to the backend:
```
cd backend
```
4. Install dependencies:
```
npm install
```
5. Create a `.env` file in the `backend` folder and add:
```
PORT=8000
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=task_management
JWT_SECRET=your_jwt_secret_key
```
4. Start the backend server:
```
npm run dev
```

### 4. Frontend Setup

1. Navigate to the `frontend` folder:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Create `.env` file in the `frontend` and add:
```
REACT_APP_API_URL=http://localhost:8000
```
4. Start the frontend development server:
```
npm start
```

## Running the Application
1. Start the backend server:
```
cd backend
npm run dev
```
2. Start the frontend server on another terminal:
```
cd frontend
npm start
```