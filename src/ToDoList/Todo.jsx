import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import ToggleComplete from './components/ToggleComplete'
import TodoContent from './components/TodoContent';
import CompletedTodo from './components/CompletedTodo';

const Todo = () => {

    const [todos, setTodos] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        return savedTodos || [];
    });
    const [completedTodo, setCompletedTodo] = useState(() => {
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
        return savedCompletedTodo || [];
    });

    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [showToggle, setShowToggle] = useState(false);
    const [showTodo, setShowTodo] = useState(true);
    
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
            if (savedTodos.length >= 1) {
                setShowToggle(true);
            }
        }
        
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
        if (savedCompletedTodo) {
            setCompletedTodo(savedCompletedTodo);
            if (savedCompletedTodo.length >= 1) {
                setShowToggle(true);
            }
        }
    }, []);
    
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('completedTodo', JSON.stringify(completedTodo));
    }, [todos]);
    
    const handleAddTodo = (e) => {
        e.preventDefault();
        if(todoTitle && todoDescription) {
            setTodos([ {title: todoTitle, description: todoDescription}, ...todos]);
            setTodoTitle('');
            setTodoDescription(''); 
            setShowToggle(true);
        }
    }

    const handleRemoveAll = () => {
        if (showTodo) {
            setTodos([]);
        } else {
            setCompletedTodo([]);
            localStorage.removeItem('completedTodo');
        }
    }

    const handleEditTodo = (editedTodos) => {
        setTodos(editedTodos)
    }

    const handleDeleteTodo = (index, todos) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        if (showTodo) {
            setTodos(updatedTodos);
        } else {
            setCompletedTodo(updatedTodos);
            localStorage.setItem('completedTodo', JSON.stringify(updatedTodos))
        }
    }
    
    const handleCompleteTodo = (index) => {
        completedTodo.unshift(todos[index])
        setCompletedTodo(completedTodo);
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos)
    }
    
    const handleToggleShow = (e) => {
        setShowTodo(e)
    }

    const handleUndoTodo = (index, tasks) => {
        const updatedCompletedTasks = [...tasks];
        updatedCompletedTasks.splice(index, 1);
        setCompletedTodo(updatedCompletedTasks);

        const updatedTodos = [...todos];
        updatedTodos.push(tasks[index])
        setTodos(updatedTodos)
    }

    return (
        <div className='bg-slate-800 h-full'>
            <div className='w-screen h-screen bg-slate-800 flex flex-col items-center justify-start pt-6 lg:pt-14 gap-y-4 lg:gap-y-10'>

                <motion.div 
                initial={{scale: 0, y: -300}}
                animate={{scale: 1, y: 0}}
                className=' bg-gradient-to-br from-violet-400 to-pink-300 bg-clip-text text-transparent text-4xl md:text-6xl font-bold font-montserrat'>
                    My ToDos
                </motion.div>
                
                <motion.div 
                initial={{scale: 0, y: -300}}
                animate={{scale: 1, y: 0}}
                transition={{delay: .2, damping: 10}}
                className='overflow-y-auto'>
                    <div className='bg-slate-700 px-2.5 md:px-4 py-4'>
                        
                        {/* Input section */}
                        <div className='border-b border-b-violet-400 pb-5'>
                            <form className='flex items-end justify-between lg:items-end gap-x-4 md:gap-x-10'>
                                
                                {/* Data input */}
                                <div className='flex flex-col gap-y-4 sm:gap-y-5 lg:flex-row gap-x-5 '>   
                                    
                                    {/* Title */}
                                    <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                        <label className='text-violet-300 font-semibold tracking-wider font-lato text-lg sm:text-[1.2rem]'>Title</label>
                                        
                                        <input 
                                        type="text" 
                                        placeholder='Task Title' 
                                        value={todoTitle}
                                        onChange={(e) => setTodoTitle(e.target.value)}
                                        className='bg-neutral-900 w-[17rem] sm:w-[19rem] md:w-[28rem] lg:w-[22rem] xl:w-[29rem] rounded-md py-1.5 sm:py-3 pl-3 sm:pl-6 pr-2 sm:pr-4 focus:outline-none text-gray-300 text-[1rem] sm:text-lg focus:border-[.1rem] focus:border-fuchsia-300 tracking-wide font-onest'/>
                                    </div>

                                    {/* Description */}
                                    <div className='flex flex-col gap-y-1 sm:gap-y-2'>
                                        <label className='text-violet-300 font-semibold tracking-wider font-lato text-lg sm:text-[1.2rem]'>Description</label>
                                        
                                        <input 
                                        type="text" 
                                        placeholder='Task description' 
                                        value={todoDescription}
                                        onChange={(e) => setTodoDescription(e.target.value)}
                                        className='bg-neutral-900 w-[17rem] sm:w-[19rem] md:w-[28rem] lg:w-[22rem] xl:w-[29rem] rounded-md py-1.5 sm:py-3 pl-3 sm:pl-6 pr-2 sm:pr-4 focus:outline-none  text-gray-300 text-[1rem] sm:text-lg focus:border-[.1rem] focus:border-fuchsia-300 tracking-wide'/>
                                    </div>

                                </div>

                                {/* Add button */}
                                <div className='rounded-md overflow-hidden '>
                                    <input 
                                    type="submit" 
                                    value="Add" 
                                    onClick={handleAddTodo}
                                    className='cursor-pointer py-1 sm:py-2.5 px-3 md:px-5 lg:px-7 bg-green-300 active:bg-green-800 active:text-green-300 text-green-800 transition-all font-semibold sm:text-xl font-mooli'/>
                                </div>
                                
                            </form>
                        </div>

                        <div className={`py-4 ${showToggle ? 'block' : 'hidden'}`}>
                            <ToggleComplete onRemoveAll={handleRemoveAll} onToggleShow={handleToggleShow} todos={todos} completedTodo={completedTodo} />
                        </div>

                        {showTodo ? (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[27.3rem] overflow-y-auto scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-500 scrollbar-thumb-rounded scrollbar-track-rounded`}>
                                <TodoContent todos={todos} onEditTodo={handleEditTodo} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo}/>
                            </div>
                            ) : (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[27.3rem] overflow-y-auto scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-500 scrollbar-thumb-rounded scrollbar-track-rounded`}>
                                <CompletedTodo completedTasks={completedTodo} removeTask={handleDeleteTodo} undoTask={handleUndoTodo}/>
                            </div>
                        )}

                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Todo      