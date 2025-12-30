import { Download, Pointer, X, Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadingAnimation from '../lottie/loadingForMedia.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import gsap from 'gsap'
import { setIsOpen } from '../redux/slices/openMediaSlice'
import { download } from '../utils/downloadContent'

const ViewImageModal = ({ isAdded }) => {

    const [src, setSrc] = useState(null)
    const [isDownloading, setIsDownloading] = useState(false)

    const [isMediaLoaded, setIsMediaLoaded] = useState(false)
    const currentTab = useSelector(state => state.search.tab)
    const result = useSelector(state => state.search.result)

    const overlayRef = useRef(null)
    const actionsRef = useRef(null)
    const imgContainerRef = useRef(null)
    const containerRef = useRef(null)

    const clickedId = useSelector(state => state.viewContent.clickedId)
    const isOpen = useSelector(state => state.viewContent.isOpen)

    const dispatch = useDispatch()

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

        let url = result.filter(photo => photo.id === clickedId)
        if (currentTab === 'photos') {
            setSrc(url[0].urls.regular)
        } else if (currentTab === 'videos') {
            setSrc(url[0].video_files[0].link)
        } else {
            setSrc(url[0].media_formats.gif.url)
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
        await download(src, getExtension(currentTab), (status) => {
            if (status === 'complete' || status === 'error') {
                setIsDownloading(false)
            }
        })
    }

    return (
        <div ref={containerRef} className="w-screen h-screen pointer-events-none fixed flex justify-center items-center z-9998 px-[10vw] py-[10vh]">
            <div ref={overlayRef} className="opacity-0 absolute inset-0 bg-black/20 backdrop-blur-xl" />
            <div ref={actionsRef} className="opacity-0 size-full relative z-9999 rounded-4xl">
                <div className="absolute top-2 right-0 translate-x-[150%] flex flex-col justify-center items-center gap-3 *:cursor-pointer *:transition-all *:duration-300 *:ease-in-out">
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
                    <button className="w-12 h-12 flex justify-center items-center bg-white/80 rounded-full hover:scale-110 active:scale-95">
                        {isAdded
                            ? <i className="ri-heart-fill translate-y-0.5 text-2xl text-red-600/80"></i>
                            : <i className="ri-heart-line translate-y-0.5 text-2xl text-black/80"></i>
                        }
                    </button>
                </div>
                <div className="absolute inset-0 z-9999 flex justify-center items-center">
                    {!isMediaLoaded &&
                        <DotLottieReact
                            src={loadingAnimation}
                            loop
                            autoplay
                            className='w-46 h-46'
                        />
                    }
                </div>
                <div ref={imgContainerRef} className="scale-60 opacity-0 w-auto h-full flex justify-center items-center p-2 bg-white/80 rounded-3xl">
                    {(currentTab === 'photos' || currentTab === 'gifs')
                        ? <img onLoad={() => setIsMediaLoaded(true)} src={src} className={`${isMediaLoaded ? 'block' : 'hidden'} h-full object-center object-contain rounded-[20px] group-hover:scale-110 transition-all duration-300 ease-in-out`} />
                        : <video onLoadedData={() => setIsMediaLoaded(true)} src={src} autoPlay muted loop className={`${isMediaLoaded ? 'block' : 'hidden'} h-full object-center rounded-[20px] object-contain group-hover:scale-110 transition-all duration-300 ease-in-out`}></video>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewImageModal