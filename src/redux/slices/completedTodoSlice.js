import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
    completedTodo: [],
    loading: false,
}

export const fetchCompletedTodoData = () => async (dispatch) => {
    try {
        const response = await api.get('/completed');
        response.status === 200
            ? dispatch(setCompletedTodoData(response?.data))
            : (() => {throw new Error('Invalid API Response')})()
    } catch (error) {
        console.error(error);
    }
};

export const completedTodoSlice = createSlice({
    name: 'completedTodoData',
    initialState,
    reducers: {
        setCompletedTodoData: (state, action) => {
            state.completedTodo = action.payload
            state.loading = action.payload.length > 0 && true
        },
        addCompletedTask: (state, action) => {
            const completedTask = action.payload[0]
            state.completedTodo.unshift(completedTask)
        },
        removeCompletedTodoFromUI: (state, action) => {
            const updatedTodo = state.completedTodo;
            state.completedTodo = updatedTodo.filter(todo => todo.id !== action.payload)
        },
        removeAllCompletedTodoDataInUI: (state, action) => { 
            state.completedTodo = [] 
        },
    }
})

export const {
    setCompletedTodoData,
    addCompletedTask,
    removeCompletedTodoFromUI,
    removeAllCompletedTodoDataInUI,
} = completedTodoSlice.actions;
