import React, { useState } from 'react';

const ToggleComplete = ({onRemoveAll, onToggleShow, todos, completedTodo}) => {
    
    const [todoColor, setTodoColor] = useState(true);
    const [completedColor, setCompletedColor] = useState(false);

    const handleTodoClick = () => {
        setTodoColor(true);
        setCompletedColor(false);
        onToggleShow(true);
    }

    const handleCompletedClick = () => {
        setTodoColor(false);
        setCompletedColor(true);
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
            <div className='flex gap-x-0 rounded-full overflow-hidden sm:text-lg'>
                {/* ToDo */}
                <button
                    onClick={handleTodoClick}
                    className={`font-semibold flex gap-x-2 ${todoColor ? 'bg-green-700 text-lime-300' : 'bg-blue-700 text-blue-300'} px-[.7rem] md:px-4 lg:px-5 py-1 transition-all duration-400`}>
                    ToDo

                    <p>{todos.length}</p>
                </button>
                
                {/* Completed */}
                <button
                    onClick={handleCompletedClick}
                    className={`font-semibold flex gap-x-2 ${completedColor ? 'bg-green-700 text-lime-300' : 'bg-blue-700 text-blue-300'} px-[.7rem] md:px-4 lg:px-5 py-1 transition-all duration-400`}>
                    Completed

                    <p>{completedTodo.length}</p>
                </button>
            </div>

            {/* Remove all button */}
            <div>
                <button 
                onClick={todoColor ? handleRemoveAllTodo : handleRemoveAllComplete}
                className={`font-semibold rounded-full bg-violet-600 text-pink-200 px-[.7rem] md:px-4 lg:px-5 py-1 transition-all duration-400 sm:text-lg active:bg-pink-200 active:text-violet-600`}>
                    Remove All
                </button>
            </div>
        </div>
    );
}

export default ToggleComplete;
