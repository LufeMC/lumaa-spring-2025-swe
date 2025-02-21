import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //Fetch Tasks (GET)
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  //Create Task (POST)
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      fetchTasks(); 
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  //Mark Task as Complete/Incomplete (PUT)
  const toggleTaskCompletion = async (id: number, isComplete: boolean) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        { isComplete: !isComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  //Edit Task
  const startEditing = (task: any) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  //Save Edited Task
  const saveTaskEdit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${editTaskId}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditTaskId(null);
      fetchTasks(); // Refresh UI
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  //Delete Task (DELETE)
  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // Logout (Clear Token & Redirect)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>Task Manager</h2>

      {/*Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      {/*Task Creation Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/*Display Tasks */}
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={saveTaskEdit} style={{ background: "blue" }}>
                  Save
                </button>
                <button onClick={() => setEditTaskId(null)}>Cancel</button>
              </>
            ) : (
              // Normal display mode
              <>
                <span
                  style={{
                    textDecoration: task.isComplete ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleTaskCompletion(task.id, task.isComplete)}
                >
                  {task.title} - {task.description}
                </span>

                <button onClick={() => startEditing(task)} style={{ marginLeft: "10px" }}>
                  ✏️
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  ❌
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
