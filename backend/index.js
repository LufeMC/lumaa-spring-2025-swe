const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));