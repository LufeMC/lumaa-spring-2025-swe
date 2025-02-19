require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());

app.use(express.json());

app.use(morgan('common'));

pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        "isComplete" BOOL DEFAULT FALSE NOT NULL,
        userId INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
`);

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: "Failed to authenticate token" });
        }
        req.userId = decoded.id;
        next();
    });
};

app.post("/auth/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, hash]
        );
        res.status(200).send("User added successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const userRecord = result.rows[0];
        const match = await bcrypt.compare(password, userRecord.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ id: userRecord.id, username: userRecord.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/tasks", verifyToken, async (req, res) => {
    const userId  = req.userId;
    try {
        const query = userId ? "SELECT * FROM tasks WHERE userId = $1" : "SELECT * FROM tasks";
        const params = userId ? [userId] : [];
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/tasks", verifyToken, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
            [title, description, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/tasks/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const result = await pool.query(
            `UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 RETURNING *`,
            [title, description, isComplete, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/tasks/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
