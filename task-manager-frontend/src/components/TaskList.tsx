import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface Task {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks for the authenticated user
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setEditTitle('');
      setEditDescription('');
      setShowAddTaskForm(false); // Hide form after adding
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Toggle Task Completion
  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, is_complete: !task.is_complete };
      const response = await axios.put(`${API_URL}/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Start Editing Mode
  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // Save Edited Task
  const handleSaveEdit = async (taskId: number) => {
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      
      <button onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
        {showAddTaskForm ? "Cancel" : "Add Task"}
      </button>

      {/* Show Form Only When "Add Task" Button is Clicked */}
      {showAddTaskForm && (
        <form onSubmit={handleAddTask} style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Task Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Task Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button type="submit">Save Task</button>
        </form>
      )}

      <table  style={{ width: "100%", marginTop: "20px", textAlign: "left", border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </td>
                  <td colSpan={2}>
                    <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ textDecoration: task.is_complete ? "line-through" : "none" }}>
                    {task.title}
                  </td>
                  <td>{task.description}</td>
                  <td>
                    <button onClick={() => handleToggleComplete(task)}>
                      {task.is_complete ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
