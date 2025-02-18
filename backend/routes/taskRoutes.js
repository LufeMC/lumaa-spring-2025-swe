const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getTasks);           
router.post("/", verifyToken, createTask);     
router.put("/:id", verifyToken, updateTask);     
router.delete("/:id", verifyToken, deleteTask); 

module.exports = router;
