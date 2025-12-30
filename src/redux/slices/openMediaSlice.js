import { createSlice } from "@reduxjs/toolkit";

const openMediaSlice = createSlice({
    name: 'View Content',
    initialState: {
        clickedId: null,
        isOpen: false
    },
    reducers: {
        setId: (state, actions) => {
            state.clickedId = actions.payload
        },
        setIsOpen: (state, actions) => {
            state.isOpen = actions.payload
        }
    }
})

export const { setIsOpen, setId } = openMediaSlice.actions
export default openMediaSlice.reducer