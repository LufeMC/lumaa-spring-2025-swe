import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const saltRounds = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: { username: string; password: string } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: { username: string; password: string } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
