import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
    todo: [],
    loading: false,
}

export const fetchTodoData = () => async (dispatch) => {
    try {
        const response = await api.get('/remaining');
        response.status === 200
            ? dispatch(setTodoData(response?.data))
            : (() => {throw new Error('Invalid API Response')})()
    } catch (error) {
        console.error(error);
    }
};

export const addTodoData = ({id, title, description, dateTime}) => async (dispatch) => {
    try {
        await api.post('/remaining', { id, title, description, dateTime })
        dispatch(addTodo({id, title, description, dateTime}))
    } catch (error) {
        console.error(error)
    }
}

export const todoSlice = createSlice({
    name: 'todoData',
    initialState,
    reducers: {
        setTodoData: (state, action) => {
            state.todo = action.payload
            state.loading = action.payload.length > 0 && true
        },
        addTodo: (state, action) => {
            const { id, title, description, dateTime } = action.payload;
            state.todo.unshift({ id, title, description, dateTime });
        },
        removeTodoFromUI: (state, action) => {
            const updatedTodo = state.todo;
            state.todo = updatedTodo.filter(todo => todo.id !== action.payload)
        },
        editTodoInUI: (state, action) => {
            const { id, title, description, dateTime } = action.payload;
            state.todo = state.todo.map(todo => (
                todo.id === id
                ? { ...todo, title, description }
                    : todo
            ));
        },        
        markAsCompleteInUI: (state, action) => {
            const completedTask = action.payload[0]
            state.todo = state.todo.filter(todo => todo.id !== completedTask.id)
        },
        removeAllTodoDataInUI: (state) => { state.todo = [] },
    }
})

export const {
    setTodoData,
    addTodo,
    removeTodoFromUI,
    editTodoInUI,
    markAsCompleteInUI,
    removeAllTodoDataInUI,
} = todoSlice.actions;


