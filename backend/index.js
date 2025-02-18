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
    const queryText = 'SELECT message, title FROM todolist WHERE email = $1';
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
    const queryText = 'INSERT INTO todolist (message, title, email) VALUES ($1, $2, $3)';
    db.query(queryText, [message, title, req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error adding task' });
        }
        res.json({ message: 'Task added successfully' });
    });
});

// Update task
app.put('/todos/:title', (req, res) => {
    const oldTitle = req.params.title;
    const { message, title } = req.body;
    const queryText = 'UPDATE todolist SET message = $1, title = $2 WHERE title = $3 AND email = $4';
    db.query(queryText, [message, title, oldTitle, req.user.email], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ error: 'Error updating task' });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Delete task
app.delete('/todos/:title', (req, res) => {
    const taskToDelete = req.params.title;
    const queryText = 'DELETE FROM todolist WHERE title = $1 AND email = $2';
    db.query(queryText, [taskToDelete, req.user.email], (err, result) => {
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
