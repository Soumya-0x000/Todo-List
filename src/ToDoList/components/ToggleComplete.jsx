import React, { useState } from 'react';
import ToggleBtn from './ToggleBtn';
import AddRemoveBtn from './AddRemoveBtn';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const ToggleComplete = ({onRemoveAll, onToggleShow, todos, completedTodo}) => {
    
    const [todoColor, setTodoColor] = useState(true);

    const handleTodoClick = () => {
        setTodoColor(true);
        onToggleShow(true);
    }

    const handleCompletedClick = () => {
        setTodoColor(false);
        onToggleShow(false);
    }

    const handleRemoveAllTodo = () => {
        if (typeof onRemoveAll === 'function') {   
            onRemoveAll()
        }
    }

    const handleRemoveAllComplete = () => {
        if (typeof onRemoveAll === 'function') {   
            onRemoveAll()
        }
    }

    return (
        <div className='flex items-center justify-between'>
            {/* Todo Complete Toggle */}
            <ToggleBtn 
                handleTodoClick={handleTodoClick} 
                handleCompletedClick={handleCompletedClick} 
                todoLength={todos.length} 
                completedLength={completedTodo.length} 
            />
            {/* Remove all button */}
            <AddRemoveBtn handleAddTodo={todoColor ? handleRemoveAllTodo : handleRemoveAllComplete} text={'Remove All'} icon={faMinus} />
        </div>
    );
}

export default ToggleComplete;
