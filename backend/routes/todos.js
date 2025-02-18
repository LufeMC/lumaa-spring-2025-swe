import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get tasks
router.get('/', (req, res) => {
    const queryText = 'SELECT id, message, title, iscomplete AS "isComplete" FROM todolist WHERE email = $1';
    db.query(queryText, [req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error fetching todos' });
        }
        res.json(result.rows);
    });
});

// Create task
router.post('/', (req, res) => {
    const { message, title } = req.body;
    const queryText = 'INSERT INTO todolist (message, title, email, iscomplete) VALUES ($1, $2, $3, $4) RETURNING id';
    db.query(queryText, [message, title, req.user.email, false], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error adding task' });
        }
        res.json({ message: 'Task added successfully', id: result.rows[0].id });
    });
});

// Update task
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { message, title, iscomplete } = req.body;
    const queryText = 'UPDATE todolist SET message = $1, title = $2, iscomplete = $3 WHERE id = $4 AND email = $5';
    db.query(queryText, [message, title, iscomplete, taskId, req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error updating task' });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Update task completion status
router.put('/:id/complete', (req, res) => {
    const taskId = req.params.id;
    const { isComplete } = req.body;
    const queryText = 'UPDATE todolist SET iscomplete = $1 WHERE id = $2 AND email = $3';
    db.query(queryText, [isComplete, taskId, req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error updating task completion status' });
        }
        res.json({ message: `Task marked as ${isComplete ? 'complete' : 'incomplete'}` });
    });
});

// Delete task
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = 'DELETE FROM todolist WHERE id = $1 AND email = $2';
    db.query(queryText, [taskId, req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error deleting task' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

export default router;