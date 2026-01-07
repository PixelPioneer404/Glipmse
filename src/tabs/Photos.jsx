import React, { useEffect, useRef, useState } from 'react'
import MediaCard from '../components/MediaCard'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loading.lottie'
import getStartedAnimation from '../lottie/getStarted.lottie'
import notFoundAnimation from '../lottie/notFound.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { setResult } from '../redux/slices/serachSlice'
import { setHasMore, setNextPhotoPage } from '../redux/slices/infiniteScrolling'
import { fetchMediaData } from '../utils/dataFetcher'

const Photos = () => {

    const dispatch = useDispatch()

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)
    const collectionArray = useSelector(state => state.collection.collectionArray)

    const hasMore = useSelector(state => state.scrolling.hasMore)
    const photoPage = useSelector(state => state.scrolling.photoPage)

    const sentinelRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)

    // Use refs to avoid stale closures in observer callback
    const latestData = useRef({ result, photoPage, collectionArray })
    useEffect(() => {
        latestData.current = { result, photoPage, collectionArray }
    }, [result, photoPage, collectionArray])


    useEffect(() => {
        const loadMore = async () => {
            if (isFetching || !hasMore || !query || currentTab !== 'photos') return

            const currentPage = latestData.current.photoPage
            if (currentPage === 0) return // Skip initial load

            setIsFetching(true)
            try {
                const { data } = await fetchMediaData(query, 'photos', latestData.current.collectionArray, currentPage + 1)

                if (data.length < 20) {
                    dispatch(setHasMore(false))
                }

                dispatch(setResult([...latestData.current.result, ...data]))
                dispatch(setNextPhotoPage())
            } catch (error) {
                console.error('Error loading photos:', error)
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
        <div className='relative w-screen mt-12 px-4 md:px-20 grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-8 gap-x-4'>
            {loading && currentTab === 'photos'
                ?
                <div className="w-screen h-[50vh] flex justify-center items-center gap-3 -translate-x-4 md:-translate-x-20">
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-32 h-32 md:w-56 md:h-56'
                    />
                </div>
                : result.length === 0
                    ? query === ''
                        ?
                        <div className="w-screen h-[50vh] flex flex-col justify-center items-center -translate-x-4 md:-translate-x-20">
                            <DotLottieReact
                                src={getStartedAnimation}
                                loop
                                autoplay
                                className='h-48 md:h-80'
                            />
                        </div>
                        :
                        <div className="w-screen h-[50vh] flex justify-center items-center -translate-x-4 md:-translate-x-20">
                            <DotLottieReact
                                src={notFoundAnimation}
                                autoplay
                                className='w-48 h-48 md:w-70 md:h-70'
                            />
                        </div>
                    :
                    result.map((photo, idx) => (
                        photo?.urls?.regular && (
                            <MediaCard key={idx} id={photo.id} isSaved={photo.isAdded} src={photo.urls.regular} alt={photo.alt_description} />
                        )
                    ))

            }
            <div ref={sentinelRef} className="absolute bottom-0 translate-y-full left-0 w-full h-20 flex justify-center items-center">
                {isFetching &&
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        className='w-24 h-24 md:w-40 md:h-40'
                    />
                }
            </div>
        </div >
    )
}

export default Photos