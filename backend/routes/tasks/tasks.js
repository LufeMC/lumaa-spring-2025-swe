const express = require('express');
const router = express.Router();
const Task = require('../../database/models/task'); // import task model
const authMiddleware = require('../../authMiddleware')

// get user's tasks
router.get('/', authMiddleware, async (req, res) => {
  //console.log(req);
  const userId = req.user.userId
  //console.log("userId to check", userId)
  try {
    const tasks = await Task.findAll({
      where: { user_id : userId }
      //attributes: ['id', 'title', 'description', 'isComplete']
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;