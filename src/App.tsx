import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import { initLenis } from './utils/lenis'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initLenis()
    
    // Hide splash screen after animation with cinematic delay
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 9500) // Added 1.5s delay after final text for smoother transition

    return () => {
      clearTimeout(timer)
      lenis?.destroy()
    }
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <>
      <Helmet>
        <title>Shoaib Khan - Content Creator & Entrepreneur</title>
        <meta name="description" content="Shoaib Khan - Content Creator, Video Editor, Director & Entrepreneur from Hyderabad. Co-Founder of HH." />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App