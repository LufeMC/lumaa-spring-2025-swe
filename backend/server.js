const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// middleware
app.use(cors()); // cors
app.use(bodyParser.json()); // to parse json res 


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
