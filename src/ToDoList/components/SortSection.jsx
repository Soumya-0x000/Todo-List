import { faArrowDown91, faArrowDownZA, faArrowUp91, faArrowUpZA, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const sortOptions = [
    { title: 'A to Z', icon: <FontAwesomeIcon icon={faArrowUpZA} className='text-xl'/> },
    { title: 'Z to A', icon: <FontAwesomeIcon icon={faArrowDownZA} className='text-xl'/> },
    { title: `Creation ↑`, icon: <FontAwesomeIcon icon={faArrowUp91} className='text-xl'/> },
    { title: `Creation ↓`, icon: <FontAwesomeIcon icon={faArrowDown91} className='text-xl'/> },
]

const SortSection = ({ sortingData, handleSortedData, showTodo }) => {
    const [showSortOption, setShowSortOption] = useState(false)
    const [sortMode, setSortMode] = useState('title')
    const [sortOption, setSortOption] = useState('')
    const [sortModeVisibility, setSortModeVisibility] = useState(Array(sortOptions.length).fill(false))

    const handleSelectOption = (sortOption, selectSortMode) => {
        let sortedData = [];
        
        switch (sortOption) {
            case 'A to Z':
                switch (selectSortMode) {
                    case 'title':
                        sortedData = sortingData.slice().sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case 'details':
                        sortedData = sortingData.slice().sort((a, b) => a.description.localeCompare(b.description));
                        break;
                    default:
                        break;
                }
                break;
            case 'Z to A':
                switch (selectSortMode) {
                    case 'title':
                        sortedData = sortingData.slice().sort((a, b) => b.title.localeCompare(a.title));
                        break;
                    case 'details':
                        sortedData = sortingData.slice().sort((a, b) => b.description.localeCompare(a.description));
                        break;
                    default:
                        break;
                }
                break;
            case 'Creation ↑':
                sortedData = sortingData.slice().sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
                break;
            case 'Creation ↓':
                sortedData = sortingData.slice().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
                break;
            default:
                sortedData = sortingData;
                break;
        }
        handleSortedData(sortedData);
    };

    useEffect(() => {
        handleSelectOption(sortOption, sortMode)
    }, [sortMode])

    useEffect(() => {
        setShowSortOption(false)
    },[showTodo])

    const handleModeShow = (text, index) => {
        setSortOption(text)
        const newVisibilityArray = Array(sortOption.length).fill(false);

        if (text === 'A to Z' || text === 'Z to A') {
            newVisibilityArray[index] = true;
        }
        setSortModeVisibility(newVisibilityArray)
    }

    const handleShowSortOption = () => {
        setShowSortOption(!showSortOption)
        setSortModeVisibility(false)
    }

    return <>
        <motion.div 
        className='bg-slate-800 hover:bg-cyan-950 text-cyan-200 p-2 md:p-3 rounded-full transition-all animate-bounce cursor-pointer'
        onClick={handleShowSortOption}>
            <FontAwesomeIcon 
                icon={faSort} 
                className='md:text-xl' 
            />
        </motion.div>

        {showSortOption && (
            <motion.div 
            onMouseLeave={(e) => setSortModeVisibility(Array(sortModeVisibility.length).fill(false))}
            className='optiondiv absolute bottom-[4rem] left-1/2 w-[8rem] md:w-[12rem] bg-gradient-to-br from-violet-900 to-indigo-700 text-slate-300 rounded-lg shadow-lg '
            initial={{ x: '-50%', y: -100, opacity: 0 }}
            animate={{ x: '-50%', y: 0, opacity: 1 }}>
                {sortOptions.map((item, index) => (
                    <div 
                    key={index}
                    className={`px-2 rounded-lg md:px-4 flex font-lato items-center justify-between hover:bg-gradient-to-tl from-indigo-500 to-emerald-700 hover:text-cyan-300 text-violet-300 py-3 cursor-pointer hover:scale-105  md:hover:scale-110 transition-all relative text-sm md:text-lg`}
                    onClick={() => handleSelectOption(sortOption, sortMode)}
                    onMouseEnter={(e) => handleModeShow(e.target.innerText, index)}>
                        <span className=' font-bold font-oxanium'>{item.title}</span>
                        <span>{item.icon}</span>

                        {sortModeVisibility[index] && (
                            <motion.div
                            initial={{x: -100, opacity: 0 }} 
                            animate={{x: 0, opacity: 1 }} 
                            className='bg-gradient-to-br from-indigo-700 to-violet-600 text-amber-200 flex flex-col items-center justify-between font-mavenPro text-[13px] md:text-[16px] absolute -right-[8rem] md:-right-[12rem] top-2 w-full rounded-lg overflow-hidden '>
                                <div className=' w-full h-full font-bold flex items-center justify-between relative'>
                                    <span 
                                    className={`w-1/2 py-[.3rem] bg-gradient-to-br ${sortMode === 'title' && 'from-amber-300 to-fuchsia-400 text-amber-800'} cursor-pointer transition-all tracking-wider text-center`}
                                    onClick={() => setSortMode('title')}>
                                        Title
                                    </span>

                                    <span 
                                    className={`w-2/3 py-[.3rem] bg-gradient-to-br ${sortMode === 'details' && 'from-amber-300 to-fuchsia-400 text-amber-800'} cursor-pointer transition-all tracking-wider text-center`}
                                    onClick={() => setSortMode('details')}>
                                        Details
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </motion.div>
        )}
    </>;
}

export default SortSection
