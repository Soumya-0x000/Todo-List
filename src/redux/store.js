import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './slices/todoSlice'
import { completedTodoSlice } from './slices/completedTodoSlice'
import { dataStatusSlice } from './slices/dataStatus'

export const store = configureStore({
    reducer: {
        todoData: todoSlice.reducer,
        completedTodoData: completedTodoSlice.reducer,
        status: dataStatusSlice.reducer
    }
}) 
