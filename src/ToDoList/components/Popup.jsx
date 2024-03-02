import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const Popup = ({ popupVisibility, index, todo }) => {
    return (
        <>
            {popupVisibility[index] && (
                <motion.div 
                className=' absolute text-green-300 bg-gradient-to-br from-indigo-950 to-violet-700 px-4 py-1 rounded-b-lg right-1/2 top-0 translate-x-1/2 text-center space-y-3'
                initial={{opacity: 0, y: 60, x: '50%'}}
                animate={{opacity: 1, y: 0, x: '50%'}}>
                    <p className=' font-oxanium text-violet-300 font-bold text-[11px] sm:text-[13px] md:text-[16px]'>
                        {dayjs(todo.dateTime).format('MMMM DD, YYYY, h:mm:ss A')} 
                    </p>
                </motion.div>
            )}
        </>
    )
}

export default Popup
