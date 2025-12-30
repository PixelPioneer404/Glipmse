import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loadingForMedia.lottie'
import { setId, setIsOpen } from '../redux/slices/openMediaSlice'

const MediaCard = ({ id, isAdded, src, alt }) => {

    const [isMediaLoaded, setIsMediaLoaded] = useState(false)
    const currentTab = useSelector(state => state.search.tab)
    const dispatch = useDispatch()

    return (
        <div
            id={id}
            onClick={() => {
                dispatch(setId(id))
                dispatch(setIsOpen(true))
            }}
            className="relative w-80 h-100 rounded-2xl bg-white/80 shadow-xl p-2 flex justify-center items-center group cursor-pointer">
            {!isMediaLoaded &&
                <div className="absolute inset-0 flex justify-center items-center">
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-46 h-46'
                    />
                </div>
            }
            <div className="w-full h-full overflow-hidden rounded-xl">
                {(currentTab === 'photos' || currentTab === 'gifs')
                    ? <img onLoad={() => setIsMediaLoaded(true)} src={src} alt={alt} className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-300 ease-in-out`} />
                    : <video onLoadedData={() => setIsMediaLoaded(true)} src={src} autoPlay muted loop className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-300 ease-in-out`}></video>
                }
            </div>
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