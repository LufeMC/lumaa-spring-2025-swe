require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { checkDBConnection } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Start Server After Checking DB Connection
checkDBConnection().then(() => {
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}).catch(err => {
  console.error("❌ Could not start server due to DB connection failure:", err);
});
