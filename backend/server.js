require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

sequelize.sync().then(() => {
  console.log("Database connected and tables synced");
  app.listen(3001, () => console.log("Server running on port 3001"));
});
