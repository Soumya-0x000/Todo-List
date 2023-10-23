import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';

const CompletedTodo = ({ completedTasks, removeTask, undoTask }) => {

    const deleteTodo = (index, task) => {
        removeTask(index, task);
    };

    const undoCompletedTodo = (index, task) => {
        undoTask(index, task);
    };

    return (
        <div className='space-y-2'>
            {completedTasks.map((task, index) => (
                <motion.div
                    initial={{ y: -200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className='hover:shadow-md hover:shadow-green-300/50 bg-neutral-800 flex justify-between items-center px-3 lg:px-6 py-2 lg:py-3'>
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, damping: 1 }}
                        className='w-full h-auto max-w-[17.5rem] sm:max-w-[20rem] md:max-w-[26.9rem] lg:max-w-[43rem] xl:max-w-[57rem] overflow-x-auto scrollbar-thin scrollbar-thumb-lime-300 space-y-2 sm:space-y-3 text-white'>
                        <p className='text-[1.6rem] lg:text-3xl text-green-400 font-bold tracking-wide'>{task.title}</p>
                        <p className='text-[1rem] lg:text-xl'>{task.description}</p>
                    </motion.div>

                    <div className='flex flex-col md:flex-row gap-y-2 gap-x-3 lg:gap-x-5 sm:text-lg md:text-2xl lg:text-[1.7rem]'>
                        <FontAwesomeIcon
                        icon={faTrashCan}
                        className='text-green-300 hover:text-red-400 transition-all active:scale-110 cursor-pointer'
                        onClick={() => deleteTodo(index, completedTasks)}/>

                        <FontAwesomeIcon
                        icon={faUndo}
                        className='text-green-300 hover:text-violet-400 hover:rotate-[360deg] duration-500 transition-all active:scale-110 cursor-pointer'
                        onClick={() => undoCompletedTodo(index, completedTasks)}/>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default CompletedTodo;
