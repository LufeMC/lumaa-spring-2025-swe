import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  Box
} from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { Task, UpdateTaskDto } from '../../types/task';
import { taskService } from '../../services/taskService';

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await taskService.updateTask(task.id, {
        isComplete: !task.isComplete
      });
      onUpdate(updatedTask);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTask = await taskService.updateTask(task.id, {
        title: editedTitle
      });
      onUpdate(updatedTask);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box>
          {isEditing ? (
            <>
              <IconButton onClick={handleSaveEdit}>
                <Save />
              </IconButton>
              <IconButton onClick={() => setIsEditing(false)}>
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setIsEditing(true)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(task.id)}>
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
      }
    >
      <Checkbox
        checked={task.isComplete}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          fullWidth
        />
      ) : (
        <ListItemText
          primary={task.title}
          sx={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
        />
      )}
    </ListItem>
  );
}; 