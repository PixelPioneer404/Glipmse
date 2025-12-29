import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './slices/serachSlice.js'
import scrollingReducer from './slices/infiniteScrolling.js'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        scrolling: scrollingReducer
    }
})