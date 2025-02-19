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

router.post('/createTask', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const task = await Task.create({
      title,
      description,
      userId,
      isComplete: false
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

//update event 
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const userId = req.user.userId; 

    const result = await Task.update(
      { title, description, isComplete },
      {
        where: { 
          id,
          userId // make sure the user owns this task 
        }
      }
    );

    // check if the task was updated
    if (result[0] === 1) {
      const updatedTask = await Task.findByPk(id);
      return res.status(200).json(updatedTask);
    }
    
    return res.status(404).json({ error: 'Task not found or no changes made' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});


module.exports = router;