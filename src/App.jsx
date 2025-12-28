import React from 'react'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Photos from './tabs/Photos'
import Videos from './tabs/Videos'
import Gifs from './tabs/Gifs'
import Collections from './pages/Collections'

const App = () => {
  return (
    <div className="relative w-screen">
      <div className="fixed inset-0 bg-black -z-1"></div>
      <Header />
      <div className="w-screen pt-16">
        <Routes>
          <Route path='/' element={<Home />} >
            <Route index element={<Photos />} />
            <Route path='photos' element={<Photos />} />
            <Route path='videos' element={<Videos />} />
            <Route path='gifs' element={<Gifs />} />
          </Route>
          <Route path='/collections' element={<Collections />} />
        </Routes>
      </div>
    </div>
  )
}

export default App