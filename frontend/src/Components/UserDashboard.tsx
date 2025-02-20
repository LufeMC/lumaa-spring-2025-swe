import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/dashboard.css';
import TaskCard from '../Components/TaskCard';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  created_at: string;
}

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const navigate = useNavigate();

  // Check if the token is expired
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/'); // Redirect to home page
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenExpired(token)) {
      handleLogout(); // Log out if token is expired
    }
  }, [navigate]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/tasks/createTask', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error('Failed to create task');

      const newTask: Task = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Tasks</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <button
          className="add-task-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '×' : '+'}
        </button>
      </div>

      <div className={`add-task-form ${showAddForm ? 'visible' : ''}`}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
