import React from "react";

interface Task {
    id: number;
    message: string;
    title: string;
    isComplete: boolean;
}

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

export default TodoList;
