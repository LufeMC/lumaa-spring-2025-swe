# Task Manager Application

A simple **Task Management** application built with:
- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** React + TypeScript
- **Authentication:** JWT-based login system

---

## ** 1. Steps to Set Up the Database **
1️⃣ Install PostgreSQL (if not installed)**
Run the following command (for Ubuntu users):
in terminal -
sudo apt update
sudo apt install postgresql postgresql-contrib

2️⃣ Switch to PostgreSQL User
in terminal -
sudo -i -u postgres
psql

3️⃣ Create Database and User
Run the following SQL commands after switching to PostgreSQL:

CREATE DATABASE task_manager_db;
CREATE USER task_user WITH ENCRYPTED PASSWORD 'task_password';
GRANT ALL PRIVILEGES ON DATABASE task_manager_db TO task_user;
Exit PostgreSQL:
\q
exit

4️⃣ Set Up Environment Variables
Create a .env file inside task-manager-backend and add:

.env

PORT=5000
DB_HOST=localhost
DB_PORT=5432  # Added this line
DB_USER=task_user
DB_PASSWORD=task_password
DB_NAME=task_manager_db
JWT_SECRET=your_jwt_secret


📌 2. How to Run the Backend
1️⃣ Install Dependencies
Navigate to the backend folder and install dependencies:
cd task-manager-backend
npm install

2️⃣ Start the Backend Server
npm run dev
The backend will run on: http://localhost:5000

📌 3. How to Run the Frontend
1️⃣ Install Dependencies
Navigate to the frontend folder and install dependencies:
cd task-manager-frontend
npm install

2️⃣ Start the Frontend Server
npm start
The frontend will run on: http://localhost:3000

📌 4. Notes on Testing
✅ Testing backend API with curl
Register a user:
curl -X POST -H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"testpassword"}' \
http://localhost:5000/auth/register

Login a user:
curl -X POST -H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"testpassword"}' \
http://localhost:5000/auth/login

Create a task:
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"New Task", "description":"Task description"}' \
  http://localhost:5000/tasks


Replace YOUR_TOKEN_HERE with the token received from the login response.

✅ Testing Frontend
Open http://localhost:3000 in your browser.
Register a new user.
Login with the registered user.
Create, update, and delete tasks.

📌 5. Salary Expectations 
 Expected Monthly Salary: $20 per hour

📌 6. Short Video Demo
[Google drive link
](https://drive.google.com/file/d/11v8-vpAw-TVOwYYxP5laBmXNO8nypeOO/view?usp=sharing)
