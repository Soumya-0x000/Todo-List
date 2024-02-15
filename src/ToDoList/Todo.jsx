import React, { useState, useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion';
import NavBar from './components/NavBar'
import TodoContent from './components/TodoContent';
import CompletedTodo from './components/CompletedTodo';
import AddRemoveBtn from './components/button/AddRemoveBtn';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';
import SortSection from './components/SortSection';
import doSomething from '../asset/giphy.gif'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [showToggle, setShowToggle] = useState(false);
    const [showTodo, setShowTodo] = useState(true);
    const [isSmScreen, setIsSmScreen] = useState(window.innerWidth >= 1024);
    const comparableWidth = 380
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= comparableWidth)
    const [sortingData, setSortingData] = useState(todos)

    const randomId = () => {
        const arr = new Uint32Array(1)
        crypto.getRandomValues(arr)
        return '_' + arr[0]
    }
    
    useLayoutEffect(() => {
        const handleResize = () => {
            setIsSmScreen(window.innerWidth >= 1024)
        };
        handleResize()

        const handleSortVisibility = () => {
            setIsSmallScreen(window.innerWidth >= comparableWidth)
        }
        handleSortVisibility()

        window.addEventListener("resize", handleResize)
        window.addEventListener("resize", handleSortVisibility)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("resize", handleSortVisibility)
        }
    },[])

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/remaining')
                const data = response.data
                if(response.status === 200) {
                    setTodos(data.map(contact => ({
                        id: contact.id,
                        title: contact.title,
                        description: contact.description,
                        dateTime: contact.dateTime,
                    })))
                } else throw new Error
            } catch (error) {
                console.error(error)
            }
        })()
        .then(async () => {
            try {
                const completedResponse = await api.get("/completed")
                const completedData = completedResponse.data;
                if (completedResponse.status === 200) {
                    setCompletedTodo(completedData.map(contact => ({
                        id: contact.id,
                        title: contact.title,
                        description: contact.description,
                        dateTime: contact.dateTime,
                    })))
                } else throw new Error
            } catch (error) {
                console.error(error)
            }
        })
    }, []);
    
    useEffect(() => {
        todos.length > 0 || completedTodo.length > 0 
            ? setShowToggle(true) 
            : setShowToggle(false)
    }, [todos, completedTodo]);
    
    const handleAddTodo = async (e) => {
        e.preventDefault();
        const id = randomId()
        const currentDateTime = new Date()
        if(todoTitle) {
            setTodos([ 
                {
                    id,
                    title: todoTitle, 
                    description: todoDescription,
                    dateTime: currentDateTime,
                }, ...todos
            ]);
            await api.post('/remaining', {
                id,
                title: todoTitle,
                description: todoDescription,
                dateTime: currentDateTime,
            })
            setTodoTitle('');
            setTodoDescription(''); 
            setShowToggle(true);
        }
    }

    const handleKeyStroke = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo(e)
        }
    }

    const handleRemoveAll = async () => {
        try {
            if (showTodo) {
                setTodos([]);
                await api.get('/remaining')
                    .then((res) => res.data.map(
                        item => api.delete(`/remaining/${item.id}`)
                    )) 
                    .catch((err) => console.error(err))
            } else {
                setCompletedTodo([]);
                await api.get('/completed')
                    .then((res) => res.data.map(
                        item => api.delete(`/completed/${item.id}`)
                    )) 
                    .catch((err) => console.error(err))
            }
        } catch (error) {
            console.error('Error removing items:', error);
        }
    };

    const handleEditTodo = (editedTodos) => {
        setTodos(editedTodos)
    }

    const handleDeleteTodo = async (id, todos) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(id, 1);
        
        if (showTodo) {
            await api.delete(`/remaining/${id}`)
            setTodos(updatedTodos);
        } else {
            await api.delete(`/completed/${id}`)
            setCompletedTodo(updatedTodos);
        }
    }
    
    const handleCompleteTodo = async (id) => {
        try {
            const response = await api.get(`/remaining/${id}`)
            let data = response.data;
            
            await api.post(`/completed`, {
                id: data.id,
                title: data.title,
                description: data.description,
                dateTime: data.dateTime,
            })

            await api.delete(`/remaining/${id}`)

            setCompletedTodo(prevCompletedTodo => [ data, ...prevCompletedTodo ])
            setTodos(prevTodos => (
                prevTodos.filter(todo => todo.id !== id)
            ))
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleToggleShow = (e) => {
        setShowTodo(e)
    }

    const handleUndoTodo = async (id, tasks) => {
        try {
            const response = await api.get(`/completed/${id}`)
            const undoTask = response.data
            await api.post(`/remaining`, {
                id: undoTask.id, 
                title: undoTask.title,  
                description: undoTask.description,
                dateTime: undoTask.dateTime,
            })
            await api.delete(`/completed/${id}`)

            setTodos(prevTodos => [undoTask, ...prevTodos])
            setCompletedTodo(prevCompletedTodos => (
                prevCompletedTodos.filter(todo => todo.id !== id)
            ))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchSortingData = async () => {
            if (showTodo) {
                setSortingData(todos)
            } else {
                setSortingData(completedTodo)
            }
        }
        fetchSortingData()
    }, [showTodo, todos, completedTodo])

    const handleSortedData = (data) => {
        showTodo ? setTodos(data) : setCompletedTodo(data)
    }

    return (
        <div className='bg-slate-800 h-screen'>
            <div className='w-screen h-full bg-slate-800 flex flex-col items-center justify-start sm:pt-5 xl:pt-10'>
                <motion.div 
                initial={{scale: 1, y: -300}}
                animate={{scale: 1, y: 0}}
                transition={{delay: .2, duration: 1}}
                className='w-full h-full sm:px-6 xl:px-36 2xl:px-48 '>
                    <div className='bg-slate-700 px-2.5 md:px-4 py-4 min-h-[70%] max-h-full overflow-auto relative'>
                        {/* Input section */}
                        <div className='border-b border-b-violet-400 pb-5'>
                            <form className='flex sm:flex-col md:flex-row items-end sm:items-start md:items-end justify-between lg:items-end gap-x-1 gap-y-2 md:gap-x-10'>
                                {/* Data input */}
                                <div className='w-full flex flex-col gap-y-4 sm:gap-y-5 sm:flex-row gap-x-5'>    
                                    {/* Title */}
                                    <div className='flex w-full flex-col gap-y-1 sm:gap-y-2'>
                                        {isSmScreen && (
                                            <label className='text-violet-300 font-semibold tracking-wider font-oxanium text-lg sm:text-[1.2rem]'>Title</label>
                                        )}
                                        
                                        <input 
                                            type="text" 
                                            placeholder='Task Title' 
                                            value={todoTitle}
                                            onChange={(e) => setTodoTitle(e.target.value)}
                                            onKeyDown={(e) => handleKeyStroke(e)}
                                            className='bg-gradient-to-tl from-violet-950 to-indigo-950 w-full rounded-md py-1.5 sm:py-3 pl-3 sm:pl-6 pr-2 sm:pr-4 focus:outline-none placeholder:text-violet-300 text-blue-300 text-[1rem] sm:text-lg focus:border-[.1rem] focus:border-fuchsia-300 tracking-wide font-onest'
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className='flex flex-col w-full gap-y-1 sm:gap-y-2'>
                                        {isSmScreen && (
                                            <label className='text-violet-300 font-semibold tracking-wider font-oxanium text-lg sm:text-[1.2rem]'>Description</label>
                                        )}
                                        
                                        <input 
                                            type="text" 
                                            placeholder='Task description' 
                                            value={todoDescription}
                                            onChange={(e) => setTodoDescription(e.target.value)}
                                            onKeyDown={(e) => handleKeyStroke(e)}
                                            className='bg-gradient-to-tl from-violet-950 to-indigo-950 w-full rounded-md py-1.5 sm:py-3 pl-3 sm:pl-6 pr-2 sm:pr-4 focus:outline-none placeholder:text-violet-300 text-blue-300 text-[1rem] sm:text-lg focus:border-[.1rem] focus:border-fuchsia-300 tracking-wide font-onest'
                                        />
                                    </div>
                                </div>

                                {/* Add button */}
                                <div className='w-ful flex justify-center'>
                                    <AddRemoveBtn 
                                        handleAddTodo={handleAddTodo} 
                                        text={'ADD'} 
                                        icon={faPlus}
                                    />
                                </div>
                            </form>
                        </div>
                        
                        {(todos.length == 0 && completedTodo.length == 0) && (
                            <div className='w-full flex flex-col items-center justify-center gap-y-20 bg-gray-40 rounded-md mt-4'>
                                <img src={doSomething}  className=' h-full animate-pulse'/>
                                <div>
                                    <p className=' text-center font-mooli text-[1.4rem] md:text-4xl pt-6 pb-3 font-bold bg-gradient-to-br from-rose-400 via-blue-500 to-emerald-300 bg-clip-text text-transparent'>
                                        Thode Todos add karlo bhai.........
                                    </p>
                                    <p className='text-2xl md:text-3xl text-center'>
                                        🥸🥸🥸🫡🫡🫡
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* controller area */}
                        <div className={`py-3 ${showToggle ? 'block' : 'hidden'}  `}>
                            <NavBar 
                                onRemoveAll={handleRemoveAll} 
                                onToggleShow={handleToggleShow} 
                                todos={todos} 
                                completedTodo={completedTodo} 
                            />
                        </div>

                        {showTodo ? (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[44rem] overflow-y-auto`}>
                                <TodoContent 
                                    todos={todos} 
                                    onEditTodo={handleEditTodo} 
                                    onDeleteTodo={handleDeleteTodo} 
                                    onCompleteTodo={handleCompleteTodo}
                                />
                            </div>
                        ) : (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[45rem] overflow-y-auto `}>
                                <CompletedTodo 
                                    completedTasks={completedTodo} 
                                    removeTask={handleDeleteTodo} 
                                    undoTask={handleUndoTodo}
                                />
                            </div>
                        )}

                        {isSmallScreen && sortingData.length > 0 && (
                            <div className='absolute bottom-0 right-1/2 transform translate-x-1/2 '>
                                <SortSection
                                    sortingData={sortingData}
                                    handleSortedData={handleSortedData}
                                    showTodo={showTodo}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Todo
