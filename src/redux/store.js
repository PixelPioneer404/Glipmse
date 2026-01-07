import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './slices/serachSlice.js'
import scrollingReducer from './slices/infiniteScrolling.js'
import openMediaReducer from './slices/openMediaSlice.js'
import collectionReducer from './slices/collections.js'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        scrolling: scrollingReducer,
        viewContent: openMediaReducer,
        collection: collectionReducer
    }
})