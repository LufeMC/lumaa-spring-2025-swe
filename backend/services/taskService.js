const { pool } = require("../config/db");

// Service function to get tasks for a specific user
const getTasks = async (userId) => {
    try {
        const { rows } = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
        return rows;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Internal server error");
    }
};

// Service function to create a task
const createTask = async (title, description, userId) => {
    try {
        const { rows } = await pool.query(
            "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, description, userId]
        );
        return rows[0];
    } catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Internal server error");
    }
};

// Service function to update a task
const updateTask = async (id, title, description, isComplete, userId) => {
    try {
        const { rows } = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [title, description, isComplete, id, userId]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Internal server error");
    }
};

// Service function to delete a task
const deleteTask = async (id, userId) => {
    try {
        const { rowCount } = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
            [id, userId]
        );
        return rowCount > 0;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Internal server error");
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
