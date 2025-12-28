import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import notFoundAnimation from '../lottie/404.lottie'

const NotFound404 = () => {
    return (
        <div className="inset-0 fixed overflow-hidden flex justify-center items-center">
            <DotLottieReact
                src={notFoundAnimation}
                loop
                autoplay
                className='h-170 translate-y-18'
            />
        </div>
    )
}

export default NotFound404