import {createSlice} from "@reduxjs/toolkit";

const items: any[] = [];
export const historySlice = createSlice({
    name: 'history',
    initialState: {
        items: items
    },
    reducers: {
        addHistoryItem: (state, action) => {
            const {item} = action.payload;

            if (item) {
                state.items.push(item);
            }
        },
        setHistoryItems: (state, action) => {
            state.items = action.payload
        },
        deleteHistory: (state) => {
            state.items = []
        }
    }
});

export const {addHistoryItem, setHistoryItems, deleteHistory} = historySlice.actions;
export default historySlice.reducer;