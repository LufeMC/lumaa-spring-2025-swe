import { Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';
import { AuthRequest } from '../middleware/auth.middleware';

const taskRepository = AppDataSource.getRepository(Task);

export const taskController = {
  async getTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await taskRepository.find({
        where: { userId: req.user?.id },
        order: { id: 'DESC' }
      });
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching tasks' });
    }
  },

  async createTask(req: AuthRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const task = taskRepository.create({
        title,
        description,
        userId: req.user?.id
      });
      await taskRepository.save(task);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating task' });
    }
  },

  async updateTask(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const task = await taskRepository.findOne({
        where: { id: parseInt(id), userId: req.user?.id }
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      taskRepository.merge(task, req.body);
      const updatedTask = await taskRepository.save(task);
      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating task' });
    }
  },

  async deleteTask(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const task = await taskRepository.findOne({
        where: { id: parseInt(id), userId: req.user?.id }
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await taskRepository.remove(task);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting task' });
    }
  }
}; 