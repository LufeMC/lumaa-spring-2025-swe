import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const user = new User();
    user.username = username;
    user.password = password;

    await userRepository.save(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
}; 