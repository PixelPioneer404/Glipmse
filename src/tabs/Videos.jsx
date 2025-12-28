import { Search, SearchX } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import MediaCard from '../components/MediaCard'
import loadingAnimation from '../lottie/loading.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Videos = () => {

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)

    return (
        <div className='w-screen mt-24 px-20 grid grid-cols-5 gap-y-8'>
            {loading && currentTab === 'videos'
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
                            <p className="text-white text-2xl">Search for any videos...</p>
                        </div>
                        :
                        <div className="w-screen h-[50vh] flex justify-center items-center gap-3 -translate-x-20">
                            <SearchX size={24} className='text-white/80' />
                            <p className="text-white text-2xl">No videos found</p>
                        </div>
                    :
                    result.map((video, idx) => (
                        video?.video_files?.[0]?.link && (
                            <MediaCard key={idx} src={video.video_files[0].link} />
                        )
                    ))

            }
        </div>
    )
}

export default Videos