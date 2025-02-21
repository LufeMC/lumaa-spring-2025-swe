import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export const checkOwnership = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const resourceId = parseInt(req.params.id);
    const resourceUserId = parseInt(req.body.userId);

    if (!userId) {
      res.status(401).json({ 
        message: 'User not authenticated' 
      });
      return;
    }

    // Check if the authenticated user owns the resource
    if (resourceUserId && resourceUserId !== userId) {
      res.status(403).json({ 
        message: 'You do not have permission to access this resource' 
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Check ownership middleware error:', error);
    res.status(500).json({ 
      message: 'Internal server error checking resource ownership' 
    });
    return;
  }
}; 