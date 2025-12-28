import React from 'react'
import SearchBar from '../components/SearchBar'
import TabLinks from '../components/TabLinks'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className="w-full flex justify-start items-center flex-col gap-5 pb-16">
            <div className="flex flex-col justify-center items-center gap-6">
                <SearchBar />
                <TabLinks />
            </div>
            <Outlet />
        </div>
    )
}

export default Home