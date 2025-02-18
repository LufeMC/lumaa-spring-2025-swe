// filepath: /c:/Users/vishr/OneDrive/Documents/Lumaa/lumaa-spring-2025-swe/frontend/src/TodoListPage.jsx
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './index.css';

const TodoListPage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await fetch("http://localhost:3000/todos", {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTodos(Array.isArray(data) ? data : []);
            } else {
                console.error("Error fetching todos:", response.statusText);
            }
        };

        fetchTodos();
    }, []);

    const handleAdd = (newTask) => {
        setTodos([...todos, newTask]);

        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTask })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task added:", data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    };

    const handleDelete = (taskToDelete) => {
        setTodos(todos.filter(task => task !== taskToDelete));

        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${taskToDelete}`, {
            method: "DELETE",
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task deleted:", data);
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };

    return (
        <div className="container">
            <div className="overlay"></div>
            <div className="content">
                <h1>Todo List</h1>
                <AddList onAdd={handleAdd} />
                <TodoList todos={todos} onDelete={handleDelete} />
            </div>
        </div>
    );
};

const AddList = ({ onAdd }) => {
    const [newTask, setNewTask] = useState("");

    const handleChange = (e) => {
        setNewTask(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleAdd = () => {
        if (newTask.trim() !== "") {
            onAdd(newTask); // onAdd is a prop passed from the parent component
            setNewTask("");
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={newTask} 
                onChange={handleChange} 
                placeholder="Add a new task" 
            />
            <button onClick={handleAdd}>+</button>
        </div>
    );
};

AddList.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const TodoList = ({ todos, onDelete }) => {
    const handleCheckboxChange = (event, task) => {
        event.preventDefault(); // Prevent the default checkbox behavior
        onDelete(task);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            onChange={(event) => handleCheckboxChange(event, todo)} 
                        /> 
                        {todo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TodoListPage;