import React from 'react'
import MediaCard from '../components/MediaCard'
import { useSelector } from 'react-redux'
import { Search, SearchX, X } from 'lucide-react'
import loadingAnimation from '../lottie/loading.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Photos = () => {

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)

    return (
        <div className='w-screen mt-24 px-20 grid grid-cols-5 gap-y-8'>
            {loading && currentTab === 'photos'
                ?
                <div className="w-screen h-[50vh] flex justify-center items-center gap-3 -translate-x-20">
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-56 h-56'
                    />
                </div>
                : result.length === 0
                    ? query === ''
                        ?
                        <div className="w-screen h-[50vh] flex justify-center items-center gap-3 -translate-x-20">
                            <Search size={24} className='text-white/80' />
                            <p className="text-white text-2xl">Search for any photos...</p>
                        </div>
                        :
                        <div className="w-screen h-[50vh] flex justify-center items-center gap-3 -translate-x-20">
                            <SearchX size={24} className='text-white/80' />
                            <p className="text-white text-2xl">No videos found</p>
                        </div>
                    :
                    result.map((photo, idx) => (
                        photo?.urls?.regular && (
                            <MediaCard key={idx} src={photo.urls.regular} alt={photo.alt_description} />
                        )
                    ))

            }
        </div >
    )
}

export default Photos