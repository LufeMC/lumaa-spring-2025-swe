import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getTasks);       // GET /api/tasks
router.post('/', verifyToken, createTask);    // POST /api/tasks
router.put('/:id', verifyToken, updateTask);  // PUT /api/tasks/:id
router.delete('/:id', verifyToken, deleteTask); // DELETE /api/tasks/:id

export default router;
