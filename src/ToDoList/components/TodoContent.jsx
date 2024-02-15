import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import api from '../../api/api';
import Popup from './Popup';

const TodoContent = ({ todos, onEditTodo, onDeleteTodo, onCompleteTodo }) => {
    const iconData = [
        { icon: faPenToSquare, bgColor: 'text-green-300 ',  onHover: 'hover:text-green-600 ' },
        { icon: faTrashCan, bgColor: 'text-red-400',  onHover: 'hover:text-red-500' },
        { icon: faCheck, bgColor: 'text-yellow-200',  onHover: 'hover:text-yellow-600' },
    ];

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [popupVisibility, setPopupVisibility] = useState(Array(todos.length).fill(false));

    const editTodo = (id, index) => {
        setEditId(id);
        setEditTitle(todos[index].title);
        setEditDescription(todos[index].description);
    };

    const handleSave = async (id, index) => {
        try {
            await api.put(`/remaining/${id}`, {
                id,
                title: editTitle,
                description: editDescription,
                dateTime: (todos.filter(a => a.id ===id )).map(a => a.dateTime),
            })

            onEditTodo(prevTodos => (
                prevTodos.map(todo => (
                    todo.id === id
                        ? { ...todo, title: editTitle, description: editDescription }
                        : todo
                ))
            ))
            setEditId(null);
        } catch (error) {
            console.error(error)
        }
    };

    const deleteTodo = (id, todos) => {
        onDeleteTodo(id, todos)
    }

    const completedTodo = async (id) => {
        onCompleteTodo(id)
    }

    const handleIconClick = (id, index, icon) => {
        if (icon === faPenToSquare) {
            editTodo(id, index);
        } else if (icon === faTrashCan) {
            deleteTodo(id, todos);
        } else if (icon === faCheck) {
            completedTodo(id);
        }
    };

    const handleTogglePopupVisibility = (index) => {
        const updatedPopupVisibility = [...popupVisibility]
        updatedPopupVisibility[index] = !updatedPopupVisibility[index];
        setPopupVisibility([...updatedPopupVisibility])
    }

    useEffect(() => {
        setPopupVisibility(Array(todos.length).fill(false))
    }, [todos])

    return (
        <div className='space-y-2 md:space-y-3 py-1 rounded-lg overflow-hidden '>
            {todos.map((todo, index) => (
                <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                key={todo.id}
                className='min-h-[5rem] rounded-lg hover:ring-[1px] hover:ring-cyan-400 bg-slate-950 flex justify-between items-center relative overflow-hidden'>
                    {/* data part */}
                    <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, damping: 1 }}
                    className='w-[88%] lg:w-[91%] h-auto space-y-1.5 sm:space-y-3 text-white'>
                        {editId === todo.id ? (
                            <div className='flex flex-col gap-y-1.5 w-full pl-3 lg:pl-4 py-2 '>
                                <input
                                type='text'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className='text-[1.2rem] sm:text-[1.6rem] lg:text-[24px] text-orange-400 tracking-wide bg-slate-800 focus:outline-none focus:border-none rounded-md pl-2 py-1 md:mr-3 lg:mr-6'
                                placeholder='Edit title...'/>

                                <input
                                type='text'
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className='text-[17px] bg-slate-800 text-amber-200 focus:outline-none focus:border-none rounded-md pl-2 py-1 md:mr-3 lg:mr-6'
                                placeholder='Edit description...'/>
                            </div>
                        ) : (
                            <div 
                            className='space-y-2 overflow-x-auto pl-3 lg:pl-4 py-2 scrollbar-thin scrollbar-thumb-lime-300 cursor-pointer'
                            onClick={() => handleTogglePopupVisibility(index)}>
                                <p className='text-[1rem] sm:text-[1.6rem] lg:text-3xl bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text font-onest text-transparent font-bold tracking-wide'>{todo.title}</p>
                                <p className='text-[.9rem] lg:text-xl pb-1 bg-gradient-to-br from-violet-400 to-cyan-300 bg-clip-text text-transparent font-lato '>{todo.description}</p>
                            </div>
                        )}
                    </motion.div>

                    {/* icon part */}
                    <div className={` w-[8%] absolute h-full top-0 right-2 lg:right-0 bg-transparent flex items-center justify-center flex-col md:flex-row gap-y-2 gap-x-3 sm:text-lg md:text-[19px]`}>
                        {editId === todo.id ? (
                            <div className='flex flex-col gap-y-2 md:text-lg xl:text-xl'>
                                <button
                                onClick={() => handleSave(todo.id, index)}
                                className='p-1.5 text-[15px] sm:text-[20px] rounded-lg bg-blue-900 text-blue-300 hover:scale-110 font-semibold transition-all'>
                                    <FontAwesomeIcon icon={faFloppyDisk} />
                                </button>

                                <button
                                onClick={() => setEditId(null)}
                                className='px-2 py-1 text-[15px] sm:text-[20px] rounded-lg bg-blue-900 text-blue-300 hover:scale-110 font-semibold transition-all'>
                                    <FontAwesomeIcon icon={faBan} />
                                </button>
                            </div>
                        ) : (
                            iconData.map((data, count) => (
                                <FontAwesomeIcon
                                key={count}
                                icon={data.icon}
                                className={`
                                    ${data.bgColor} ${data.onHover} transition-all active:scale-110 cursor-pointer z-30
                                `}
                                onClick={() => handleIconClick(todo.id, index, data.icon)}/>
                            ))
                        )}
                    </div>

                    {/* pop up date time */}
                    <Popup 
                        popupVisibility={popupVisibility}
                        index={index}
                        todo={todo}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default TodoContent;
