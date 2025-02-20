import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import recommendRoutes from './routes/recommendRoutes.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js'; // ✅ Import task routes
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// ✅ Apply JSON parsing ONLY to requests that need it (POST, PUT, DELETE)
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// ✅ Routes
app.use('/api', recommendRoutes);      // Movie recommendation routes
app.use('/api/auth', authRoutes);      // Authentication routes
app.use('/api/tasks', taskRoutes);     // ✅ Task management routes

// ✅ Server Listener
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
