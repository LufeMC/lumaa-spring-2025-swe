// filepath: /c:/Users/vishr/OneDrive/Documents/Lumaa/lumaa-spring-2025-swe/frontend/src/TodoListPage.jsx
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './index.css';

const TodoListPage = () => {
    const [todos, setTodos] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskMessage, setNewTaskMessage] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState("");

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
                console.error("Error fetching tasks:", response.statusText);
            }
        };

        fetchTodos();
    }, []);

    const handleAdd = (newTaskMessage, newTaskTitle) => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTaskMessage, title: newTaskTitle })
        })
        .then(response => response.json())
        .then(data => {
            setTodos([...todos, { message: newTaskMessage, title: newTaskTitle }]);
            console.log("Task added:", data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    };

    const handleDelete = (taskToDelete) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${taskToDelete.message}`, {
            method: "DELETE",
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.filter(task => task.message !== taskToDelete.message));
            console.log("Task deleted:", data);
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTaskMessage(task.message);
        setNewTaskTitle(task.title);
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${editingTask.message}`, {
            method: "PUT",
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTaskMessage, title: newTaskTitle })
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(task => task.message === editingTask.message ? { ...task, message: newTaskMessage, title: newTaskTitle } : task));
            setEditingTask(null);
            setNewTaskMessage("");
            setNewTaskTitle("");
            console.log("Task updated:", data);
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
    };

    return (
        <div className="container">
            <div className="overlay"></div>
            <div className="content">
                <h1>Tasks</h1>
                <AddList onAdd={handleAdd} />
                <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
                {editingTask && (
                    <div>
                        <input 
                            type="text" 
                            value={newTaskTitle} 
                            onChange={(e) => setNewTaskTitle(e.target.value)} 
                            placeholder="Edit task title"
                        />
                        <input 
                            type="text" 
                            value={newTaskMessage} 
                            onChange={(e) => setNewTaskMessage(e.target.value)} 
                            placeholder="Edit task message"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdate();
                                }
                            }}
                        />
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddList = ({ onAdd }) => {
    const [newTaskMessage, setNewTaskMessage] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleChangeMessage = (e) => {
        setNewTaskMessage(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleChangeTitle = (e) => {
        setNewTaskTitle(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleAdd = () => {
        if (newTaskMessage.trim() !== "" && newTaskTitle.trim() !== "") {
            onAdd(newTaskMessage, newTaskTitle); // onAdd is a prop passed from the parent component
            setNewTaskMessage("");
            setNewTaskTitle("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={newTaskTitle} 
                onChange={handleChangeTitle} 
                placeholder="Add a new task title"
            />
            <input 
                type="text" 
                value={newTaskMessage} 
                onChange={handleChangeMessage} 
                placeholder="Add a new task message"
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleAdd}>+</button>
        </div>
    );
};

AddList.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const TodoList = ({ todos, onDelete, onEdit }) => {
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
                        <strong>{todo.title}</strong>: {todo.message}
                        <button onClick={() => onEdit(todo)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default TodoListPage;