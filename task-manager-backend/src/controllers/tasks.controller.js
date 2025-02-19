const { createTask, getTasksByUser, updateTask, deleteTask } = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await createTask(title, description, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const task = await updateTask(req.params.id, title, description, isComplete);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

module.exports = { getTasks, addTask, updateTaskController, deleteTaskController };

