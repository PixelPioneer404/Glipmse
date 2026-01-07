import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setResult, setTab, setLoading } from '../redux/slices/serachSlice'
import { resetPhotoPage, resetVideoPage, resetTenorNext, setNextPhotoPage, setNextVideoPage, setTenorNext } from '../redux/slices/infiniteScrolling'
import { fetchMediaData } from '../utils/dataFetcher'

const TabLinks = () => {

    const dispatch = useDispatch()
    const query = useSelector(state => state.search.query)
    const collectionArray = useSelector(state => state.collection.collectionArray)

    async function handleTab(tabName) {
        dispatch(setTab(tabName))
        if (query !== '') {
            dispatch(setLoading())
            
            if (tabName === 'photos') {
                dispatch(resetPhotoPage())
                const { data } = await fetchMediaData(query, 'photos', collectionArray)
                dispatch(setResult(data))
                dispatch(setNextPhotoPage())
            }
            else if (tabName === 'videos') {
                dispatch(resetVideoPage())
                const { data } = await fetchMediaData(query, 'videos', collectionArray)
                dispatch(setResult(data))
                dispatch(setNextVideoPage())
            }
            else if (tabName === 'gifs') {
                dispatch(resetTenorNext())
                const { data, nextToken } = await fetchMediaData(query, 'gifs', collectionArray)
                dispatch(setResult(data))
                dispatch(setTenorNext(nextToken))
            }
        }
    }

    return (
        <div className="flex justify-center items-center gap-3 md:gap-4 font-medium text-sm md:text-md">
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