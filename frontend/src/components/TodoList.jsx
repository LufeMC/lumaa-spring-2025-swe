import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos = [], onDelete }) => {
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
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func.isRequired
};

export default TodoList;
