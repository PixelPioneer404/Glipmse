import React from 'react'
import SearchBar from '../components/SearchBar'
import TabLinks from '../components/TabLinks'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className="relative w-full flex justify-start items-center flex-col gap-5 pb-16">
            <div
                style={{
                    background: 'linear-gradient(to bottom, black 60%, transparent)'
                }}
                className="fixed top-16 flex flex-col justify-center items-center gap-6 z-999 w-screen pb-25">
                <SearchBar />
                <TabLinks />
            </div>
            <div className="mt-30">
                <Outlet />
            </div>
        </div>
    )
}

export default Home