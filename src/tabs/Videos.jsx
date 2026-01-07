import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MediaCard from '../components/MediaCard'
import loadingAnimation from '../lottie/loading.lottie'
import getStartedAnimation from '../lottie/getStarted.lottie'
import notFoundAnimation from '../lottie/notFound.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { setResult } from '../redux/slices/serachSlice'
import { setHasMore, setNextVideoPage } from '../redux/slices/infiniteScrolling'
import { fetchMediaData } from '../utils/dataFetcher'

const Videos = () => {

    const dispatch = useDispatch()

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)
    const collectionArray = useSelector(state => state.collection.collectionArray)

    const hasMore = useSelector(state => state.scrolling.hasMore)
    const videoPage = useSelector(state => state.scrolling.videoPage)

    const sentinelRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)

    const latestData = useRef({ result, videoPage, collectionArray })
    useEffect(() => {
        latestData.current = { result, videoPage, collectionArray }
    }, [result, videoPage, collectionArray])


    useEffect(() => {
        const loadMore = async () => {
            if (isFetching || !hasMore || !query || currentTab !== 'videos') return

            const currentPage = latestData.current.videoPage
            if (currentPage === 0) return

            setIsFetching(true)
            try {
                const { data } = await fetchMediaData(query, 'videos', latestData.current.collectionArray, currentPage + 1)

                if (data.length < 20) {
                    dispatch(setHasMore(false))
                }

                dispatch(setResult([...latestData.current.result, ...data]))
                dispatch(setNextVideoPage())
            } catch (error) {
                console.error('Error loading videos:', error)
                dispatch(setHasMore(false))
            } finally {
                setIsFetching(false)
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore()
            }
        }, { threshold: 0.5 })

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [hasMore, query, currentTab, isFetching, dispatch])

    return (
        <div className='relative w-screen mt-12 px-20 grid grid-cols-5 gap-y-8'>
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
                    result.map((video, idx) => (
                        video?.video_files?.[0]?.link && (
                            <MediaCard key={idx} id={video.id} isSaved={video.isAdded} src={video.video_files[0].link} />
                        )
                    ))

            }
            <div ref={sentinelRef} className="absolute bottom-0 translate-y-full left-0 w-full h-20 flex justify-center items-center">
                {isFetching &&
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-40 h-40'
                    />
                }
            </div>
        </div>
    )
}

export default Videos