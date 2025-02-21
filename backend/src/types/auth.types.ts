import { Request } from 'express';

export interface UserPayload {
  id: number;
  username: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface TokenPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
} 