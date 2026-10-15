import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useApplySettings } from './state/settings'
import Library from './pages/Library'
import StoryHome from './pages/StoryHome'
import Reader from './pages/Reader'
import Notebook from './pages/Notebook'
import NotFound from './pages/NotFound'
import GameHome from './pages/GameHome'
import GamePlay from './pages/GamePlay'
import PwaPrompts from './components/PwaPrompts'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // The reader restores its own scroll position.
    if (!pathname.includes('/read/') && !pathname.endsWith('/play')) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useApplySettings()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/story/:storyId" element={<StoryHome />} />
        <Route path="/story/:storyId/read/:chapterId" element={<Reader />} />
        <Route path="/story/:storyId/notebook" element={<Notebook />} />
        <Route path="/game/:gameId" element={<GameHome />} />
        <Route path="/game/:gameId/play" element={<GamePlay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PwaPrompts />
    </>
  )
}
