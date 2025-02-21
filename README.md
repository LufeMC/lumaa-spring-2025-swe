# Task Management Application

This is a **Full-Stack Task Management App** built with **React + TypeScript (frontend)**, **Node.js (backend)**, and **PostgreSQL (database)**. 

## **📌 Steps to Set Up Locally**

Follow these instructions to **run the app on your local machine** after cloning the repository.

---

## **1️⃣ Setting Up PostgreSQL**
1. Create a PostgreSQL database using a client like `psql`, pgAdmin, or DBeaver. Name it `task_manager_db`.
2. Ensure a PostgreSQL user exists with the required privileges to access the database.
3. Modify the `.env` file in the `backend/` folder with the database credentials and settings.
4. Generate a JWT secret token and update it in the `.env` file.
5. Run the necessary migrations to set up the database schema.

---

## **2️⃣ Configuring the Backend**
1. Install all required dependencies.
2. Ensure the backend port is set correctly in the `.env` file (default is `5001`). Modify it if needed.
3. Start the backend server to ensure everything is running correctly.

---

## **3️⃣ Configuring the Frontend**
1. Modify the `.env` file in the `frontend/` folder to ensure the API URL is correctly pointing to the backend.
2. Install all frontend dependencies.
3. Start the frontend server and check that it correctly communicates with the backend.

---

## **4️⃣ How to Test the Application**
Once everything is running, you can:
- Register a new user on the `/register` page.
- Log in using valid credentials on the `/login` page.
- Create, update, and delete tasks from the home page.

---

## **💰 Salary Expectations**
💵 **$25 - $30 per hour**  

---

## **📌 Notes**
- Ensure PostgreSQL is running locally before setting up the database.
- Update `.env` variables properly for database credentials, JWT secrets, and API URLs.
- If using a different port for the backend, update `REACT_APP_API_URL` in the frontend `.env` file accordingly.

🚀 **Now you're ready to run the Task Management App!**

