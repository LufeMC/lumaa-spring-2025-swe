// Folder structure:
// - backend/ (Node.js + Express + PostgreSQL)
// - frontend/ (React + TypeScript + Vite)

// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { authenticateToken } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

