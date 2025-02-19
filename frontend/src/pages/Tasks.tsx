import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  AppBar,
  Toolbar,
  CircularProgress,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { tasks } from '../services/api';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';

const TASKS_PER_PAGE = 5;

const Tasks = () => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'status'>('id');
  const [filter, setFilter] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null);

  useEffect(() => {
    loadTasks();
  }, [sortOrder, sortBy, filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await tasks.getAll();
      let filteredData = [...data];
      
      // Apply filter
      if (filter === 'complete') {
        filteredData = filteredData.filter(task => task.isComplete);
      } else if (filter === 'incomplete') {
        filteredData = filteredData.filter(task => !task.isComplete);
      }
      
      // Apply sorting
      filteredData.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'status') {
          comparison = Number(a.isComplete) - Number(b.isComplete);
        } else {
          comparison = a.id - b.id;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
      
      setTaskList(filteredData);
    } catch (error) {
      enqueueSnackbar('Failed to load tasks. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateInput = () => {
    if (!title.trim()) {
      enqueueSnackbar('Title is required', { variant: 'error' });
      return false;
    }
    if (title.length > 100) {
      enqueueSnackbar('Title must be less than 100 characters', { variant: 'error' });
      return false;
    }
    if (description.length > 500) {
      enqueueSnackbar('Description must be less than 500 characters', { variant: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      setLoading(true);
      if (editingTask) {
        await handleUpdateTask(editingTask.id);
      } else {
        await tasks.create({ title, description, isComplete: false });
        enqueueSnackbar('Task created successfully', { variant: 'success' });
      }
      setTitle('');
      setDescription('');
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      enqueueSnackbar('Failed to save task. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId: number) => {
    try {
      setLoadingTaskId(taskId);
      await tasks.update(taskId, { title, description });
      enqueueSnackbar('Task updated successfully', { variant: 'success' });
      await loadTasks();
    } catch (error: any) {
      const errorMessage = error.response?.status === 404 
        ? 'Task not found. It may have been deleted.'
        : 'Failed to update task. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setLoadingTaskId(taskId);
      await tasks.delete(taskId);
      enqueueSnackbar('Task deleted successfully', { variant: 'success' });
      await loadTasks();
    } catch (error: any) {
      const errorMessage = error.response?.status === 404 
        ? 'Task not found. It may have been deleted.'
        : 'Failed to delete task. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleToggleComplete = async (taskId: number, currentStatus: boolean) => {
    try {
      setLoading(true);
      await tasks.update(taskId, { isComplete: !currentStatus });
      await loadTasks();
      enqueueSnackbar(`Task marked as ${!currentStatus ? 'complete' : 'incomplete'}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update task. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (newSortBy: 'id' | 'title' | 'status') => {
    setSortBy(newSortBy);
    handleSortClose();
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom color="primary">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              disabled={loading}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                startIcon={<AddIcon />}
              >
                {loading ? <CircularProgress size={24} /> : (editingTask ? 'Update Task' : 'Add Task')}
              </Button>
              {editingTask && (
                <Button
                  onClick={() => {
                    setEditingTask(null);
                    setTitle('');
                    setDescription('');
                  }}
                  disabled={loading}
                  variant="outlined"
                >
                  Cancel
                </Button>
              )}
            </Box>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" color="primary">Tasks</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filter}
                  label="Filter"
                  onChange={(e: SelectChangeEvent<string>) => 
                    setFilter(e.target.value as 'all' | 'complete' | 'incomplete')
                  }
                  disabled={loading}
                >
                  <MenuItem value="all">All Tasks</MenuItem>
                  <MenuItem value="complete">Completed</MenuItem>
                  <MenuItem value="incomplete">Incomplete</MenuItem>
                </Select>
              </FormControl>

              <Tooltip title="Sort options">
                <IconButton 
                  onClick={handleSortClick}
                  disabled={loading}
                >
                  <SortIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
                  Order: {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
                </MenuItem>
                <Divider />
                <MenuItem 
                  onClick={() => handleSortChange('id')}
                  selected={sortBy === 'id'}
                >
                  Sort by Date
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSortChange('title')}
                  selected={sortBy === 'title'}
                >
                  Sort by Title
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSortChange('status')}
                  selected={sortBy === 'status'}
                >
                  Sort by Status
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress data-testid="tasks-loading" />
            </Box>
          )}

          <List>
            {taskList.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.isComplete}
                    onChange={() => handleToggleComplete(task.id, task.isComplete)}
                    disabled={loading}
                    data-testid={`task-checkbox-${task.id}`}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  data-testid={`task-title-${task.id}`}
                  sx={{
                    '& .MuiTypography-root': {
                      textDecoration: task.isComplete ? 'line-through' : 'none',
                    }
                  }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Edit task">
                    <IconButton
                      edge="end"
                      onClick={() => handleEdit(task)}
                      disabled={loading}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete task">
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {!loading && taskList.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="textSecondary">
                No tasks found. Create one to get started!
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Tasks; 