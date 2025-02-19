# Full-Stack Coding Challenge

## Task Management application

---

### Brief Video Demo :

**https://drive.google.com/file/d/1FiQYzc9M1r02YRID-94WtmGc6nQVQjeJ/view?usp=sharing**


### Steps for running the application :

1. **Database**
   - **Install PostgreSQL on the local machine**.
  
     
   - **Create database**
   ```
   CREATE DATABASE TaskManagement
   ```


   - **Create tables**
   ```
   CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100),
   email VARCHAR(100),
   password VARCHAR(100)
   );
   ```
   ```
   CREATE TABLE IF NOT EXISTS todolist (
    message VARCHAR(255),
    email VARCHAR(100),
    id SERIAL PRIMARY KEY,  -- SERIAL will auto-increment and act as the primary key
    title VARCHAR(100),
    iscomplete BOOLEAN
   );
   ```
2. **Backend**
   - **Navigate to the backend directory using the following command :**
   ```
   cd /backend
   ```
   - **Installation of the dependencies :**
   ```
   npm i
   ```
   - **Create .env file using the following :**
   ```
   user: DB_USER,
   host: DB_HOST,
   database: DB_NAME,
   password: DB_PASSWORD,
   port: 5432;
   ```
   
   - **Starting the server :**
   ```
   nodemon index.js
   ```
   - **Backend runs on http://localhost:3000**

3. **Frontend**
   - **Navigate to the frontend directory using the following command :**
   ```
   cd /frontend
   ```
   - **Installation of the dependencies :**
   ```
   npm i
   ```
   
   - **Starting the server :**
   ```
   npm run dev
   ```
   - **Frontend runs on http://localhost:5173**
  
**Salary Expectation :**
**$15–20/hr**
   

