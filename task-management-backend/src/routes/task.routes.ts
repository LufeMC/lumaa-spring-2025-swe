import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { validate, taskValidation } from '../middleware/validation.middleware';
import { checkOwnership } from '../middleware/role.middleware';

const router = Router();

router.get('/', taskController.getTasks);
router.post('/', validate(taskValidation.create), taskController.createTask);
router.put('/:id', validate(taskValidation.update), checkOwnership, taskController.updateTask);
router.delete('/:id', checkOwnership, taskController.deleteTask);

export default router; 