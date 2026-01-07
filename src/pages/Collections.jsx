import React, { useEffect } from 'react'
import MediaCard from '../components/MediaCard'
import { useDispatch, useSelector } from 'react-redux'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import getStartedAnimation from '../lottie/noCollection.lottie'
import { setCollectionArray } from '../redux/slices/collections'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Collections = () => {

  const navigate = useNavigate()

  const collectionArray = useSelector(state => state.collection.collectionArray)
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem('collectionData')
    if (localData) {
      dispatch(setCollectionArray(JSON.parse(localData)))
    }
  }, [])

  return (
    <div className='relative w-screen mt-12 px-4 md:px-20'>
      <div className="fixed top-24 md:top-30 left-4 md:left-20 flex flex-col justify-center items-left gap-4 md:gap-8">
        <button
          onClick={() => { navigate('/') }}
          className="w-12 h-12 md:w-14 md:h-14 bg-slate-700 rounded-full hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex justify-center items-center">
          <ChevronLeft className='text-white font-bold -translate-x-0.5' size={24} />
        </button>
        <p className="ml-2 text-left text-white font-sans font-bold text-2xl md:text-5xl max-w-xs md:max-w-none md:whitespace-nowrap">
          Have a Second L👀k on Your <span className="italic text-yellow-400">Saved</span> Ones.
        </p>
      </div>
      <div className="mt-48 md:mt-65 grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-8 gap-x-4">
        {collectionArray.length === 0
          ?
          <div className="w-screen h-[55vh] flex flex-col justify-center items-center -translate-x-4 md:-translate-x-20">
            <DotLottieReact
              src={getStartedAnimation}
              loop
              autoplay
              className='h-32 md:h-50'
            />
            <p className="text-white/60 text-sm md:text-lg font-medium mt-4">No items in your collection yet</p>
          </div>
          :
          collectionArray.map((item, idx) => {
            // Determine the source URL based on type
            let src = ''
            let alt = ''

            if (item.type === 'photos') {
              src = item.urls?.regular
              alt = item.alt_description
            } else if (item.type === 'videos') {
              src = item.video_files?.[0]?.link
            } else if (item.type === 'gifs') {
              src = item.media_formats?.gif?.url
            }

            return src ? (
              <MediaCard
                key={idx}
                id={item.id}
                isSaved={true}
                src={src}
                alt={alt}
                type={item.type}
              />
            ) : null
          })
        }
      </div>
    </div>
  )
}

export default Collections