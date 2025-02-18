import React, { useState } from 'react';

interface AddListProps {
    onAdd: (task: string) => void;
}

const AddList: React.FC<AddListProps> = ({ onAdd }) => {
    const [newTask, setNewTask] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value); // When the user types in the input field, the state is updated
    };

    const handleAdd = () => {
        if (newTask.trim() !== "") {
            onAdd(newTask); // onAdd is a prop passed from the parent component
            setNewTask("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={newTask} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
                placeholder="Add a new task" 
            />
            <button onClick={handleAdd}>+</button>
        </div>
    );
};

export default AddList;
