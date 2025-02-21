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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>

        {/* Improved Logout Button */}
        <button 
          onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mb-4"
        >
          Logout
        </button>

        <form onSubmit={handleCreateTask} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>

        {/* Updated Task List with Larger Icons & Tooltips */}
        <ul className="mt-4 space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="border-b p-3 flex justify-between items-center">
              <span className={task.isComplete ? "line-through text-gray-500" : ""}>{task.title}</span>
              <div className="flex gap-4">
                
                {/* Task Complete/Undo Button */}
                <button
                  onClick={() => handleToggleComplete(task.id, task.isComplete)}
                  className="text-green-500 text-2xl hover:text-green-700 transition"
                  title={task.isComplete ? "Undo Task" : "Mark as Complete"}
                >
                  {task.isComplete ? "↩" : "✔"}
                </button>

                {/* Delete Task Button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 text-2xl hover:text-red-700 transition"
                  title="Delete Task"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
