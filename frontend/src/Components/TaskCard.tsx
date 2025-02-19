import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  created_at: string;
}

const TaskCard: React.FC<{ 
  task: Task;
  fetchTasks: () => void 
}> = ({ task, fetchTasks }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description || '');

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
          description: updatedDescription 
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      fetchTasks();
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <button 
          className="dropdown-button"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
        >
          {showUpdateForm ? '×' : 'Update'}
        </button>
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

      {task.description && <p>{task.description}</p>}
      <div className="task-meta">
        <span>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</span>
        <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TaskCard;
