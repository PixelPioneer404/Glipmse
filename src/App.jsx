import React, { useEffect } from 'react'
import Header from './components/Header'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Photos from './tabs/Photos'
import Videos from './tabs/Videos'
import Gifs from './tabs/Gifs'
import Collections from './pages/Collections'
import NotFound404 from './pages/NotFound404'
import { useDispatch } from 'react-redux'
import { setTab } from './redux/slices/serachSlice'

const App = () => {

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/videos') dispatch(setTab('videos'))
    else if (location.pathname === '/gifs') dispatch(setTab('gifs'))
    else if (location.pathname === '/' || location.pathname === '/photos') dispatch(setTab('photos'))
  }, [])

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
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </div>
  )
}

export default App