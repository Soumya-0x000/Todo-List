import React, { useEffect, useLayoutEffect, useState } from 'react';
import ToggleBtn from './button/ToggleBtn';
import AddRemoveBtn from './button/AddRemoveBtn';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

const NavBar = ({onRemoveAll, onToggleShow, todos, completedTodo}) => {
    const comparableWindowSize = 780
    const [showSearchBar, setShowSearchBar] = useState(window.innerWidth >= comparableWindowSize);
    const [searchSwitchTodo, setSearchSwitchTodo] = useState(true);
    const [todoData, setTodoData] = useState(todos)

    useEffect(() => {
        searchSwitchTodo ? setTodoData(todos) : setTodoData(completedTodo)
    })

    useLayoutEffect(() => {
        const handleResize = () => {
            setShowSearchBar(window.innerWidth >= comparableWindowSize);
        };
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleTodoClick = () => {
        setSearchSwitchTodo(true);
        onToggleShow(true);
    }

    const handleCompletedClick = () => {
        setSearchSwitchTodo(false);
        onToggleShow(false);
    }

    const handleRemoveAll = () => {
        if (typeof onRemoveAll === 'function') {   
            onRemoveAll()
        }
    }

    return (
        <div className='flex items-center justify-between relative '>
            {/* Todo Complete Toggle */}
            <ToggleBtn 
                handleTodoClick={handleTodoClick} 
                handleCompletedClick={handleCompletedClick} 
                todoLength={todos.length} 
                completedLength={completedTodo.length} 
            />

            {showSearchBar && (
                <SearchBar 
                    searchSwitchTodo={searchSwitchTodo}
                    todoData={todoData}
                />
            )}

            {/* Remove all button */}
            <AddRemoveBtn 
                handleAddTodo={handleRemoveAll} 
                text={'Remove All'} 
                icon={faMinus} 
            />
        </div>
    );
}

export default NavBar;
