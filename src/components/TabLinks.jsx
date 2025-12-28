import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setResult, setTab } from '../redux/slices/serachSlice'
import { getGifs, getPhotos, getVideos } from '../api/mediaApi'

const TabLinks = () => {

    const dispatch = useDispatch()
    const query = useSelector(state => state.search.query)

    async function handleTab(tabName) {
        dispatch(setTab(tabName))
        if (query !== '') {
            if (tabName === 'photos') dispatch(setResult(await getPhotos(query)))
            else if (tabName === 'videos') dispatch(setResult(await getVideos(query)))
            else if (tabName === 'gifs') dispatch(setResult(await getGifs(query)))
        }
    }

    return (
        <div className="flex justify-center items-center gap-4 font-medium text-md">
            <NavLink
                onClick={() => handleTab('photos')}
                to='.'
                end
                className={({ isActive }) => isActive ? 'text-white py-1 border-b border-white cursor-pointer' : 'text-white/60 py-1 cursor-pointer'}
            >
                Photos
            </NavLink>
            <NavLink
                onClick={() => handleTab('videos')}
                to='videos'
                className={({ isActive }) => isActive ? 'text-white py-1 border-b border-white cursor-pointer' : 'text-white/60 py-1 cursor-pointer'}
            >
                Videos
            </NavLink>
            <NavLink
                onClick={() => handleTab('gifs')}
                to='gifs'
                className={({ isActive }) => isActive ? 'text-white py-1 border-b border-white cursor-pointer' : 'text-white/60 py-1 cursor-pointer'}
            >
                Gifs
            </NavLink>
        </div>
    )
}

export default TabLinks