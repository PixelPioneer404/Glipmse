import React, { useEffect, useRef, useState } from 'react'
import MediaCard from '../components/MediaCard'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loading.lottie'
import getStartedAnimation from '../lottie/getStarted.lottie'
import notFoundAnimation from '../lottie/notFound.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { setResult } from '../redux/slices/serachSlice'
import { getPhotos } from '../api/mediaApi'
import { setHasMore, setNextPhotoPage } from '../redux/slices/infiniteScrolling'

const Photos = () => {

    const dispatch = useDispatch()

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)

    const hasMore = useSelector(state => state.scrolling.hasMore)
    const photoPage = useSelector(state => state.scrolling.photoPage)

    const sentinelRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)

    // Use refs to avoid stale closures in observer callback
    const latestData = useRef({ result, photoPage })
    useEffect(() => {
        latestData.current = { result, photoPage }
    }, [result, photoPage])


    useEffect(() => {
        const loadMore = async () => {
            if (isFetching || !hasMore || !query || currentTab !== 'photos') return

            const currentPage = latestData.current.photoPage
            if (currentPage === 0) return // Skip initial load

            setIsFetching(true)
            try {
                const data = await getPhotos(query, currentPage + 1)

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
    }, [hasMore, query, currentTab, isFetching])

    return (
        <div className='relative w-screen mt-12 px-20 grid grid-cols-5 gap-y-8'>
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
                            <MediaCard key={idx} id={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
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
        </div >
    )
}

export default Photos