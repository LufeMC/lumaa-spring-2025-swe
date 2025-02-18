import React from 'react';

interface Task {
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
        event.preventDefault(); // Prevent the default checkbox behavior
        onComplete(task);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            onChange={(event) => handleCheckboxChange(event, todo)} 
                            checked={todo.isComplete}
                        /> 
                        <strong>{todo.title}</strong>: {todo.message} {todo.isComplete ? "(Completed)" : ""}
                        <button onClick={() => onEdit(todo)}>Edit</button>
                        <button onClick={() => onDelete(todo)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
