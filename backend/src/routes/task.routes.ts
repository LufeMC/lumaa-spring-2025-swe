import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { checkOwnership } from '../middleware/role.middleware';
import { validate, taskValidation } from '../middleware/validation.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes with validation and ownership checking
router.get('/', taskController.getTasks);
router.post('/', validate(taskValidation.create), taskController.createTask);
router.put('/:id', 
  validate(taskValidation.update), 
  checkOwnership, 
  taskController.updateTask
);
router.delete('/:id', checkOwnership, taskController.deleteTask);

export default router; 