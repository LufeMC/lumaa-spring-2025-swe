import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Paper, 
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  Menu
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { apiClient } from '../../api/client';
import { TaskForm } from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleStatusUpdate = async (isComplete: boolean) => {
    if (!selectedTask) return;
    try {
      await apiClient.put(`/tasks/${selectedTask.id}`, { isComplete });
      fetchTasks();
      handleMenuClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      await apiClient.delete(`/tasks/${selectedTask.id}`);
      fetchTasks();
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">My Tasks</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setOpenTaskForm(true)}
        >
          Add Task
        </Button>
      </Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={`${task.description} - Status: ${task.isComplete ? 'DONE' : 'TODO'}`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={(e) => handleMenuOpen(e, task)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusUpdate(false)}>Set To Do</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(true)}>Set Done</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
      <TaskForm 
        open={openTaskForm} 
        onClose={() => setOpenTaskForm(false)}
        onTaskCreated={fetchTasks}
      />
    </Paper>
  );
}; 