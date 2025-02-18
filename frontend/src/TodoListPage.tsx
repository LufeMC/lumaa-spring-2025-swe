import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Task {
    id: number;
    message: string;
    title: string;
    isComplete: boolean;
}

const TodoListPage: React.FC = () => {
    const [todos, setTodos] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [newTaskMessage, setNewTaskMessage] = useState<string>("");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchTodos = async () => {
            const response = await fetch("http://localhost:3000/todos", {
                headers: {
                    'Authorization': `Bearer ${token}`,
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
    }, [navigate]);

    const handleAdd = (newTaskMessage: string, newTaskTitle: string) => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTaskMessage, title: newTaskTitle })
        })
        .then(response => response.json())
        .then(data => {
            setTodos([...todos, { id: data.id, message: newTaskMessage, title: newTaskTitle, isComplete: false }]);
            console.log("Task added:", data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    };

    const handleDelete = (taskToDelete: Task) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${taskToDelete.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.filter(task => task.id !== taskToDelete.id));
            console.log("Task deleted:", data);
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setNewTaskMessage(task.message);
        setNewTaskTitle(task.title);
    };

    const handleUpdate = () => {
        if (!editingTask) return;

        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${editingTask.id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTaskMessage, title: newTaskTitle, isComplete: editingTask.isComplete })
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(task => task.id === editingTask.id ? { ...task, message: newTaskMessage, title: newTaskTitle } : task));
            setEditingTask(null);
            setNewTaskMessage("");
            setNewTaskTitle("");
            console.log("Task updated:", data);
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
    };

    const handleComplete = (taskToComplete: Task) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/todos/${taskToComplete.id}/complete`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isComplete: !taskToComplete.isComplete })
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(task => task.id === taskToComplete.id ? { ...task, isComplete: !task.isComplete } : task));
            console.log("Task completion status updated:", data);
        })
        .catch(error => {
            console.error("Error updating task completion status:", error);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="overlay"></div>
            <div className="content bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Tasks</h1>
                <AddList onAdd={handleAdd} />
                <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} onComplete={handleComplete} />
                {editingTask && (
                    <div className="mt-4">
                        <input 
                            type="text" 
                            value={newTaskTitle} 
                            onChange={(e) => setNewTaskTitle(e.target.value)} 
                            placeholder="Edit task title"
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input 
                            type="text" 
                            value={newTaskMessage} 
                            onChange={(e) => setNewTaskMessage(e.target.value)} 
                            placeholder="Edit task message (optional)"
                            className="border p-2 rounded mb-2 w-full"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdate();
                                }
                            }}
                        />
                        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                    </div>
                )}
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Logout</button>
            </div>
        </div>
    );
};

interface AddListProps {
    onAdd: (message: string, title: string) => void;
}

const AddList: React.FC<AddListProps> = ({ onAdd }) => {
    const [newTaskMessage, setNewTaskMessage] = useState<string>("");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskMessage(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleAdd = () => {
        if (newTaskTitle.trim() !== "") {
            onAdd(newTaskMessage, newTaskTitle); // onAdd is a prop passed from the parent component
            setNewTaskMessage("");
            setNewTaskTitle("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="mb-4">
            <input 
                type="text" 
                value={newTaskTitle} 
                onChange={handleChangeTitle} 
                placeholder="Add a new task title"
                className="border p-2 rounded mb-2 w-full"
            />
            <input 
                type="text" 
                value={newTaskMessage} 
                onChange={handleChangeMessage} 
                placeholder="Add task description (optional)"
                className="border p-2 rounded mb-2 w-full"
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">+</button>
        </div>
    );
};

interface TodoListProps {
    todos: Task[];
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
    onComplete: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit, onComplete }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, task: Task) => {
        onComplete(task);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {todos.map((todo, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border-b" style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                onChange={(event) => handleCheckboxChange(event, todo)} 
                                checked={todo.isComplete}
                                className="mr-2"
                            /> 
                            <strong>{todo.title}</strong>: {todo.message} {todo.isComplete ? "(Completed)" : ""}
                        </div>
                        <div>
                            <button onClick={() => onEdit(todo)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button onClick={() => onDelete(todo)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoListPage;