import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
}

AddList.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddList;
