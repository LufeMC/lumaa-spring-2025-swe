const { Task } = require("../models");

exports.getTasksByUser = async (userId) => {
  return await Task.findAll({ where: { userId } });
};

exports.createTask = async ({ title, description, userId }) => {
  return await Task.create({ title, description, userId });
};

exports.updateTask = async (taskId, userId, updatedData) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) return null;
  return await task.update(updatedData);
};

exports.deleteTask = async (taskId, userId) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) return false;
  await task.destroy();
  return true;
};
