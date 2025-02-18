import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = userRepository.create({
        username,
        password: hashedPassword
      });

      // Save user
      await userRepository.save(user);

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.status(201).json({
        token,
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Error creating user' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in' });
    }
  }
}; 