import React from 'react'
import MediaCard from '../components/MediaCard'
import { useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loading.lottie'
import getStartedAnimation from '../lottie/getStarted.lottie'
import notFoundAnimation from '../lottie/notFound.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Photos = () => {

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)

    return (
        <div className='w-screen mt-12 px-20 grid grid-cols-5 gap-y-8'>
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
                        <div className="w-screen h-[50vh] flex flex-col justify-center items-center -translate-x-20">
                            <DotLottieReact
                                src={getStartedAnimation}
                                loop
                                autoplay
                                className='h-80'
                            />
                        </div>
                        :
                        <div className="w-screen h-[50vh] flex justify-center items-center -translate-x-20">
                            <DotLottieReact
                                src={notFoundAnimation}
                                autoplay
                                className='w-70 h-70'
                            />
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