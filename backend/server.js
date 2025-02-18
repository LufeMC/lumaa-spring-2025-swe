const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./database');
require('dotenv').config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true })); 
app.use(express.json()); 


app.use((req, res, next) => {
    req.on('data', chunk => {
        console.log("RAW BODY:", chunk.toString());
    });
    next();
});


const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = require('./auth');


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.delete("/tasks/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;

    console.log("DELETE request received for Task ID:", id, "by User ID:", userId);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);

        if (result.rowCount === 0) {
            console.log("Task not found or unauthorized deletion attempt.");
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        console.log("Task deleted successfully!");
        res.json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/tasks', verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId; 

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, iscomplete, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, false, userId]
        );

        res.status(201).json({ message: 'Task added successfully!', task: newTask.rows[0] });
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ message: "Server error" });
    }
});

  
app.get('/tasks', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
  
    try {
      const task = await pool.query("UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *", 
        [title, description, isComplete, id]);
  
      if (task.rowCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
