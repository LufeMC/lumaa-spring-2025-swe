import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Authentication required. Please provide a token.' });
      return;
    }

    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      res.status(401).json({ message: 'Invalid token format. Use Bearer token.' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Server configuration error.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; username: string };
      req.user = decoded;
      next();
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token has expired. Please login again.' });
      } else if (jwtError instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token. Please login again.' });
      } else {
        res.status(401).json({ message: 'Token verification failed.' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error during authentication.' });
  }
}; 