import { createSlice } from "@reduxjs/toolkit";

export const dataStatusSlice = createSlice({
    name: "status",
    initialState: true,
    reducers: {
        currentStatus: (state, action) => {
            return action.payload; 
        }
    }
});

export const { currentStatus } = dataStatusSlice.actions;
