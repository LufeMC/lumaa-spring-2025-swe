import React, { useState } from "react";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in localStorage");
      setError("You must be logged in to add a task.");
      return;
    }
  
    try {
      console.log("Sending request to backend...");
  
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ title, description }),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }
  
      setSuccess("Task added successfully!");
      window.location.reload();
      setTitle("");
      setDescription("");
      setError("");
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
      setSuccess("");
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center text-white">Add Task</h2>
      <p className="text-center text-white">Fill out add task form</p>

      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}
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

        <button
          onClick={handleAddTask}
          className="mt-4 mb-4 w-full flex justify-center bg-white px-4 py-3 font-semibold text-black hover:bg-black hover:text-white"
        >
          Add Task
        </button>
      
    </div>
  );
}

export default AddTask;
