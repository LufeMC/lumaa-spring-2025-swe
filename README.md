<<<<<<< HEAD
# 🎬 Movie Watchlist & Task Management with Movie Recommendation System

## 📖 Project Overview

\
Since I applied for both full-stack and AI intern jobs I decided to make something interesting video: [https://screenrec.com/share/cfptIdoQx8](https://screenrec.com/share/cfptIdoQx8)\
passwords are hashed when stored.\
https\://drive.google.com/file/d/1GM28hz-js43SwJM8AvR2-5S4Ph-yF9la/view?usp=sharing\

dataset link https://drive.google.com/file/d/1dzagdTYDb_aqRYWMhjlagqbe_UvXAyT4/view?usp=sharing
This full-stack web application provides users with a **Movie Watchlist & Task Management System** integrated with a **Movie Recommendation Engine**. Users can manage their movie watchlist, mark movies as watched/unwatched, and receive personalized movie recommendations based on their input.

---

## 🗂️ Technologies Used

- **Frontend:** React (TypeScript), Axios, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Machine Learning Model:** Python (TF-IDF for movie recommendations)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Free platforms like Render, Vercel, or Railway

---

## 🚀 Project Workflow

### 1. **User Authentication**

- Users register and log in with a username and password.
- Upon login, a JWT token is generated and stored in local storage.
- All protected routes validate the token before granting access.

### 2. **Task (Movie) Management**

- Users can **add**, **edit**, **delete**, and **toggle** the completion status of movies in their watchlist.
- The UI provides instant feedback when marking movies as "👀 Watch" or "✅ Watched".
- The `iscomplete` field in the database reflects the watch status of each movie.

### 3. **Movie Recommendation System**

- The system uses a **TF-IDF-based recommendation engine** built with Python.
- When users enter a query, the backend sends it to the ML model.
- The model processes the query against the `tmdb_5000_movies_utf8.csv` dataset to return similar movie titles.
- Recommendations are displayed instantly on the frontend.

### 4. **Frontend & Backend Communication**

- **Axios** handles all HTTP requests with JWT tokens in headers for protected endpoints.
- Responses are displayed in real-time with no need for page refreshes.

---

## 🛠️ Steps to Set Up the Database

### 1. **Database Creation and Migrations**

- Install and start PostgreSQL.
- Create a new database:

```bash
psql -U postgres -c "CREATE DATABASE \"Movies\";"
```

- Create tables manually or run migration scripts:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  iscomplete BOOLEAN DEFAULT FALSE,
  userid INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### 2. **Environment Variables**

Create a `.env` file in the backend directory:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:1234@localhost:5432/Movies
JWT_SECRET=your_jwt_secret
```

---

## 💻 How to Run the Project Locally

### 1. **Run the Backend**

```bash
cd backend
npm install
npm start
```

✅ Server runs on `http://localhost:5000`.

### 2. **Run the Frontend**

```bash
cd frontend
npm install
npm start
```

✅ Frontend available at `http://localhost:3000`.

### 3. **Run the Movie Recommendation Model**

```bash
cd ml_model
python recommend.py
```

✅ The ML server will run on `http://localhost:5001` (if applicable).

---

## 🧪 Testing Notes

- **Frontend:** Use React Testing Library for component tests.
- **Backend:** Run API endpoint tests with Postman or Jest.
- **ML Model:** Verify predictions using sample movie queries.
- ✅ Test toggling movie statuses and ensure immediate UI updates.

---

## 📊 Salary Expectations (Mandatory)

💵 **Expected Monthly Salary:** \$4500 (flexible based on project scope and responsibilities)

---

## 🌐 Deployment Instructions

### 1. **Frontend (Vercel/Netlify)**

- Push code to GitHub.
- Connect repository to Vercel.
- Set environment variables for API URLs.

### 2. **Backend (Render/Railway)**

- Deploy via Render with automatic GitHub integration.
- Add environment variables in the Render dashboard.

### 3. **Database (Railway/Supabase)**

- Host PostgreSQL database and update `DATABASE_URL` in `.env`.

### 4. **Machine Learning Model (Optional)**

- Deploy Python model via Railway or AWS Lambda for serverless predictions.

---

## 📝 How to Use the Application

1. **Login/Register:** Create an account or log in.
2. **Task Management:**
   - Add new movies with descriptions.
   - Click "👀 Watch" to mark as watched (changes to "✅ Watched").
   - Edit or delete movies directly from the dashboard.
3. **Get Recommendations:**
   - Enter a movie title and receive up to 5 suggestions.
   - Add recommended movies directly to the watchlist.

---

## 🏆 Features at a Glance

✅ User authentication with JWT\
✅ Real-time watchlist management\
✅ ML-based movie recommendations\
✅ Responsive frontend with instant updates\
✅ Secure backend with token validation

---

##

---

## 📬 Contact

Reach me at [spatne1@umbc.edu](mailto\:spatne1@umbc.edu) for queries or suggestions.

---


