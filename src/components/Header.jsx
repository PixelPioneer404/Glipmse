import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'

const Header = () => {
    const location = useLocation()
    const isHomeActive = location.pathname === '/' || location.pathname === '/videos' || location.pathname === '/gifs' || location.pathname === '/photos'
    const is404Page = location.pathname !== '/' && location.pathname !== '/collections' && location.pathname !== '/videos' && location.pathname !== '/gifs' && location.pathname !== '/photos'
    
    return (
        <div className="fixed top-0 left-0 z-999 w-screen h-16 bg-black flex justify-between items-center px-10 py-5">
            <h1 className="font-bold text-2xl text-white/80">Glipmse</h1>
            {is404Page ? (
                <NavLink
                    to='/'
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400/80 hover:bg-orange-500/30 transition-all"
                >
                    <Home size={18} />
                    <span className="text-base font-medium">Return to Home</span>
                </NavLink>
            ) : (
                <ul className="list-none flex gap-8 justify-center items-center">
                    <NavLink
                        to='/'
                        className={isHomeActive ? 'text-base font-medium text-orange-400/60' : 'text-base font-medium text-white/60'}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/collections'
                        className={({isActive}) => isActive ? 'text-base font-medium text-orange-400/60' : 'text-base font-medium text-white/60'}
                    >
                        Collection
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default Header