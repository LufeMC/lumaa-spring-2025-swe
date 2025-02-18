// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../database/models/user'); 

// check if a user with the same username exists 
router.get('/checkUser', async (req, res) => {
  console.log("route reached")
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const existingUser = await User.findOne({ 
      where: { username } 
    });
    console.log('user', existingUser);
    console.log('isUser: ', !!existingUser);
    res.json({ exists: !!existingUser });
    
  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({ error: 'Server error while checking username' });
  }
});

// create a new user 
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // password is auto hashed 
    const newUser = await User.create({ username, password });

    // return the new user's info 
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
    };

    res.status(201).json(userResponse);

  } catch (error) {
    console.error('Registration error:', error);
    
    // double check for duplicate username
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
