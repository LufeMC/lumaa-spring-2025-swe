const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// middleware
app.use(cors()); // cors
app.use(bodyParser.json()); // to parse json res 

console.log('Path to .env:', path.resolve(__dirname, '../.env'));
//verify connection to the db 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log('db url', process.env.DB_USER);
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err));

/*
- for when i write the routes 
// import routes 
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// routes 
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
*/

// start the server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
