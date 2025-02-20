import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../api';

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => navigate('/tasks/new')}>Create New Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.iscomplete ? 'Completed' : 'Pending'}</p>
            <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;