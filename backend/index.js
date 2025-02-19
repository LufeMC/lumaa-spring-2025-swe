import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from "pg";
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import todosRoutes from './routes/todos.js';
import db from './db.js';

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

// Use todos routes
app.use('/todos', todosRoutes);

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
