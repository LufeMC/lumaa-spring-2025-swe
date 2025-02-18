import React, { useState, useEffect } from "react";

function UpdateTask() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

// Fetch all tasks when component loads
useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/tasks`, {
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
  


  const handleTaskSelect = (taskId: string) => {
    const task = tasks.find((t) => t.id === Number(taskId));
    if (task) {
      setSelectedTaskId(taskId);
      setTitle(task.title);
      setDescription(task.description);
      setIsComplete(task.iscomplete);
    }
  };
  

  // Handle update request
  const handleUpdateTask = async () => {
    if (!selectedTaskId) {
      setError("Please select a task to update.");
      return;
    }
  
    console.log("Updating Task ID:", selectedTaskId);
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/tasks/${selectedTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, isComplete }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
  
      setSuccess("Task updated successfully!");
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };  
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center text-white">Update Task</h2>
      <p className="text-center text-white">Select a task to edit</p>

      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}

      <select
        onChange={(e) => handleTaskSelect(e.target.value)}
        className="block w-full px-4 py-3 mt-4 text-lg text-black border focus:border-gray-900 focus:ring-1 focus:outline-none">
        <option value="">Select a task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full px-4 py-3 mt-4 text-lg text-black border focus:border-gray-900 focus:ring-1 focus:outline-none"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="block w-full px-4 py-3 mt-4 text-lg text-black border focus:border-gray-900 focus:ring-1 focus:outline-none"
        />

        <select
          value={isComplete ? "Completed" : "Not Completed"}
          onChange={(e) => setIsComplete(e.target.value === "Completed")}
          className="block w-full px-4 py-3 mt-4 text-lg text-black border focus:border-gray-900 focus:ring-1 focus:outline-none">
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={handleUpdateTask}
          className="w-full px-4 py-3 mt-4 font-semibold text-black bg-white hover:bg-black hover:text-white"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

export default UpdateTask;
