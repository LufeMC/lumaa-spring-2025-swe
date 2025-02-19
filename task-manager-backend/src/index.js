const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/tasks.routes"));

// Import the table creation functions from the models
const { createUserTable } = require("./models/user.model");
const { createTaskTable } = require("./models/task.model");

const PORT = process.env.PORT || 5000;

// Start the server first
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Create the users table first, then the tasks table
  try {
    await createUserTable();
    console.log("Users table created (or already exists).");

    await createTaskTable();
    console.log("Tasks table created (or already exists).");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
});

