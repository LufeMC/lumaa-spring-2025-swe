import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, TokenPayload } from '../types/auth.types';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Authorization header is missing' 
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Invalid authorization format. Use Bearer token' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token is missing' 
      });
    }

    try {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-secret-key'
      ) as TokenPayload;

      // Check if token is expired
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ 
          message: 'Token has expired' 
        });
      }

      req.user = {
        id: decoded.id,
        username: decoded.username
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ 
          message: 'Invalid token' 
        });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ 
          message: 'Token has expired' 
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      message: 'Internal server error during authentication' 
    });
  }
}; 

export { AuthRequest };
