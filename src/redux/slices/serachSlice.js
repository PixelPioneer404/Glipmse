import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        tab: 'photos',
        loading: false,
        result: [],
        errors: null
    },
    reducers: {
        setQuery: (state, actions) => {
            state.query = actions.payload
        },
        setTab: (state, actions) => {
            state.tab = actions.payload
        },
        setLoading: (state) => {
            state.loading = true
            state.errors = null
        },
        setResult: (state, actions) => {
            state.result = actions.payload
            state.loading = false
        },
        setErrors: (state, actions) => {
            state.errors = actions.payload
            state.loading = false
        }
    }
})

export const { setQuery, setTab, setLoading, setResult, setErrors } = searchSlice.actions
export default searchSlice.reducer