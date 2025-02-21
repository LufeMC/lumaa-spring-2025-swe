import { useEffect, useState } from "react";
import { Task } from "../types";
import { fetchTasks, deleteTask, updateTask } from "../api";
import TaskForm from "./TaskForm";
import { toast } from 'react-toastify'; // Import toast


const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to load tasks. Please try again.');
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (id: number, isChecked: boolean) => {
    try {
      await updateTask(id, { isComplete: isChecked });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isComplete: isChecked } : task
        )
      );
      toast.success(`Task marked as ${isChecked ? 'complete' : 'incomplete'}!`);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleRefreshTasks = async () => {
    try {
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
      toast.error('Failed to refresh tasks. Please try again.');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Create New Task</button>
      )}

      {showForm && (
        <TaskForm
          taskId={editingTask?.id}
          onClose={handleCloseForm}
          refreshTasks={handleRefreshTasks}
        />
      )}

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ display: "flex", alignItems: "center", gap: 20 }}
          >
            <input
              style={{ height: 20 }}
              type="checkbox"
              checked={task.isComplete}
              onChange={(e) => handleToggleComplete(task.id, e.target.checked)}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                  fontWeight: "bold",
                }}
              >
                {task.title}
              </span>

              <span
                style={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                }}
              >
                {task.description}
              </span>
            </div>

            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
