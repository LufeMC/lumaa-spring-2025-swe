import { Router, RequestHandler } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate, authValidation } from '../middleware/validation.middleware';

const router = Router();

const handleAuth: RequestHandler = async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    next(error);
  }
};

router.post('/register', validate(authValidation.register), handleAuth);
router.post('/login', validate(authValidation.login), handleAuth);

export default router; 