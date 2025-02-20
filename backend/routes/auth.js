const express = require('express');
const { register, login } = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body.username, req.body.password);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      const { token, user } = await login(username, password);
      res.json({ token, user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;