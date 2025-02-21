const express = require("express");
const authenticate = require("../middleware/authMiddleware"); // Middleware to check JWT token
const taskService = require("../services/taskService"); // Calls task service for DB operations

const router = express.Router();

//Get all tasks for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

//Create a new task
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

//Update a task (edit or mark complete)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

//Delete a task
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const success = await taskService.deleteTask(req.params.id, req.user.id);
    if (!success) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
