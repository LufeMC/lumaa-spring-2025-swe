import express from 'express';
import { getRecommendations } from '../controllers/recommendController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/recommend', verifyToken, getRecommendations);


export default router;
