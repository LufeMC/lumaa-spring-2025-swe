# Task Management App

A full-stack task management application built with a React/Typescript frontend, Node.js/Express backend, and PostgreSQL database.

---

## Features
- User authentication with JWT
- Add, update, delete, and mark tasks as complete
- Responsive UI for managing tasks
- Backend API with secure routes
- PostgreSQL database integration

---

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

---

## Setup Instructions

### **1. Install PostgreSQL and pgAdmin**
1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
   - During installation, set a password for the default `postgres` user.
2. Install **pgAdmin** (a graphical interface for managing PostgreSQL databases) as part of the PostgreSQL installation or separately from [pgAdmin's website](https://www.pgadmin.org/download/).
3. Launch pgAdmin and log in with your PostgreSQL credentials.

---

### **2. Create the Database**
1. Open pgAdmin and connect to your PostgreSQL server.
2. Right-click on "Databases" in the left-hand menu and select **Create > Database**.
3. Enter a name for your database (e.g., `task_manager`) and click **Save**.

---

### **3. Set Up Tables**
Use the following SQL queries to create the necessary tables in your database:

#### Users Table:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tasks Table:
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **4. Clone the Repository**
1. Open a terminal on your local machine.
2. Clone this repository:
   ```bash
   git clone https://github.com/v2ganesan/lumaa-spring-2025-swe.git
   ```
3. Navigate into the project directory:
   ```bash
   cd 
   ```

---

### **5. Set Up the Backend**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install all necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```env
   DB_USER=YOUR_USER
   DB_PASSWORD=YOUR_PASSWORD
   DB_NAME=YOUR_DB_NAME
   DATABASE_URL=YOUR_DB_URL
   JWT_SECRET=YOUR_JWT_SECRET
   PORT=YOUR_PORT
   
   ```
   - Replace DB env variables with your PostgreSQL password.
   - Replace `your_jwt_secret_key` with a secure secret key for JWT authentication.

4. Start the backend server:
   ```bash
   npm run server
   ```
5. The backend will now run on `http://localhost:3001`.

---

### **6. Set Up the Frontend**
1. Open a new terminal window (keep the backend running in another terminal).
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install all necessary packages:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
5. The frontend will now run on `http://localhost:3000`.

---

### **7. Run the Application**
1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user or log in with an existing account.
3. Add, update, delete, and mark tasks as complete to test full functionality.

---

## Troubleshooting

### Common Issues:
1. **PostgreSQL Connection Errors**:
    - Ensure PostgreSQL is running (`pg_ctl status` or check services).
    - Verify that your `DATABASE_URL` in `.env` matches your database credentials.

2. **Port Already in Use**:
    - Change ports in `package.json`.

3. **Missing Dependencies**:
    - Run `npm install` in both `backend` and `frontend` directories.

4. **Token Expiration Issues**:
    - Ensure you are logged in with a valid token.
    - If expired, log out and log back in.

5. **React Build Issues**:
    - If you encounter issues while running React, try clearing the cache:
      ```bash
      npm cache clean --force && npm start
      ```
Salary Expectations - $25-30/hr / $2250 - $2700 per Month
