import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrors, setLoading, setQuery, setResult } from '../redux/slices/serachSlice'
import { getGifs, getPhotos, getVideos } from '../api/mediaApi'

const SearchBar = () => {

    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const currentTab = useSelector(state => state.search.tab)

    function clearField() {
        setText('')
    }

    useEffect(() => {
        if (text === '') {
            dispatch(setQuery(''))
            dispatch(setResult([]))
        }
    }, [text])

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                dispatch(setQuery(text))
                dispatch(setLoading())
                try {
                    if (currentTab === 'photos') dispatch(setResult(await getPhotos(text)))
                    else if (currentTab === 'videos') dispatch(setResult(await getVideos(text)))
                    else if (currentTab === 'gifs') dispatch(setResult(await getGifs(text)))
                } catch (err) {
                    dispatch(setErrors(err))
                }
                console.log(await getPhotos(text)) //for confirmation
                console.log(await getVideos(text)) //for confirmation
                console.log(await getGifs(text)) //for confirmation
            }}
            className="flex flex-row justify-center items-center gap-3">
            <div className="relative">
                <div className="z-1 absolute top-1/2 -translate-y-1/2 left-3">
                    <Search size={16} className='text-white/40' />
                </div>
                {text !== '' &&
                    <button
                        type="button"
                        onClick={clearField}
                        className="z-1 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer">
                        <X strokeWidth={1} size={16} className='text-white/80' />
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
                    className="relative z-0 pl-9 pr-6 py-2 rounded-full text-sm text-white/60 font-medium bg-slate-800/40 backdrop-blur-2xl border-0.5 border-white/20 outline-none"
                />
            </div>
            <button type='submit' className="px-6 py-2 bg-slate-800 rounded-full cursor-pointer text-white/60 font-medium text-sm">Search</button>
        </form>
    )
}

export default SearchBar