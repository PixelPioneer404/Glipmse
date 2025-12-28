import React from 'react'
import { useSelector } from 'react-redux'

const MediaCard = ({ isAdded, src, alt }) => {

    const currentTab = useSelector(state => state.search.tab)

    return (
        <div className="relative w-80 h-90 rounded-2xl bg-white/80 shadow-xl p-2 flex justify-center items-center">
            {currentTab === 'photos' || currentTab === 'gifs'
                ? <img src={src} alt={alt} className="w-full h-full object-center object-cover rounded-xl" />
                : <video src={src} autoPlay muted className="w-full h-full object-center object-cover rounded-xl"></video>
            }
            <div className="absolute bottom-6 right-6 rounded-full cursor-pointer active:scale-90 transition-all duration-300 ease-in-out w-12 h-12 shadow-2xl bg-white/90 flex justify-center items-center">
                {isAdded
                    ? <i className="ri-heart-fill text-2xl text-red-600/80"></i>
                    : <i className="ri-heart-line text-2xl text-black/80"></i>
                }
            </div>
        </div>
    )
}

export default MediaCard