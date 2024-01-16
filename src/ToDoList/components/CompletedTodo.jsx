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
        <div className='space-y-2 rounded-lg overflow-hidden'>
            {completedTasks.map((task, index) => (
                <motion.div
                    initial={{ y: -200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className='hover:ring-[1px] hover:ring-green-300 bg-slate-950 flex justify-between items-center px-3 lg:px-6 py-2'>
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, damping: 1 }}
                        className='w-full h-auto max-w-[17.5rem] sm:max-w-[20rem] md:max-w-[26.9rem] lg:max-w-[43rem] xl:max-w-[57rem] overflow-x-auto scrollbar-thin scrollbar-thumb-lime-300 space-y-2 sm:space-y-3 text-white'>
                        <p className='text-[1.6rem] lg:text-3xl bg-gradient-to-br from-blue-300 to-green-300 bg-clip-text font-onest text-transparent font-bold tracking-wide'>{task.title}</p>
                        <p className='text-[1rem] lg:text-xl bg-gradient-to-br from-violet-400 to-cyan-300 bg-clip-text text-transparent font-lato  pb-2'>{task.description}</p>
                    </motion.div>

                    <div className='flex flex-col md:flex-row gap-y-2 gap-x-3 lg:gap-x-5 sm:text-lg md:text-2xl '>
                        <FontAwesomeIcon
                        icon={faTrashCan}
                        className='text-red-400 hover:text-red-500 transition-all active:scale-110 cursor-pointer'
                        onClick={() => deleteTodo(index, completedTasks)}/>

                        <FontAwesomeIcon
                        icon={faUndo}
                        className='text-blue-300 hover:text-blue-500 hover:rotate-[360deg] duration-500 transition-all active:scale-110 cursor-pointer'
                        onClick={() => undoCompletedTodo(index, completedTasks)}/>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default CompletedTodo;
