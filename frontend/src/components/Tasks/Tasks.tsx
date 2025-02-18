import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { Add as AddIcon } from '@mui/icons-material';
import { Button, Container, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';
import api from '../../api/axios';

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({ title: '', description: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await api.get<Task[]>('/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        setSnackbarMessage('Error fetching tasks');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    setNewTask({ title: '', description: '' });
    setOpenDialog(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbarMessage('No authentication token found');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, {
          title: newTask.title,
          description: newTask.description,
          isComplete: false,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(tasks.map(task =>
          task.id === editingTask.id ? { ...task, title: newTask.title, description: newTask.description } : task
        ));
        setSnackbarMessage('Task updated successfully');
      } else {
        const response = await api.post('/tasks', {
          title: newTask.title,
          description: newTask.description,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks([...tasks, response.data]);
        setSnackbarMessage('Task added successfully');
      }
      setOpenDialog(false);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setSnackbarMessage('Error saving task');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTask = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbarMessage('No authentication token found');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
      setSnackbarMessage('Task deleted successfully');
    } catch (error) {
      setSnackbarMessage('Error deleting task');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbarMessage('No authentication token found');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          is_complete: !taskToUpdate.is_complete,
        };

        await api.put(`/tasks/${id}`, updatedTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        setSnackbarMessage('Task status updated');
      }
    } catch (error) {
      setSnackbarMessage('Error toggling task completion');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleAddTask}
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none', borderRadius: '8px', fontFamily: 'Dosis' }}
            disabled={loading}
          >
            Add Task
          </Button>
        </Grid>

        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              is_complete={task.is_complete}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleToggleComplete={handleToggleComplete}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="secondary" disabled={loading}>
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Tasks;
