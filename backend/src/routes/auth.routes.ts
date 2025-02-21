import { Router } from 'express';
import { RequestHandler } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

export default router; 