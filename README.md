# Task Management Application

This is a **full-stack** Task Management application built using **React + TypeScript (frontend)**, **Node.js (backend)**, and **PostgreSQL (database)**.

## Demo
<video width="100%" height="auto" controls> <source src="/demo-video.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

## Features
✔️ User Authentication (Register, Login)  
✔️ Task CRUD (Create, Read, Update, Delete)  
✔️ Secure Routes (JWT Auth)  
✔️ Beautiful UI with **Tailwind CSS**  
✔️ Smooth Animations with **Framer Motion**  
✔️ Delete Confirmation Dialog  
✔️ Edit Task Functionality  

---

## **Setup Instructions**
### 1️⃣ **Backend Setup (Server)**
#### **Prerequisites**
- Node.js **18+**  
- PostgreSQL **latest version**  
#### **Clone the Repository**
```bash
git clone https://github.com/turisouvenir/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe/server
```

#### **Install Dependencies**
```bash
npm install
```

#### **Setup Environment Variables**
Create a `.env` file in the server directory with the following content:
```
DATABASE_URL=postgresql://username:password@localhost:5432/lumaa_task_management
JWT_SECRET=your-secret-key
PORT=5050
```

#### **Run Migrations**
```bash
npx prisma migrate dev --name init
```

#### **Start the Backend**
```bash
npm run dev
```
The server will run at [http://localhost:5050](http://localhost:5050/ping/)

### 2️⃣ **Frontend Setup (Client)**
#### **Navigate to Client**
```bash
cd ../client
```

#### **Install Dependencies**
```bash
npm install
```

#### **Start the Frontend**
```bash
npm run dev
```
The frontend will run at [http://localhost:5051](http://localhost:5051/)

API Endpoints
| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| POST   | /auth/register | Register a new user                |
| POST   | /auth/login    | Login user & return JWT token      |
| GET    | /tasks         | Fetch all tasks (Auth required)    |
| POST   | /tasks         | Create a new task (Auth required)  |
| PUT    | /tasks/:id     | Update task (Auth required)        |
| DELETE | /tasks/:id     | Delete task (Auth required)        |

Authorization: Bearer Token (JWT) required for all /tasks endpoints.

🧪 Testing
1️⃣ API Testing (Postman)
- Open Postman
- Set Base URL: http://localhost:5050/api/
- Register a user via POST /auth/register
- Login to get a JWT token (POST /auth/login)
- Use the JWT as a Bearer token for /tasks API requests.

2️⃣ Frontend Testing
- Run `npm run dev` in /client
- Register & Login
- Perform Task CRUD operations
- Ensure tasks update correctly in UI

💰 Salary Expectations
💵 Expected Monthly Salary: $X,XXX - $X,XXX USD

Thank you and looking forward to working with you.