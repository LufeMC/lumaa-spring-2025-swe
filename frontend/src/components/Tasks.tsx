import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axiosInstance from '../utils/axiosInstance';
import './styles.css';

interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState<number | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/tasks');
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload(); 
    };

    const handleCreateTask = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (task: Task) => {
        try {
            const response = await axiosInstance.put(`/tasks/${task.id}`, task);
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            const response = await axiosInstance.put(`/tasks/${task.id}`, { ...task, isComplete: !task.isComplete });
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(t => t.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTask({ ...newTask, [name]: value });
    };

    return (
        <div>
            <div className='header'>
                <div></div>
                <h2>Tasks</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Task</button>
            </form>
            <ul className="task-list">
                <div className="task">
                    <h3>isComplete</h3>
                    <h3>Title</h3>
                    <h3>Description</h3>
                    <h3>Actions</h3>
                </div>
                {tasks.map((task) => (
                    <li key={task.id} className="task">
                        {editingTask === task.id ? (
                            <>
                                <input
                                    type="checkbox"
                                    checked={task.isComplete}
                                    onChange={() => handleToggleComplete(task)}
                                />
                                <input
                                    type="text"
                                    value={task.title}
                                    onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, title: e.target.value } : t))}
                                />
                                <input
                                    type="text"
                                    value={task.description}
                                    onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, description: e.target.value } : t))}
                                />
                                <button onClick={() => handleUpdateTask(task)}>Save</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={task.isComplete}
                                    onChange={() => handleToggleComplete(task)}
                                />
                                <span className='title'>{task.title}</span>
                                <span className='description'>{task.description}</span>
                                <div>
                                    <button onClick={() => setEditingTask(task.id)}>Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
