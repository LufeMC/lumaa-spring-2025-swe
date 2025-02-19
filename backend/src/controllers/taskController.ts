import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware'; 
import pool from '../db';

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => { 
  try {
    const { title, description, isComplete } = req.body;
    const userId = req.user?.userId; 

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' }); 
      return;
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, description, isComplete, userId) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, isComplete, userId]
    );

    res.status(201).json(result.rows[0]); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => { 
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' }); 
      return;
    }

    const result = await pool.query(
      'SELECT * FROM tasks WHERE userId = $1',
      [userId]
    );

    res.status(200).json(result.rows); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, isComplete } = req.body;
  
      const result = await pool.query(
        'UPDATE tasks SET title = $1, isComplete = $2 WHERE id = $3 RETURNING *',
        [title, isComplete, id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
};

  
  // Delete a Task
  export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };