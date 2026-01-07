import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrors, setLoading, setQuery, setResult } from '../redux/slices/serachSlice'
import { resetPhotoPage, resetVideoPage, setNextPhotoPage, setNextVideoPage, setTenorNext, resetTenorNext } from '../redux/slices/infiniteScrolling'
import { fetchMediaData } from '../utils/dataFetcher'

const SearchBar = () => {

    const dispatch = useDispatch()
    const currentTab = useSelector(state => state.search.tab)
    const savedQuery = useSelector(state => state.search.query)
    const collectionArray = useSelector(state => state.collection.collectionArray)
    const [text, setText] = useState(savedQuery)

    // Sync local text with Redux query on mount
    useEffect(() => {
        setText(savedQuery)
    }, [savedQuery])

    function clearField() {
        setText('')
        dispatch(setQuery(''))
        dispatch(setResult([]))
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                dispatch(setQuery(text))
                dispatch(setLoading())

                // Reset pagination for new search
                if (currentTab === 'photos') dispatch(resetPhotoPage())
                else if (currentTab === 'videos') dispatch(resetVideoPage())
                else if (currentTab === 'gifs') dispatch(resetTenorNext())

                try {
                    if (currentTab === 'photos') {
                        const { data } = await fetchMediaData(text, 'photos', collectionArray)
                        dispatch(setResult(data))
                        dispatch(setNextPhotoPage())
                    }
                    else if (currentTab === 'videos') {
                        const { data } = await fetchMediaData(text, 'videos', collectionArray)
                        dispatch(setResult(data))
                        dispatch(setNextVideoPage())
                    }
                    else if (currentTab === 'gifs') {
                        const { data, nextToken } = await fetchMediaData(text, 'gifs', collectionArray)
                        dispatch(setResult(data))
                        dispatch(setTenorNext(nextToken))
                    }
                } catch (err) {
                    dispatch(setErrors(err))
                }
            }}
            className="flex flex-row justify-center items-center gap-2 md:gap-3 w-full px-4 md:px-0" >
            <div className="relative flex-1 md:flex-none">
                <div className="z-1 absolute top-1/2 -translate-y-1/2 left-3">
                    <Search size={14} className='text-white/40 md:w-4 md:h-4' />
                </div>
                {text !== '' &&
                    <button
                        type="button"
                        onClick={clearField}
                        className="z-1 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer">
                        <X strokeWidth={1} size={14} className='text-white/80 md:w-4 md:h-4' />
                    </button>
                }
                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    type="text"
                    placeholder='Search anything...'
                    required
                    autoFocus
                    className="relative z-0 w-full md:w-auto pl-8 md:pl-9 pr-8 md:pr-6 py-2.5 md:py-2 rounded-full text-xs md:text-sm text-white/60 font-medium bg-slate-800/40 backdrop-blur-2xl border-0.5 border-white/20 outline-none"
                />
            </div>
            <button type='submit' className="px-4 md:px-6 py-2.5 md:py-2 bg-slate-800 rounded-full cursor-pointer text-white/60 font-medium text-xs md:text-sm whitespace-nowrap">Search</button>
        </form >
    )
}

export default SearchBar