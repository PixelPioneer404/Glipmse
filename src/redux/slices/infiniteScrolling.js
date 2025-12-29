import { createSlice } from "@reduxjs/toolkit"

export const scrollingSlice = createSlice({
    name: 'infiniteScroll',
    initialState: {
        hasMore: true,
        photoPage: 0,
        videoPage: 0,
        tenorNext: ''
    },
    reducers: {
        setHasMore: (state, actions) => {
            state.hasMore = actions.payload
        },
        setNextPhotoPage: (state) => {
            state.photoPage += 1
        },
        setNextVideoPage: (state) => {
            state.videoPage += 1
        },
        resetPhotoPage: (state) => {
            state.photoPage = 0
            state.hasMore = true
        },
        resetVideoPage: (state) => {
            state.videoPage = 0
            state.hasMore = true
        },
        setTenorNext: (state, actions) => {
            state.tenorNext = actions.payload
        },
        resetTenorNext: (state) => {
            state.tenorNext = ''
            state.hasMore = true
        }
    }
})

export const { setHasMore, setNextPhotoPage, setNextVideoPage, resetPhotoPage, resetVideoPage, setTenorNext, resetTenorNext } = scrollingSlice.actions
export default scrollingSlice.reducer