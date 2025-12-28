import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './slices/serachSlice.js'

export const store = configureStore({
    reducer: {
        search: searchReducer
    }
})