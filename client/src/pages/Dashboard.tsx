import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { useTaskStore } from "../store/tasks";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import TaskCard from "../components/TaskCard";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { tasks, loadTasks, addTask, updateTask, removeTask } = useTaskStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    loadTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await addTask(title, description);
    setTitle("");
    setDescription("");
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isComplete;
    if (filter === "pending") return !task.isComplete;
    return true; // "all"
  });

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <Logo />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <Icon icon="mdi:logout" width="20" />
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center p-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Welcome, {user?.username}! 🎯
        </motion.h2>

        <motion.form
          onSubmit={handleAddTask}
          className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-primary"
          />
          <textarea
            placeholder="Task Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-primary"
            rows={2}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:plus" width="20" />
            Add Task
          </button>
        </motion.form>

        <div className="flex gap-4 mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"} transition`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"} transition`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"} transition`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <motion.div
          className="mt-6 w-full max-w-xl space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} onUpdate={updateTask} onDelete={removeTask} />)
          ) : (
            <p className="text-gray-500 text-center">No tasks Yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
