import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, TokenPayload } from '../types/auth.types';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ 
        message: 'Authorization header is missing' 
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        message: 'Invalid authorization format. Use Bearer token' 
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        message: 'Token is missing' 
      });
      return;
    }

    try {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-secret-key'
      ) as TokenPayload;

      req.user = {
        id: decoded.id,
        username: decoded.username
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ 
          message: 'Invalid token' 
        });
        return;
      }
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ 
          message: 'Token has expired' 
        });
        return;
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      message: 'Internal server error during authentication' 
    });
    return;
  }
}; 