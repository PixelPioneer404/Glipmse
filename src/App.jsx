import React, { useEffect } from 'react'
import Header from './components/Header'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Photos from './tabs/Photos'
import Videos from './tabs/Videos'
import Gifs from './tabs/Gifs'
import Collections from './pages/Collections'
import NotFound404 from './pages/NotFound404'
import { useDispatch, useSelector } from 'react-redux'
import { setTab } from './redux/slices/serachSlice'
import ViewImageModal from './components/ViewImageModal'

const App = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentTab = useSelector(state => state.search.tab)

  useEffect(() => {
    // On initial load only, sync tab with URL
    if (location.pathname === '/videos') {
      dispatch(setTab('videos'))
    }
    else if (location.pathname === '/gifs') {
      dispatch(setTab('gifs'))
    }
    else if (location.pathname === '/' || location.pathname === '/photos') {
      dispatch(setTab('photos'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // When navigating to home from other pages, restore the tab state
    if (location.pathname === '/' && currentTab !== 'photos') {
      if (currentTab === 'videos') {
        navigate('/videos', { replace: true })
      } else if (currentTab === 'gifs') {
        navigate('/gifs', { replace: true })
      }
    }
  }, [location.pathname, currentTab, navigate])

  return (
    <>
      <div className="relative w-screen">
        <div className="fixed inset-0 bg-black -z-1"></div>
        <ViewImageModal />
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
    </>
  )
}

export default App