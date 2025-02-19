const pool = require("../config/db");

// Function to create the tasks table
const createTaskTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      isComplete BOOLEAN DEFAULT FALSE,
      userId INTEGER REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  await pool.query(query);
};

// Create a new task
const createTask = async (title, description, userId) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
};

// Get tasks for a specific user
const getTasksByUser = async (userId) => {
  const result = await pool.query("SELECT * FROM tasks WHERE userId = $1", [userId]);
  return result.rows;
};

// Update a task
const updateTask = async (id, title, description, isComplete) => {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *",
    [title, description, isComplete, id]
  );
  return result.rows[0];
};

// Delete a task
const deleteTask = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

module.exports = { createTaskTable, createTask, getTasksByUser, updateTask, deleteTask };

