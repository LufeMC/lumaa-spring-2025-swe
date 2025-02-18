const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = express();

// import routes 
const regRoutes = require('./routes/registration');
//const taskRoutes = require('./routes/tasks');


// middleware
app.use(cors()); // cors
app.use(bodyParser.json()); // to parse json res 

//verify connection to the db 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err));



// routes 
app.use('/api/register', regRoutes);
//app.use('/tasks', taskRoutes);

// Add this AFTER all other routes
app.use('*', (req, res) => {
  console.log('Unhandled route:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});


// start the server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
