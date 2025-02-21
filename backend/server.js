const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const sequelize = require('./database/config/database');
const authMiddleware = require('./authMiddleware');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = express();

// import routes 
const regRoutes = require('./routes/auth/registration');
const loginRoutes = require('./routes/auth/login');
const taskRoutes = require('./routes/tasks/tasks');


// middleware
app.use(cors()); // cors
app.use(express.json()); 

//verify connection to the db 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err));



// routes 
app.use('/api/auth/register', regRoutes);
app.use('/api/auth/login', loginRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// Add this AFTER all other routes
app.use('*', (req, res) => {
  console.log('Unhandled route:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// Database connection test
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// start the server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
