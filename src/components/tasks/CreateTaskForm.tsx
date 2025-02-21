import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CreateTaskDto } from '../../types/task';
import { taskService } from '../../services/taskService';

interface CreateTaskFormProps {
  onTaskCreate: (task: any) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreate }) => {
  const [newTask, setNewTask] = useState<CreateTaskDto>({
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTask = await taskService.createTask(newTask);
      onTaskCreate(createdTask);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description (optional)"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        margin="normal"
        multiline
        rows={2}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        disabled={!newTask.title}
      >
        Add Task
      </Button>
    </Box>
  );
}; 