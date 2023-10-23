import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './ToDoList/Todo'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Todo/>}/>
                </Routes>
            </BrowserRouter> 
        </>
    )
}

export default App