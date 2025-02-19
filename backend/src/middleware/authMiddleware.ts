import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Export the interface
export interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    req.user = { userId: decoded.userId }; 
    next(); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
