import { Download, Pointer, X, Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loadingForMedia.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import gsap from 'gsap'
import { setIsOpen } from '../redux/slices/openMediaSlice'
import { download } from '../utils/downloadContent'
import { setResult } from '../redux/slices/serachSlice'
import { setCollectionArray } from '../redux/slices/collections'
import { useLocation } from 'react-router-dom'

const ViewImageModal = () => {

    const [src, setSrc] = useState(null)
    const [isDownloading, setIsDownloading] = useState(false)

    const [isMediaLoaded, setIsMediaLoaded] = useState(false)
    const currentTab = useSelector(state => state.search.tab)
    const result = useSelector(state => state.search.result)
    const collectionArray = useSelector(state => state.collection.collectionArray)

    const location = useLocation()
    const isCollectionsPage = location.pathname === '/collections'

    // Use collectionArray on Collections page, otherwise use result
    const dataSource = isCollectionsPage ? collectionArray : result

    const overlayRef = useRef(null)
    const actionsRef = useRef(null)
    const imgContainerRef = useRef(null)
    const containerRef = useRef(null)

    const clickedId = useSelector(state => state.viewContent.clickedId)
    const isOpen = useSelector(state => state.viewContent.isOpen)

    const dispatch = useDispatch()

    // Check if current item is in collection
    const isInCollection = collectionArray.some(item => item.id === clickedId)

    function openImg() {
        gsap.to(containerRef.current, {
            pointerEvents: 'auto'
        })
        gsap.to(overlayRef.current, {
            opacity: 1,
            ease: 'power1.inOut',
        })
        gsap.to(imgContainerRef.current, {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.7)"
        })
        gsap.to(actionsRef.current, {
            opacity: 1,
        })

        let item = dataSource.find(photo => photo.id === clickedId)
        if (!item) return

        // Use item's type field if available, otherwise fall back to currentTab
        const mediaType = item.type || currentTab

        if (mediaType === 'photos') {
            setSrc(item.urls.regular)
        } else if (mediaType === 'videos') {
            setSrc(item.video_files[0].link)
        } else if (mediaType === 'gifs') {
            setSrc(item.media_formats.gif.url)
        }
    }

    function closeImg() {
        gsap.to(containerRef.current, {
            pointerEvents: 'none'
        })
        gsap.to(overlayRef.current, {
            opacity: 0,
            ease: 'power1.inOut'
        })
        gsap.to(imgContainerRef.current, {
            scale: 0.6,
            opacity: 0,
            ease: "back.in(1.7)"
        })
        gsap.to(actionsRef.current, {
            opacity: 0
        })

        setTimeout(() => {
            setSrc(null)
        }, 400)
    }

    useEffect(() => {
        if (isOpen) openImg()
        else closeImg()
    }, [isOpen])

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                dispatch(setIsOpen(false))
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    function getExtension(currentTab) {
        if (currentTab === 'photos') return 'jpg'
        else if (currentTab === 'videos') return 'mp4'
        else if (currentTab === 'gifs') return 'gif'
    }

    async function handleDownload() {
        setIsDownloading(true)
        await download(src, currentTab, getExtension(currentTab), (status) => {
            if (status === 'complete' || status === 'error') {
                setIsDownloading(false)
            }
        })
    }

    return (
        <div ref={containerRef} className="w-screen h-screen pointer-events-none fixed flex justify-center items-center z-9998 px-4 md:px-[10vw] py-4 md:py-[10vh]">
            <div ref={overlayRef} onClick={() => dispatch(setIsOpen(false))} className="opacity-0 absolute inset-0 bg-black/20 backdrop-blur-xl" />
            <div ref={actionsRef} className="opacity-0 size-full relative z-9999 rounded-2xl md:rounded-4xl flex flex-col">
                {/* Desktop buttons - top right */}
                <div className="hidden md:flex absolute top-2 right-0 translate-x-[150%] flex-col justify-center items-center gap-3 *:cursor-pointer *:transition-all *:duration-300 *:ease-in-out">
                    <button
                        onClick={() => dispatch(setIsOpen(false))} className="w-12 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-110 active:scale-95">
                        <X size={24} className='pointer-events-none' />
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-12 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                        {isDownloading ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <Download size={24} />
                        )}
                    </button>
                    <button
                        onClick={() => {
                            // Find the item in result or collectionArray
                            const item = result.find(item => item.id === clickedId) || collectionArray.find(item => item.id === clickedId)
                            
                            if (item) {
                                // Toggle collection state
                                if (!isInCollection) {
                                    // Add to collection
                                    let newArray = [...collectionArray, item]
                                    dispatch(setCollectionArray(newArray))
                                    localStorage.setItem('collectionData', JSON.stringify(newArray))
                                } else {
                                    // Remove from collection
                                    let newArray = collectionArray.filter(collectionEl => collectionEl.id !== clickedId)
                                    dispatch(setCollectionArray(newArray))
                                    localStorage.setItem('collectionData', JSON.stringify(newArray))
                                }
                                
                                // Update result array to sync isAdded state if not on Collections page
                                if (!isCollectionsPage && result.length > 0) {
                                    const modifiedResult = result.map(resultItem => {
                                        return resultItem.id === clickedId
                                            ? { ...resultItem, isAdded: !resultItem.isAdded }
                                            : resultItem
                                    })
                                    dispatch(setResult(modifiedResult))
                                }
                            }
                        }}
                        className="w-12 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-110 active:scale-95">
                        {isInCollection
                            ? <i className="ri-heart-fill translate-y-0.5 text-2xl text-red-600/80"></i>
                            : <i className="ri-heart-line translate-y-0.5 text-2xl text-black/80"></i>
                        }
                    </button>
                </div>
                <div className="pointer-events-none absolute inset-0 z-9999 flex justify-center items-center">
                    {!isMediaLoaded &&
                        <DotLottieReact
                            src={loadingAnimation}
                            loop
                            autoplay
                            className='w-32 h-32 md:w-46 md:h-46'
                        />
                    }
                </div>
                <div ref={imgContainerRef} className="scale-60 opacity-0 w-auto h-full flex flex-col justify-center items-center">
                    <div className="flex-1 flex justify-center items-center p-1.5 md:p-2 bg-white/80 rounded-2xl md:rounded-3xl w-full">
                        {(() => {
                            const item = dataSource.find(el => el.id === clickedId)
                            const mediaType = item?.type || currentTab

                            return (mediaType === 'photos' || mediaType === 'gifs')
                                ? <img onLoad={() => setIsMediaLoaded(true)} src={src} className={`${isMediaLoaded ? 'block' : 'hidden'} h-full object-center object-contain rounded-xl md:rounded-[20px] group-hover:scale-110 transition-all duration-300 ease-in-out`} />
                                : <video onLoadedData={() => setIsMediaLoaded(true)} src={src} autoPlay muted loop className={`${isMediaLoaded ? 'block' : 'hidden'} h-full object-center rounded-xl md:rounded-[20px] object-contain group-hover:scale-110 transition-all duration-300 ease-in-out`}></video>
                        })()}
                    </div>
                    
                    {/* Mobile buttons - bottom */}
                    <div className="md:hidden flex justify-center items-center gap-4 mt-4 w-full relative z-[10000]">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(setIsOpen(false))
                            }} 
                            className="flex-1 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-105 active:scale-95 transition-all">
                            <X size={20} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDownload()
                            }}
                            disabled={isDownloading}
                            className="flex-1 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all">
                            {isDownloading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <Download size={20} />
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                const item = result.find(item => item.id === clickedId) || collectionArray.find(item => item.id === clickedId)
                                
                                if (item) {
                                    if (!isInCollection) {
                                        let newArray = [...collectionArray, item]
                                        dispatch(setCollectionArray(newArray))
                                        localStorage.setItem('collectionData', JSON.stringify(newArray))
                                    } else {
                                        let newArray = collectionArray.filter(collectionEl => collectionEl.id !== clickedId)
                                        dispatch(setCollectionArray(newArray))
                                        localStorage.setItem('collectionData', JSON.stringify(newArray))
                                    }
                                    
                                    if (!isCollectionsPage && result.length > 0) {
                                        const modifiedResult = result.map(resultItem => {
                                            return resultItem.id === clickedId
                                                ? { ...resultItem, isAdded: !resultItem.isAdded }
                                                : resultItem
                                        })
                                        dispatch(setResult(modifiedResult))
                                    }
                                }
                            }}
                            className="flex-1 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-105 active:scale-95 transition-all">
                            {isInCollection
                                ? <i className="ri-heart-fill text-xl text-red-600/80"></i>
                                : <i className="ri-heart-line text-xl text-black/80"></i>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewImageModal