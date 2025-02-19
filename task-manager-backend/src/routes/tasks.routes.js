const express = require("express");
const { getTasks, addTask, updateTaskController, deleteTaskController } = require("../controllers/tasks.controller");
const authenticateUser = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateUser, getTasks);
router.post("/", authenticateUser, addTask);
router.put("/:id", authenticateUser, updateTaskController);
router.delete("/:id", authenticateUser, deleteTaskController);

module.exports = router;

