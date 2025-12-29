import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MediaCard from '../components/MediaCard'
import loadingAnimation from '../lottie/loading.lottie'
import getStartedAnimation from '../lottie/getStarted.lottie'
import notFoundAnimation from '../lottie/notFound.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { setResult } from '../redux/slices/serachSlice'
import { getGifs } from '../api/mediaApi'
import { setHasMore, setTenorNext } from '../redux/slices/infiniteScrolling'

const Gifs = () => {

    const dispatch = useDispatch()

    const query = useSelector(state => state.search.query)
    const result = useSelector(state => state.search.result)
    const loading = useSelector(state => state.search.loading)
    const currentTab = useSelector(state => state.search.tab)

    const hasMore = useSelector(state => state.scrolling.hasMore)
    const tenorNext = useSelector(state => state.scrolling.tenorNext)

    const sentinelRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)

    const latestData = useRef({ result, tenorNext })
    useEffect(() => {
        latestData.current = { result, tenorNext }
    }, [result, tenorNext])


    useEffect(() => {
        const loadMore = async () => {
            if (isFetching || !hasMore || !query || currentTab !== 'gifs') return

            const currentNext = latestData.current.tenorNext
            if (!currentNext) return // Skip if no next token

            setIsFetching(true)
            try {
                const { results, next } = await getGifs(query, currentNext)

                if (!next || results.length === 0) {
                    dispatch(setHasMore(false))
                }

                dispatch(setResult([...latestData.current.result, ...results]))
                dispatch(setTenorNext(next))
            } catch (error) {
                console.error('Error loading gifs:', error)
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
            {loading && currentTab === 'gifs'
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
                    result.map((gif, idx) => (
                        gif?.media_formats?.gif?.url && (
                            <MediaCard key={idx} src={gif.media_formats.gif.url} />
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

export default Gifs