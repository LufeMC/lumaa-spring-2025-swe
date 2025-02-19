// filepath: /c:/Users/vishr/OneDrive/Documents/Lumaa/lumaa-spring-2025-swe/backend/routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;