import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Please log in to manage your watchlist.');
      navigate('/');
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch tasks. Please try again later.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Movie title is required.');
      return;
    }

    try {
      if (editTaskId) {
        // Update existing task
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${editTaskId}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === editTaskId ? response.data : task))
        );
      } else {
        // Create new task
        const response = await axios.post(
          'http://localhost:5000/api/tasks',
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks((prevTasks) => [response.data, ...prevTasks]);
      }

      setTitle('');
      setDescription('');
      setEditTaskId(null);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save task.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this movie from your watchlist?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete task.');
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task.id}`,
        { title: task.title, description: task.description, iscomplete: !task.iscomplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update task completion status locally without refetching
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, iscomplete: !t.iscomplete } : t
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update task.');
    }
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>📋 Movie Watchlist</h2>

      {/* 📝 Task Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '30px',
        }}
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '10px',
            width: '60%',
            marginBottom: '10px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            width: '60%',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {editTaskId ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      {/* 🔔 Error Message */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* 🎥 Task List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'left',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {tasks.length === 0 ? (
          <p>No movies in your watchlist yet. Add some above! 🎥🍿</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: '15px',
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ fontSize: '18px' }}>{task.title}</strong>
                <p style={{ marginTop: '5px', fontSize: '14px', color: '#555' }}>{task.description}</p>
              </div>
              <div>
                <button
                  onClick={() => toggleComplete(task)}
                  style={{
                    marginRight: '10px',
                    backgroundColor: task.iscomplete ? '#4caf50' : '#f0ad4e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  {task.iscomplete ? '✅ Watched' : '👀 Watch'}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#0275d8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    backgroundColor: '#d9534f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskDashboard;
