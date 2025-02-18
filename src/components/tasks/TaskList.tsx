import React, { useEffect, useState } from 'react';
import { Box, List, Typography, CircularProgress } from '@mui/material';
import { taskService } from '../../services/taskService';
import { Task } from '../../types/task';
import { TaskItem } from './TaskItem';
import { CreateTaskForm } from './CreateTaskForm';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreate = async (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
      <CreateTaskForm onTaskCreate={handleTaskCreate} />
      <List>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
        ))}
      </List>
    </Box>
  );
}; 