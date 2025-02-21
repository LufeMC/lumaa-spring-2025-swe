import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';
import { AuthRequest } from '../types/auth.types';

const taskRepository = AppDataSource.getRepository(Task);

export const taskController = {
  getTasks: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const tasks = await taskRepository.find({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' }
      });
      
      res.json(tasks);
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  },

  createTask: async (req: AuthRequest, res: Response) => {
    try {
      const { title, description } = req.body;
      const userId = req.user?.id;

      const task = taskRepository.create({
        title,
        description,
        user: { id: userId }
      });
      
      await taskRepository.save(task);
      
      res.status(201).json(task);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ message: 'Error creating task' });
    }
  },

  updateTask: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      await taskRepository.update(id, updates);
      
      const updatedTask = await taskRepository.findOne({ where: { id: parseInt(id) } });
      
      res.json(updatedTask);
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ message: 'Error updating task' });
    }
  },

  deleteTask: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      
      await taskRepository.delete(id);
      
      res.status(204).send();
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  }
}; 