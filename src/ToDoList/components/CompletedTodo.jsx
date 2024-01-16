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
                    className='relative hover:ring-[1px] hover:ring-green-300 bg-slate-950 flex justify-between items-center px-3 lg:px-4'>
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, damping: 1 }}
                        className='xl:w-[70rem] 2xl:w-[80rem] py-2 h-auto overflow-x-auto scrollbar-thin scrollbar-thumb-lime-300 space-y-2 sm:space-y-3 text-white'>
                        <p className='text-[1.2rem] sm:text-[1.6rem] lg:text-3xl bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text font-onest text-transparent  font-bold tracking-wide'>{task.title}</p>
                        <p className='text-[1rem] lg:text-xl pb-2 bg-gradient-to-br from-violet-400 to-cyan-300 bg-clip-text text-transparent font-lato '>{task.description}</p>
                    </motion.div>

                    <div className='absolute h-full top-0 right-0 pl-3 sm:pl-6 pr-3 py-2 bg-slate-950 flex items-center justify-center flex-col md:flex-row gap-y-2 gap-x-3 lg:gap-x-5 sm:text-lg md:text-xl '>
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
