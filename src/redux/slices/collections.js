import { createSlice } from "@reduxjs/toolkit";

// Load collection from localStorage on initialization
const loadCollectionFromStorage = () => {
    try {
        const savedCollection = localStorage.getItem('collectionData')
        return savedCollection ? JSON.parse(savedCollection) : []
    } catch (error) {
        console.error('Error loading collection from localStorage:', error)
        return []
    }
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collectionArray: loadCollectionFromStorage(),
        targetId: null
    },
    reducers: {
        setCollectionArray: (state, actions) => {
            state.collectionArray = actions.payload
        },
        setTargetId: (state, actions) => {
            state.targetId = actions.payload
        }
    }
})

export const { setCollectionArray, setIsAdded, setTargetId } = collectionSlice.actions
export default collectionSlice.reducer