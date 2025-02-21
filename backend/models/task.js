const pool = require('./db');

const getTasks = async (userId) => {
    const result = await pool.query('SELECT * FROM tasks WHERE userId = $1', [userId]);
    return result.rows;
};

const createTask = async (title, description, userId) => {
    const result = await pool.query(
        'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
        [title, description, userId]
    );
    return result.rows[0];
};

const updateTask = async (id, title, description, isComplete) => {
    const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, iscomplete = $3 WHERE id = $4 RETURNING *',
        [title, description, isComplete, id]
    );
    return result.rows[0];
};

const deleteTask = async (id) => {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

module.exports = { getTasks, createTask, updateTask, deleteTask };