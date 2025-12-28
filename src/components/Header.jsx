import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    const isHomeActive = location.pathname === '/' || location.pathname === '/videos' || location.pathname === '/gifs' || location.pathname === '/photos'
    
    return (
        <div className="w-screen h-16 bg-slate-900 flex justify-between items-center px-10">
            <h1 className="font-bold text-2xl text-white/80">Glipmse</h1>
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
        </div>
    )
}

export default Header