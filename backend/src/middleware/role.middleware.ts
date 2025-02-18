import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export const checkOwnership = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const resourceId = parseInt(req.params.id);
    const resourceUserId = parseInt(req.body.userId);

    if (!userId) {
      return res.status(401).json({ 
        message: 'User not authenticated' 
      });
    }

    // Check if the authenticated user owns the resource
    if (resourceUserId && resourceUserId !== userId) {
      return res.status(403).json({ 
        message: 'You do not have permission to access this resource' 
      });
    }

    next();
  } catch (error) {
    console.error('Check ownership middleware error:', error);
    return res.status(500).json({ 
      message: 'Internal server error checking resource ownership' 
    });
  }
}; 