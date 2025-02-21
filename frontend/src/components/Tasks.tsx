import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string; isComplete: boolean }[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(token, title, description);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleToggleComplete = async (id: string, isComplete: boolean) => {
    await updateTask(token, id, { isComplete: !isComplete });
    fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(token, id);
    fetchTasks();
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      <form onSubmit={handleCreateTask}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isComplete ? "line-through" : "none" }}>{task.title} - {task.description}</span>
            <button onClick={() => handleToggleComplete(task.id, task.isComplete)}>{task.isComplete ? "Undo" : "Complete"}</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
