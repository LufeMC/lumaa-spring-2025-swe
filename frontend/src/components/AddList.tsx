import React, { useState } from "react";

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

export default AddList;
