# Task Management App

A **full-stack** Task Management application built with **React (TypeScript)**, **Node.js (Express)**, and **PostgreSQL**.

## Features
- **User Authentication** (Register/Login with password hashing)
- **Task Management (CRUD)** (Create, Edit, Complete/Undo, Delete)
- **JWT Token Authentication** (Tasks are protected)
- **User-Specific Tasks** (Each user can only see their own tasks)
- **Responsive UI** (Styled with Tailwind CSS)

---

## Youtube Link: 
https://youtu.be/VfAM0_q8b7c

---

## **Tech Stack**
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **Authentication:** JWT Token, bcrypt password hashing
- **Database:** PostgreSQL

---

## **Project Structure**
task-manager/ 
   │── backend/ # Node.js & Express API 
   │── frontend/ # React & TypeScript UI 
   │── README.md 

---

## Setup Guide

---

### **Database Setup (Migrations & Environment Variables)**
#### **Install PostgreSQL & Create Database**
1. Ensure **PostgreSQL** is installed and running.
2. Create a PostgreSQL database and user:
```bash
psql postgres
CREATE DATABASE task_manager;
CREATE USER task_user WITH PASSWORD 'sushmit99';
GRANT ALL PRIVILEGES ON DATABASE task_manager TO task_user;
```
3. Configure environment variables
   - Generate a JWT token using the command for configuring the .env file below:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
   - Create a .env file in the backend directory with the following content:
```bash
DATABASE_URL=postgres://your_db_user:your_db_password@localhost:5432/task_manager
JWT_SECRET=your_secret_key
```

### **How to run the Backend**
1. Install Dependencies
```sh 
cd backend
npm install
```
2. Run Backend
```sh
npm start
```

### **How to run the Frontend**
1. Install Dependencies
```sh 
cd frontend
npm install
```
2. Run Frontend
```sh
npm start
```

---

## **Notes on testing**
Ensure PostgreSQL is running before starting the backend.

The frontend will automatically connect to the backend at http://localhost:3000.

---

## **Salary Expectation (per month): $5000 (Summer 2025 Internship)**
I am open for negotiation based on the role and responsibilities

