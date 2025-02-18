Running the Full Stack App:
    Database:
        Install PostgreSQL on your local machine
        Following commands will create the databse

        "CREATE DATABASE task_manager;"

        Setup required tables

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
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );

    Backend:
        To start backend, go to backend dir "cd /backend" 
        Install dependencies "npm install"
        Create a .env file in the backend folder and add

        "PORT=5000
        DATABASE_URL=your_postgresql_connection_string
        JWT_SECRET=your_secret_key"

        Then type "node server.js" this will start the backend
        Backend should now be running at http://localhost:5000

    Frontend:
        To start the frontend, go to dir frontend  "cd /frontend"
        Install dependencies "npm install"
        Start the development server "npm start run"
        Frontend should now be running at http://localhost:3000

Salary Expectation:
$25–$28 per hour 

Why?  
This project demonstrates my ability to build secure, scalable, 
and user-friendly full-stack applications in but not limited to.

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Security: Authentication & Encryption
- Database Management & API Development
