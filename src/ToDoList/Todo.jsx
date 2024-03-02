import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import NavBar from './components/NavBar'
import TodoContent from './components/TodoContent';
import CompletedTodo from './components/CompletedTodo';
import AddRemoveBtn from './components/button/AddRemoveBtn';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SortSection from './components/SortSection';
import doSomething from '../asset/giphy.gif'
import { addTodoData, fetchTodoData } from '../redux/slices/todoSlice';
import { fetchCompletedTodoData } from '../redux/slices/completedTodoSlice';

const Todo = () => {
    const todoData = useSelector((state) => state.todoData)
    const completedTodoData = useSelector((state) => state.completedTodoData)
    const dispatch = useDispatch()
    const status = useSelector((state) => state.status)

    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const descriptionInputRef = useRef(null)
    const titleInputRef = useRef(null)

    const [showToggle, setShowToggle] = useState(false);
    const [showLoadingImg, setShowLoadingImg] = useState(true)

    const [isSmScreen, setIsSmScreen] = useState(window.innerWidth >= 1024);
    const comparableWidth = 380
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= comparableWidth)
    
    const randomId = () => {
        const arr = new Uint32Array(1)
        crypto.getRandomValues(arr)
        return '_' + arr[0]
    }
    
    useEffect(() => {
        dispatch(fetchTodoData());
        dispatch(fetchCompletedTodoData());
    }, [dispatch]);

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
        todoData.todo.length > 0 || completedTodoData.completedTodo.length > 0 
            ? setShowToggle(true) 
            : setShowToggle(false)
    }, [todoData.todo, completedTodoData.completedTodo])

    useEffect(() => {
        todoData.todo.length == 0 && completedTodoData.completedTodo.length == 0
            ? setShowLoadingImg(true)
            : setShowLoadingImg(false)
    }, [todoData.todo, completedTodoData.completedTodo])
    
    const handleAddTodo = async (e) => {
        e.preventDefault();
        const id = randomId()
        const currentDateTime = new Date().toISOString()
        if(todoTitle) {
            dispatch(addTodoData({
                id,
                title: todoTitle,
                description: todoDescription,
                dateTime: currentDateTime
            }))
            setTodoTitle('');
            setTodoDescription(''); 
            setShowToggle(true);
        }
    }

    const handleKeyStroke = (e) => {
        const { key, ctrlKey } = e

        if (key === 'Enter') {
            handleAddTodo(e)
        } else if (key === 'ArrowRight' && !ctrlKey) {
            e.preventDefault()
            descriptionInputRef.current.focus()
        } else if (key === 'ArrowLeft' && !ctrlKey) {
            e.preventDefault()
            titleInputRef.current.focus()
        } else if (key === 'ArrowLeft' && ctrlKey){
            e.preventDefault()
            const input = e.target
            input.selectionStart = 0
            input.selectionEnd = 0
        } else if (key === 'ArrowRight' && ctrlKey){
            e.preventDefault()
            const input = e.target
            input.selectionStart = input.value.length
            input.selectionEnd = input.value.length
        }
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
                                            ref={titleInputRef}
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
                                            ref={descriptionInputRef}
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
                                        handleAddRemoveTodo={handleAddTodo} 
                                        text={'ADD'} 
                                        icon={faPlus}
                                    />
                                </div>
                            </form>
                        </div>
                        
                        {showLoadingImg && (
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
                            <NavBar />
                        </div>

                        {status ? (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[44rem] overflow-y-auto`}>
                                <TodoContent />
                            </div>
                        ) : (
                            <div className={`max-h-[28rem] sm:max-h-[26.7rem] md:max-h-[45rem] overflow-y-auto `}>
                                <CompletedTodo />
                            </div>
                        )}

                        {/* sort data */}
                        {isSmallScreen && (
                            <div className='absolute bottom-0 right-1/2 transform translate-x-1/2 '>
                                <SortSection />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Todo
