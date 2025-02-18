import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from "pg";
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskManagement",
    password: "Vish@1909",
    port: 5432,
});

db.connect();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use auth routes
app.use('/auth', authRoutes);

// Middleware to authenticate user and set req.user
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.user = decoded;
        next();
    });
};

app.use(authenticate);

// Get tasks
app.get('/todos', (req, res) => {
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
app.post('/todos', (req, res) => {
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
app.put('/todos/:id', (req, res) => {
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
app.put('/todos/:id/complete', (req, res) => {
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
app.delete('/todos/:id', (req, res) => {
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

app.get('/', (req, res) => {
    res.send('Welcome to Todo-list Application');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Close the database connection when the application is shutting down
process.on('SIGTERM', () => {
    db.end(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    db.end(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});
