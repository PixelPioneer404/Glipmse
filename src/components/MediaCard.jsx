import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loadingForMedia.lottie'

const MediaCard = ({ isAdded, src, alt }) => {

    const [isMediaLoaded, setIsMediaLoaded] = useState(false)
    const currentTab = useSelector(state => state.search.tab)

    return (
        <div className="relative w-80 h-90 rounded-2xl bg-white/80 shadow-xl p-2 flex justify-center items-center">
            {!isMediaLoaded &&
                <div className="w-full h-full flex justify-center items-center">
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-46 h-46'
                    />
                </div>
            }
            {(currentTab === 'photos' || currentTab === 'gifs')
                ? <img onLoad={() => setIsMediaLoaded(true)} src={src} alt={alt} className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover rounded-xl`} />
                : <video onLoadedData={() => setIsMediaLoaded(true)} src={src} autoPlay muted className={`${isMediaLoaded ? 'block' : 'hidden'} w-full h-full object-center object-cover rounded-xl`}></video>
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