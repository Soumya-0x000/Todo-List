import React, { useLayoutEffect, useState } from 'react';
import ToggleBtn from './button/ToggleBtn';
import AddRemoveBtn from './button/AddRemoveBtn';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { removeAllTodoDataInUI } from '../../redux/slices/todoSlice';
import { removeAllCompletedTodoDataInUI } from '../../redux/slices/completedTodoSlice';

const NavBar = () => {
    const status = useSelector((state) => state.status)
    const dispatch = useDispatch()

    const comparableWindowSize = 800
    const [showSearchBar, setShowSearchBar] = useState(window.innerWidth >= comparableWindowSize);

    useLayoutEffect(() => {
        const handleResize = () => {
            setShowSearchBar(window.innerWidth >= comparableWindowSize);
        };
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleRemoveAll = async() => {
        try {
            if (status) {
                await api.get('/remaining')
                    .then((res) => res.data.map(
                        item => api.delete(`/remaining/${item.id}`)
                    )) 
                    .catch((err) => console.error(err))
                dispatch(removeAllTodoDataInUI())
            } else {
                await api.get('/completed')
                    .then((res) => res.data.map(
                        item => api.delete(`/completed/${item.id}`)
                    )) 
                    .catch((err) => console.error(err))
                dispatch(removeAllCompletedTodoDataInUI())
            }
        } catch (error) {
            console.error('Error removing items:', error);
        }
    }

    return (
        <div className='flex items-center justify-between relative '>
            {/* Todo Complete Toggle */}
            <ToggleBtn />

            {showSearchBar && (
                <SearchBar/>
            )}

            {/* Remove all button */}
            <AddRemoveBtn 
                handleAddRemoveTodo={handleRemoveAll} 
                text={'Remove All'} 
                icon={faMinus} 
            />
        </div>
    );
}

export default NavBar;
