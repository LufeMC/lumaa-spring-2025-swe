const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./db"); // Database connection from db.js

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// Use environment variables or a default for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Authentication middleware to secure routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer TOKEN"
  if (!token)
    return res.status(401).json({ message: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};



// Register a new user
app.post("/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    
    // Check if the user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: "Username already exists" });
    
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route to authenticate a user and return a JWT
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    
    // Retrieve the user from the database
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const user = userResult.rows[0];
    
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
    // Sign a JWT token with the user ID
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ====================
// Tasks CRUD Routes (Protected)
// ====================

// GET /tasks - Retrieve tasks for the logged-in user
app.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
    res.json(tasks.rows);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /tasks - Create a new task for the logged-in user
app.post("/tasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, false, $3) RETURNING *",
      [title, description, userId]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /tasks/:id - Update a task (e.g., mark as complete, edit text)
app.put("/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;
    const { title, description, is_complete } = req.body;
    
    // Ensure the task belongs to the user
    const taskCheck = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId]
    );
    if (taskCheck.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });
    
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *",
      [title, description, is_complete, taskId]
    );
    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;
    
    // Verify the task belongs to the logged-in user
    const taskCheck = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId]
    );
    if (taskCheck.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });
    
    await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(5001, () => {
  console.log("Server started on port 5001");
});

module.exports = app;
