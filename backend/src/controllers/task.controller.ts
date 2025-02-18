import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth.middleware';

const taskRepository = AppDataSource.getRepository(Task);

// Get all tasks for the authenticated user
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await taskRepository.find({
      where: { userId: req.user!.id },
      order: { id: 'DESC' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create a new task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.isComplete = false;
    task.userId = req.user!.id;

    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await taskRepository.findOne({
      where: { id: parseInt(id), userId: req.user!.id }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.isComplete = isComplete ?? task.isComplete;

    await taskRepository.save(task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskRepository.findOne({
      where: { id: parseInt(id), userId: req.user!.id }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await taskRepository.remove(task);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
}; 