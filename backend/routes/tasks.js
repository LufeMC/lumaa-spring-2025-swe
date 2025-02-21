const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../models/task');
const authenticate = require('../utils/authenticate');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    const tasks = await getTasks(req.user.userId);
    res.json(tasks);
});

router.post('/', authenticate, async (req, res) => {
    const task = await createTask(req.body.title, req.body.description, req.user.userId);
    res.status(201).json(task);
});

router.put('/:id', authenticate, async (req, res) => {
    const task = await updateTask(req.params.id, req.body.title, req.body.description, req.body.isComplete);
    res.json(task);
});

router.delete('/:id', authenticate, async (req, res) => {
    await deleteTask(req.params.id);
    res.status(204).send();
});

module.exports = router;