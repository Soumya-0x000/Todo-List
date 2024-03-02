import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { removeCompletedTodoFromUI } from '../../redux/slices/completedTodoSlice';
import { addTodo } from '../../redux/slices/todoSlice';

const CompletedTodo = () => {
    const completedTodoData = useSelector((state) => state.completedTodoData.completedTodo)
    const dispatch = useDispatch()

    const [showPopup, setShowPopup] = useState(Array(completedTodoData.length).fill(false));
    const [popUpVisibility, setPopUpVisibility] = useState(false);

    const deleteTodo = async(id) => {
        try {
            await api.delete(`/completed/${id}`)
            dispatch(removeCompletedTodoFromUI(id))
        } catch (error) {
            console.error(error)
        }
    };
    
    const undoCompletedTodo = async(id) => {
        try {
            const dataToMoveInTodo = completedTodoData.filter(data => data.id === id)
            dispatch(addTodo({
                id: dataToMoveInTodo[0].id,
                title: dataToMoveInTodo[0].title,
                description: dataToMoveInTodo[0].description,
                dateTime: dataToMoveInTodo[0].dateTime
            }))
            await api.post(`/remaining`, {
                id: dataToMoveInTodo[0].id,
                title: dataToMoveInTodo[0].title,
                description: dataToMoveInTodo[0].description,
                dateTime: dataToMoveInTodo[0].dateTime
            })
            dispatch(removeCompletedTodoFromUI(id))
            await api.delete(`/completed/${id}`)
        } catch (error) {
            console.error(error)
        }
    };

    const handleShowPopup = (index) => {
        const updatedPopup = [...showPopup]
        updatedPopup[index] = !updatedPopup[index];
        setShowPopup([...updatedPopup])
    }
    
    const handleHidePopup = (index) => {
        const updatedPopup = [...showPopup]
        updatedPopup[index] = !updatedPopup[index]
        setShowPopup([...updatedPopup]);
    }

    const handleClick = (index) => {
        setPopUpVisibility(!popUpVisibility)
        popUpVisibility
            ? handleShowPopup(index)
            : handleHidePopup(index)
    }

    return (
        <div className='space-y-2 rounded-lg overflow-hidden'>
            {completedTodoData.map((task, index) => (
                <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                key={index}
                className='relative hover:ring-[1px] hover:ring-green-300 bg-slate-950 flex justify-between items-center '>
                    {/* data part */}
                    <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, damping: 1 }}
                    className=' overflow-x-auto pl-3 lg:pl-4 py-2 scrollbar-thin scrollbar-thumb-lime-300 cursor-pointer w-[88%] lg:w-[92%] h-auto space-y-1.5 sm:space-y-3 text-white '
                    onClick={() => handleClick(index)}>
                        <p className='text-[1.2rem] sm:text-[1.6rem] lg:text-3xl bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text font-onest text-transparent  font-bold tracking-wide'>{task.title}</p>
                        <p className='text-[1rem] lg:text-xl pb-2 bg-gradient-to-br from-violet-400 to-cyan-300 bg-clip-text text-transparent font-lato '>{task.description}</p>
                    </motion.div>

                    {/* icon part */}
                    <div className='w-[8%] absolute h-full top-0 right-2 lg:right-0 bg-transparent flex items-center justify-center flex-col md:flex-row gap-y-2 gap-x-3 sm:text-lg md:text-[19px]'>
                        <FontAwesomeIcon
                        icon={faTrashCan}
                        className='text-red-400 hover:text-red-500 transition-all active:scale-110 cursor-pointer'
                        onClick={() => deleteTodo(task.id)}/>

                        <FontAwesomeIcon
                        icon={faUndo}
                        className='text-blue-300 hover:text-blue-500 hover:rotate-[360deg] duration-500 transition-all active:scale-110 cursor-pointer'
                        onClick={() => undoCompletedTodo(task.id)}/>
                    </div>

                    {/* pop up date time */}
                    <Popup 
                        popupVisibility={showPopup}
                        index={index}
                        todo={task}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default CompletedTodo;
