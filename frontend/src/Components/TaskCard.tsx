import React, { useState, useEffect } from 'react';
import '../styling/taskCard.css';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  created_at: string;
}

const TaskCard: React.FC<{ 
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}> = ({ task, setTasks }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description || '');
  const [isChecked, setIsChecked] = useState(task.isComplete);

  // sync form fields with task data 
  useEffect(() => {
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description || '');
    setIsChecked(task.isComplete);
  }, [task]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          isComplete: task.isComplete,
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      // update state directly
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id
            ? { ...t, title: updatedTitle, description: updatedDescription }
            : t
        )
      );
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // update state
      setTasks(prev => prev.filter(t => t.id !== task.id));

      const response = await fetch(`http://localhost:3001/api/tasks/delete/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        // fallback if delete fails
        setTasks(prev => [...prev, task]);
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCheckboxChange = async () => {
    try {
      const updatedTask = { ...task, isComplete: !isChecked };
      setIsChecked(!isChecked); // update state

      // Update backend
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isComplete: !isChecked }),
      });

      if (!response.ok) throw new Error('Failed to update task');

     
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error('Error updating task completion status:', error);
      setIsChecked(isChecked); 
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="dropdown-container">
          <button 
            className="dropdown-toggle"
            onClick={() => setShowMenu(!showMenu)}
          >
            •••
          </button>
          
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={() => {
                setShowMenu(false);
                setShowUpdateForm(true);
              }}>
                Update
              </button>
              <button onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showUpdateForm && (
        <div className="update-form">
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Task Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setShowUpdateForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="task-body">
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
