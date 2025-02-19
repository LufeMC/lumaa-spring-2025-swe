import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const token = localStorage.getItem('token');


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const fetchTasks = () => {
    axios.get(`${BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => setTasks(response.data))
    .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks(); // Load tasks on component mount
  }, [token]);

  // Add Task
  const handleAddTask = () => {
    if (!newTask.trim()) return;
    axios.post(
      `${BACKEND_URL}/tasks`,
      { title: newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      fetchTasks(); // Refresh tasks after adding
      setNewTask('');
    }).catch((error) => console.error('Error adding task:', error));
  };

  
  const handleDeleteTask = (taskId: number) => {
    axios.delete(`${BACKEND_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      fetchTasks(); // Refresh tasks after deletion
    }).catch((error) => console.error('Error deleting task:', error));
  };

 
  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

 
  const handleSaveEditTask = () => {
    if (!editTaskTitle.trim()) return;
    
    console.log(`Updating task ID: ${editTaskId} with title: ${editTaskTitle}`); // Debugging Log
  
    axios.put(
      `${BACKEND_URL}/tasks/${editTaskId}`,
      { title: editTaskTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      fetchTasks(); 
      setEditTaskId(null);
      setEditTaskTitle('');
    }).catch((error) => console.error('Error updating task:', error));
  };
  
  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  return (
    <div className="container">
      {/* Centered Title */}
      <h2 className="task-title">Tasks</h2>

      {/* Add Task Input */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editTaskId === task.id ? (
                <>
                  <input 
                    type="text" 
                    value={editTaskTitle} 
                    onChange={(e) => setEditTaskTitle(e.target.value)} 
                  />
                  <button onClick={handleSaveEditTask}>💾 Save</button>
                </>
              ) : (
                <>
                  <div className="task-box">
                    <span>{task.title}</span>
                  </div>
                  <div className="task-buttons">
                    <button onClick={() => handleEditTask(task)}>✏️ Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>🗑️ Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button at the Bottom */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TaskList;
