# Task Management Application
A full-stack Task Management App built with:

Frontend: React + TypeScript
Backend: Node.js + Express + PostgreSQL
Authentication: JWT-based authentication
Database: PostgreSQL

# Youtube Link:
``` 
https://youtu.be/DE4jGuOWgCA
``` 

# 🚀 Features
✅ User Registration & Login
✅ Secure JWT Authentication
✅ Create, Edit, Delete Tasks
✅ Mark Tasks as Complete/Incomplete
✅ Fully Responsive UI with React + TypeScript






# ⚡ Prerequisites
Before setting up the project, ensure you have installed:

Node.js (LTS version recommended) → Download Node.js

PostgreSQL → Download PostgreSQL

# 📌 Backend Setup (Server)
## 1️⃣ Clone the Repository

``` 
git clone https://github.com/YOUR_GITHUB_USERNAME/task-manager.git

cd task-manager
```

## 2️⃣ Setup PostgreSQL Database

Open PostgreSQL and create a new database:

Copy the sql queries from database.sql file

## 3️⃣ Install Backend Dependencies
Navigate to the server directory:

```
cd server
npm install
```


## 4️⃣ Configure Environment Variables

Create a .env file inside the server directory:

``` 
PORT=5001
JWT_SECRET=your_secret_key
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5433
DB_DATABASE=task_manager_db
``` 

## 5️⃣ Start the Backend Server
Run the server using:

``` 
npm run dev
``` 

# 📌 Frontend Setup (Client)

## 1️⃣ Navigate to Frontend Directory
Open a new terminal and go to the frontend folder:
``` 
cd ../frontend
``` 
## 2️⃣ Install Frontend Dependencies
``` 
npm install
``` 
## 3️⃣ Configure Environment Variables
Create a .env file inside the frontend directory:
``` 
REACT_APP_API_URL=http://localhost:5001
``` 
## 4️⃣ Start the React App

Run the frontend using:
``` 
npm start
``` 