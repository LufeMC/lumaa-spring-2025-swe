const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.user.id });
  res.json(task);
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title, description, isComplete } = req.body;
  await Task.update({ title, description, isComplete }, { where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: "Task updated successfully" });
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;