import { useState } from 'react';
import { createTask, updateTask } from '../api';
import { toast } from 'react-toastify';

interface Props {
  taskId?: number;
  onClose: () => void;
  refreshTasks: () => void;
}

const TaskForm = ({ taskId, onClose, refreshTasks }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (taskId) {
        await updateTask(taskId, { title, description });
        toast.success('Task updated successfully!');
      } else {
        await createTask({ title, description, isComplete: false });
        toast.success('Task created successfully!');
      }
      refreshTasks();
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>{taskId ? 'Edit Task' : 'Create Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="fields"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="fields"
      />
      <br />
      <button type="submit">{taskId ? 'Update Task' : 'Create Task'}</button>
      <br />
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;