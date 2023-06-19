import {createSlice} from "@reduxjs/toolkit";

export const savedSlice = createSlice({
    name: 'saved',
    initialState: {
        items: []
    },
    reducers: {
        setSavedItem: (state, action) => {
            state.items = action.payload;
        },
        deleteSavedItem: (state) => {
            state.items = [];
        }
    }
});

export const {setSavedItem, deleteSavedItem} = savedSlice.actions;
export default savedSlice.reducer;