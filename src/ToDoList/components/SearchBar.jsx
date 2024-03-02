import React, { useEffect, useState } from 'react'
import noFound from '../../asset/animation_nofound.gif'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const SearchBar = () => {
    const todoData = useSelector((state) => state.todoData.todo)
    const completedTodoData = useSelector((state) => state.completedTodoData.completedTodo)
    const status = useSelector((state) => state.status)

    const [searchItem, setSearchItem] = useState('')
    const [searchItemFound, setSearchItemFound] = useState(false)
    const [showSearchPanel, setShowSearchPanel] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [iconSwitch, setIconSwitch] = useState(false)

    useEffect(() => {
        const initiateSearch = (item) => {
            const filteredResults = (status ? todoData : completedTodoData).filter(result => (
                result.title.toLowerCase().includes(item.toLowerCase()) ||
                result.description.toLowerCase().includes(item.toLowerCase()) || 
                result.title.toLowerCase() === item.toLowerCase() ||
                result.description.toLowerCase() === item.toLowerCase()
            ))
            
            if (filteredResults.length > 0) {
                setSearchItemFound(true)
                setSearchResult(filteredResults)
            } else {
                setSearchItemFound(false)
                setSearchResult([])
            }
            
            if (todoData.length === 0 || searchItem.trim().length === 0) {
                setIconSwitch(false)
                setShowSearchPanel(false)
            } 
        }
        initiateSearch(searchItem)
    }, [status, searchItem, todoData])

    const handleKeyStroke = (item) => {
        if (item.key === "Enter" && searchItem.trim().length > 0){
            setShowSearchPanel(true)
            setIconSwitch(true)            
        }
    }

    const handelIconSwitch = () => {
        if (searchItem.trim().length > 0) {
            setShowSearchPanel(!showSearchPanel)
            setIconSwitch(!iconSwitch)
        }
    }

    return (
        <div className='min-w-[40%] lg:min-w-[50%] xl:w-[33rem] 2xl:w-[44rem]'>
            <div className='relative w-full h-[3rem] rounded-lg overflow-hidden'>
                <input 
                    type="search" 
                    className=' w-full h-full bg-slate-900 border-none outline-none text-white placeholder:text-gray-500 pl-4 pr-2 py-2 font-montserrat '
                    value={searchItem}
                    placeholder='Search for todo...'
                    onChange={(e) => setSearchItem(e.target.value)}
                    onKeyDown={handleKeyStroke}
                />

                <div 
                className={`h-full absolute right-0 top-0 flex flex-col items-center justify-center bg-slate-950 text-slate-300 w-8 lg:w-10 cursor-pointer`}
                onClick={handelIconSwitch}>
                    {iconSwitch ? (
                        <FontAwesomeIcon icon={faX} />
                    ) : (
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    )}
                </div>
            </div>

            {showSearchPanel && (
                <div 
                className={`absolute w-[98%] h-[31.5rem] rounded-lg overflow-hidden left-1/2 transform -translate-x-1/2 top-14 ${status ? 'bg-slate-900' : ' bg-slate-950'} shadow-2xl shadow-red-300 z-50`}>
                    {searchItemFound && (
                        <div 
                        className={`
                        py-2 flex items-center justify-center text-xl font-robotoMono font-bold bg-gradient-to-br 
                        ${status 
                            ? 'from-emerald-400 to-indigo-600 text-emerald-100' 
                            : 'from-violet-400 to-indigo-600  text-violet-200'} `}>
                            <p>{searchResult.length} {searchResult.length === 1 ? 'item' : 'items'} found</p>
                        </div>
                    )}

                    <div className='fixed w-full top-14 h-[28rem] overflow-auto '>
                        {searchItemFound ? (
                            <motion.div 
                            className={` ${status ? 'text-cyan-200' : ' text-indigo-300'} space-y-4 px-4 pb-4 `}
                            initial={{y: 300}}
                            animate={{y: 0, duration: 1}}>
                                {searchResult.map((val) => (
                                    <div 
                                    className={`w-full my-[5px] flex flex-col items-start justify-between gap-y-4 tracking-wide hover:ring-[2px] ${status ? 'bg-gray-950 hover:ring-emerald-300' : 'bg-gray-900 hover:ring-violet-300'} rounded-lg pl-4 py-2 `}
                                    key={val.id}>
                                        <p className={`${status ? 'text-emerald-300' : 'text-violet-300'}  text-[1.4rem] font-montserrat`}>
                                            {val.title}
                                        </p>
                                        <p className=' font-mooli'>
                                            {val.description}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        ) : ( 
                            <div className={`absolute top-0 w-full h-full flex flex-col items-center justify-center ${status ? 'text-cyan-200' : ' text-amber-300'}`}>
                                <img src={noFound} />
                                <p className='absolute bottom-2 text-xl '>
                                    <strong>'{searchItem}'</strong> not found
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar
