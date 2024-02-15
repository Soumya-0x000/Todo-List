import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddRemoveBtn = ({handleAddTodo, text, icon}) => {
    return (
        <div className=" flex items-center justify-center cursor-pointer"
        onClick={handleAddTodo}>
            <div
            className="relative h-[35px] sm:h-[50px] inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gradient-to-l from-violet-600 to-indigo-600 text-white group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out group-hover:h-full bg-gradient-to-r from-fuchsia-500 to-rose-400"
                ></span>
                
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <FontAwesomeIcon icon={icon} />
                </span>
                
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200 text-lg">
                    <FontAwesomeIcon icon={icon} />
                </span>

                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200 text-[14px] sm:text-[18px] font-oxanium ">
                    {text}
                </span>
            </div>
        </div>
    )
}

export default AddRemoveBtn