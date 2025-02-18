import { Router } from 'express';
import { RequestHandler } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected by authentication
router.use(authMiddleware as RequestHandler);

// Cast handlers to RequestHandler to fix type issues
router.get('/', getTasks as RequestHandler);
router.post('/', createTask as RequestHandler);
router.put('/:id', updateTask as RequestHandler);
router.delete('/:id', deleteTask as RequestHandler);

export default router; 