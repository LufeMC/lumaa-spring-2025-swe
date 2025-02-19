import React, { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const token = localStorage.getItem("token");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or Update Task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update Task
        await axios.put(
          `http://localhost:5000/tasks/${editingTask.id}`,
          { title, description, isComplete: editingTask.iscomplete },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create Task
        await axios.post(
          "http://localhost:5000/tasks",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setDescription("");
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start Editing a Task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  // Toggle Task Completion
  const handleToggleComplete = async (task: Task) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${task.id}`,
        { title: task.title, description: task.description, isComplete: !task.iscomplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={() => setEditingTask(null)}>
            Cancel
          </button>
        )}
      </form>

      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <strong>{task.title}</strong> - {task.description} - Completed:{" "}
            {task.iscomplete ? "✅ Yes" : "❌ No"}
            <button onClick={() => handleEditTask(task)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
            <button onClick={() => handleToggleComplete(task)} style={{ marginLeft: "10px" }}>
              {task.iscomplete ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

