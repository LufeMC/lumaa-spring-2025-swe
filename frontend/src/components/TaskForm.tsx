import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, getTasks } from '../api';

interface Task {
  id?: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [task, setTask] = useState<Task>({ title: '', description: '', iscomplete: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
          const response = await getTasks(token);
          const taskToEdit = response.data.find((t: Task) => t.id === parseInt(id));
          if (taskToEdit) setTask(taskToEdit);
        } catch (err) {
          console.error('Failed to fetch task', err);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      if (id) {
        await updateTask(parseInt(id), task.title, task.description, task.iscomplete, token);
      } else {
        await createTask(task.title, task.description, token);
      }
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={task.iscomplete}
              onChange={(e) => setTask({ ...task, iscomplete: e.target.checked })}
            />
            Completed
          </label>
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default TaskForm;