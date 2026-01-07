import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loadingForMedia.lottie'
import { setId, setIsOpen } from '../redux/slices/openMediaSlice'
import { setCollectionArray } from '../redux/slices/collections'
import { setResult } from '../redux/slices/serachSlice'

const MediaCard = ({ id, src, alt, type }) => {

    const [isMediaLoaded, setIsMediaLoaded] = useState(false)
    const currentTab = useSelector(state => state.search.tab)
    const result = useSelector(state => state.search.result)
    const collectionArray = useSelector(state => state.collection.collectionArray)

    const dispatch = useDispatch()

    // Determine which tag to use: from prop 'type' if on Collections page, else from currentTab
    const mediaType = type || currentTab

    // Check if item is currently in collection
    const isInCollection = collectionArray.some(item => item.id === id)

    return (
        <div className='relative w-full aspect-square'>
            <div
                id={id}
                onClick={() => {
                    dispatch(setId(id))
                    dispatch(setIsOpen(true))
                }}
                className="size-full rounded-xl md:rounded-2xl bg-white/80 shadow-xl p-1.5 md:p-2 flex justify-center items-center group cursor-pointer">
                {!isMediaLoaded &&
                    <div className="absolute inset-0 flex justify-center items-center">
                        <DotLottieReact
                            src={loadingAnimation}
                            loop
                            autoplay
                            className='w-24 h-24 md:w-46 md:h-46'
                        />
                    </div>
                }
                <div className="w-full h-full overflow-hidden rounded-lg md:rounded-xl">
                    {(mediaType === 'photos' || mediaType === 'gifs')
                        ? <img onLoad={() => setIsMediaLoaded(true)} src={src} alt={alt} className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-300 ease-in-out`} />
                        : <video onLoadedData={() => setIsMediaLoaded(true)} src={src} autoPlay muted loop className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-300 ease-in-out`}></video>
                    }
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation() // Prevent event bubbling to parent div

                    // Find the item in result array
                    const item = result.find(item => item.id === id)

                    if (item) {
                        // Toggle collection state
                        if (!isInCollection) {
                            // Add to collection
                            let newArray = [...collectionArray, item]
                            dispatch(setCollectionArray(newArray))
                            localStorage.setItem('collectionData', JSON.stringify(newArray))
                        } else {
                            // Remove from collection
                            let newArray = collectionArray.filter(collectionEl => collectionEl.id !== id)
                            dispatch(setCollectionArray(newArray))
                            localStorage.setItem('collectionData', JSON.stringify(newArray))
                        }

                        // Update result array to sync isAdded state
                        const modifiedResult = result.map(resultItem => {
                            return resultItem.id === id
                                ? { ...resultItem, isAdded: !resultItem.isAdded }
                                : resultItem
                        })
                        dispatch(setResult(modifiedResult))
                    } else {
                        // If item not in result (e.g., on Collections page), just remove from collection
                        let newArray = collectionArray.filter(collectionEl => collectionEl.id !== id)
                        dispatch(setCollectionArray(newArray))
                        localStorage.setItem('collectionData', JSON.stringify(newArray))
                    }
                }}
                className="absolute bottom-2 right-2 md:bottom-6 md:right-6 rounded-full cursor-pointer active:scale-90 transition-all duration-300 ease-in-out w-10 h-10 md:w-12 md:h-12 shadow-2xl bg-white/90 flex justify-center items-center">
                {isInCollection
                    ? <i className="ri-heart-fill text-xl md:text-2xl text-red-600/80"></i>
                    : <i className="ri-heart-line text-xl md:text-2xl text-black/80"></i>
                }
            </button>
        </div>
    )
}

export default MediaCard