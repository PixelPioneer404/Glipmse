import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Menu, X } from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const isHomeActive = location.pathname === '/' || location.pathname === '/videos' || location.pathname === '/gifs' || location.pathname === '/photos'
    const is404Page = location.pathname !== '/' && location.pathname !== '/collections' && location.pathname !== '/videos' && location.pathname !== '/gifs' && location.pathname !== '/photos'
    
    return (
        <>
            <div className="fixed top-0 left-0 z-999 w-screen h-16 bg-black flex justify-between items-center px-4 md:px-10 py-5">
                <h1 className="font-bold text-xl md:text-2xl text-white/80">Glimpse</h1>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white/80 hover:text-white transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Desktop Navigation */}
                {is404Page ? (
                    <NavLink
                        to='/'
                        className="hidden md:flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400/80 hover:bg-orange-500/30 transition-all"
                    >
                        <Home size={18} />
                        <span className="text-base font-medium">Return to Home</span>
                    </NavLink>
                ) : (
                    <ul className="hidden md:flex list-none gap-8 justify-center items-center">
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

            {/* Mobile Side Tray */}
            <div 
                className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-slate-900 z-9999 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } shadow-2xl`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
                        <h2 className="font-bold text-lg text-white/80">Glimpse</h2>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-6 py-8">
                        <ul className="flex flex-col gap-6">
                            <NavLink
                                to='/'
                                onClick={() => setIsMenuOpen(false)}
                                className={isHomeActive ? 'text-lg font-medium text-orange-400/80' : 'text-lg font-medium text-white/60 hover:text-white/80 transition-colors'}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/collections'
                                onClick={() => setIsMenuOpen(false)}
                                className={({isActive}) => isActive ? 'text-lg font-medium text-orange-400/80' : 'text-lg font-medium text-white/60 hover:text-white/80 transition-colors'}
                            >
                                Collection
                            </NavLink>
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-white/10">
                        <p className="text-xs text-white/40 text-center">
                            Made with ❤️ by Rajbeer
                        </p>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-9998"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Header