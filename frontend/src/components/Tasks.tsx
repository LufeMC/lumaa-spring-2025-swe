import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../types';
import { api } from '../services/api';
import { useSnackbar } from 'notistack';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      enqueueSnackbar('Error fetching tasks', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/tasks', { title: newTaskTitle.trim() });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      enqueueSnackbar('Task created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating task', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId: string, currentStatus: boolean) => {
    setLoadingTaskId(taskId);
    try {
      await api.put(`/tasks/${taskId}`, { completed: !currentStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      ));
      enqueueSnackbar(`Task marked as ${!currentStatus ? 'complete' : 'incomplete'}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating task', { variant: 'error' });
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setLoadingTaskId(taskId);
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      enqueueSnackbar('Task deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting task', { variant: 'error' });
    } finally {
      setLoadingTaskId(null);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress data-testid="loading-spinner" />
      </Box>
    );
  }

  return (
    <Box>
      <form onSubmit={handleAddTask}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task"
            variant="outlined"
            size="small"
            data-testid="new-task-input"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newTaskTitle.trim() || loading}
            data-testid="add-task-button"
          >
            Add Task
          </Button>
        </Box>
      </form>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(task.id)}
                disabled={loadingTaskId === task.id}
                data-testid={`delete-task-${task.id}`}
              >
                {loadingTaskId === task.id ? (
                  <CircularProgress size={24} data-testid={`loading-task-${task.id}`} />
                ) : (
                  <DeleteIcon />
                )}
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id, task.completed)}
                disabled={loadingTaskId === task.id}
                data-testid={`task-checkbox-${task.id}`}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.title}
              data-testid={`task-title-${task.id}`}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
          </ListItem>
        ))}
      </List>

      {tasks.length === 0 && (
        <Typography variant="body1" color="textSecondary" align="center">
          No tasks yet. Add one above!
        </Typography>
      )}
    </Box>
  );
};

export default Tasks; 