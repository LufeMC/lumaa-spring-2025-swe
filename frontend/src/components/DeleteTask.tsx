import React, { useState, useEffect } from "react";

function DeleteTask() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch tasks when component mounts
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
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  // Handle task deletion
  const handleDeleteTask = async () => {
    if (!selectedTaskId) {
      setError("Please select a task to delete.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
    const response = await fetch(`http://localhost:5000/tasks/${selectedTaskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess("Task deleted successfully!");

      window.location.reload();
      setTasks(tasks.filter((task) => task.id !== Number(selectedTaskId))); // Remove task from list
      setSelectedTaskId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center text-white">Delete Task</h2>
      <p className="text-center text-gray-300">Select a task to delete</p>

      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}

      <select
        value={selectedTaskId || ""}
        onChange={(e) => setSelectedTaskId(e.target.value)}
        className="block w-full px-4 py-3 mt-4 text-lg text-white border focus:border-gray-900 focus:ring-1 focus:outline-none"
        >
        <option value="">Select a task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <button
        onClick={handleDeleteTask}
        className="mt-4 w-full px-4 py-3 font-semibold text-black bg-neutral-700 hover:bg-black"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteTask;
