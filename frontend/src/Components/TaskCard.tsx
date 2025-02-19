import React from 'react';
import '../styling/taskCard.css'

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  created_at: string;
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`status-badge ${task.isComplete ? 'complete' : 'pending'}`}>
          {task.isComplete ? '✓' : '•'}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-footer">
        <span className="created-date">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
