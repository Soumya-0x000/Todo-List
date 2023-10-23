import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const TodoContent = ({ todos, onEditTodo, onDeleteTodo, onCompleteTodo }) => {
    const iconData = [
        { icon: faPenToSquare, onHover: 'blue' },
        { icon: faTrashCan, onHover: 'red' },
        { icon: faCheck, onHover: 'yellow' },
    ];

    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const editTodo = (index) => {
        setEditIndex(index);
        setEditTitle(todos[index].title);
        setEditDescription(todos[index].description);
    };

    const handleSave = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].title = editTitle;
        updatedTodos[index].description = editDescription;
        onEditTodo(updatedTodos);
        setEditIndex(null);
    };

    const deleteTodo = (index, todos) => {
        onDeleteTodo(index, todos)
    }

    const completedTodo = (index) => {
        onCompleteTodo(index)
    }

    const handleIconClick = (index, icon) => {
        if (icon === faPenToSquare) {
            editTodo(index);
        } else if (icon === faTrashCan) {
            deleteTodo(index, todos);
        } else if (icon === faCheck) {
            completedTodo(index);
        }
    };

    return (
        <div className='space-y-3'>
            {todos.map((todo, index) => (
                <motion.div
                    initial={{ y: -200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className=' hover:shadow-md hover:shadow-green-300 bg-neutral-800 flex justify-between items-center px-3 lg:px-4 py-2 lg:py-3 gap-x-3'>
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, damping: 1 }}
                        className='w-full h-auto space-y-1.5 sm:space-y-3 text-white'>
                        {editIndex === index ? (
                            <div className='flex flex-col gap-y-1.5'>
                                <input
                                type='text'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className='text-[1.2rem] sm:text-[1.6rem] lg:text-3xl text-green-400 font-bold tracking-wide bg-neutral-700 focus:outline-none focus:border-none rounded-md pl-1 py-1 md:mr-3 lg:mr-6'
                                placeholder='Edit title...'/>

                                <input
                                type='text'
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className='text-[1rem] lg:text-xl bg-neutral-700 focus:outline-none focus:border-none rounded-md pl-1 py-1 md:mr-3 lg:mr-6'
                                placeholder='Edit description...'/>
                            </div>
                        ) : (
                            <div className='space-y-2 max-w-[17.5rem] sm:max-w-[20rem] md:max-w-[26.9rem] lg:max-w-[43rem] xl:max-w-[57rem] overflow-x-auto scrollbar-thin scrollbar-thumb-lime-300'>
                                <p className='text-[1.2rem] sm:text-[1.6rem] lg:text-3xl text-green-400 font-bold tracking-wide'>{todo.title}</p>
                                <p className='text-[1rem] lg:text-xl pb-2'>{todo.description}</p>
                            </div>
                        )}
                    </motion.div>

                    <div className='flex flex-col md:flex-row gap-y-2 gap-x-3 lg:gap-x-5 sm:text-lg md:text-2xl lg:text-[1.7rem]'>
                        {editIndex === index ? (
                            <div className='flex flex-col gap-y-2 md:text-lg xl:text-xl'>
                                <button
                                onClick={() => handleSave(index)}
                                className='px-2 py-1 rounded-lg bg-indigo-700 text-green-300 active:bg-green-300 active:text-indigo-700 font-semibold transition-all'>
                                    Save
                                </button>

                                <button
                                onClick={() => setEditIndex(null)}
                                className='px-2 py-1 rounded-lg bg-indigo-700 text-green-300 active:bg-green-300 active:text-indigo-700 font-semibold transition-all'>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            iconData.map((data, id) => (
                                <FontAwesomeIcon
                                key={id}
                                icon={data.icon}
                                className={`text-green-300 ${id === 0 ? 'hover:text-blue-400' : id === 1 ? 'hover:text-red-400' : 'hover:text-yellow-400'} transition-all active:scale-110 cursor-pointer`}
                                onClick={() => handleIconClick(index, data.icon)}/>
                            ))
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TodoContent;
