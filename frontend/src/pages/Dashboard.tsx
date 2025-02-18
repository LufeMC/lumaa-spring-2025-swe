import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddComponent from "../components/AddTask";
import UpdateComponent from "../components/UpdateTask";
import DeleteComponent from "../components/DeleteTask";
import Popup from "../components/Popup";

type ComponentType = "add" | "update" | "delete" | null;

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        setTasks(data);
        console.log("Fetched Tasks:", data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <div className="absolute left-0 h-screen w-64 bg-neutral-900 px-8">
        <h1 className="text-3xl mt-5 text-center font-bold text-white">User Panel</h1>

        <div className="grid place-items-center mt-20">
          <button onClick={() => setActiveComponent("add")} className="w-32 bg-white px-2 py-3 text-black text-sm font-semibold hover:bg-black hover:text-white">
            Add
          </button>
          <button onClick={() => setActiveComponent("update")} className="mt-6 w-32 bg-white px-2 py-3 text-black text-sm font-semibold hover:bg-black hover:text-white">
            Update
          </button>
          <button onClick={() => setActiveComponent("delete")} className="mt-6 w-32 bg-white px-2 py-3 text-black text-sm font-semibold hover:bg-black hover:text-white">
            Delete
          </button>
          <button onClick={handleLogout} className="mt-44 w-32 bg-white py-3 text-black text-sm font-semibold hover:bg-black hover:text-white">
            Log out
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-full ml-64 mt-5">
        <h1 className="text-4xl text-center font-bold text-white mb-6">Task List</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center text-center items-center w-full mt-4">
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="bg-neutral-900 py-6 px-6 text-white">
                  <h2 className="text-xl font-bold">{task.title}</h2>
                  <p>{task.description}</p>
                  <p className={`mt-2 text-sm text-center ${task.iscomplete ? "text-green-400" : "text-red-400"}`}>
                    {task.iscomplete ? "Completed" : "Not Completed"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-xl">No tasks found, add a task?</p>
          )}
        </div>
      </div>

      {activeComponent === "add" && <Popup onClose={() => setActiveComponent(null)}><AddComponent /></Popup>}
      {activeComponent === "update" && <Popup onClose={() => setActiveComponent(null)}><UpdateComponent /></Popup>}
      {activeComponent === "delete" && <Popup onClose={() => setActiveComponent(null)}><DeleteComponent /></Popup>}
    </div>
  );
}

export default Dashboard;
