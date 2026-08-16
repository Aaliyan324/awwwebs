import { useState, useRef } from 'react'
import './App.css'
import Hero from './sections/Hero'
import AboutUS from './sections/AboutUS'
import Marquee from './sections/Marquee'
import Work from './sections/Work'
import Pricing from './sections/Pricing'
import Contact from './Contact/Contact'
import Navbar from './Contact/Navbar'
import Preloader from './Contact/Preloader'

function App() {
  const [is3DLoading, setIs3DLoading] = useState(true)
  const [showPreloader, setShowPreloader] = useState(true)
  const heroTimelineRef = useRef(null)

  // Called when the Spline 3D canvas triggers onLoad in Hero
  const handle3DLoad = () => {
    setIs3DLoading(false)
  }

  // Called when the Preloader finishes its exit animation
  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    if (heroTimelineRef.current) {
      heroTimelineRef.current.play()
    }
  }

  return (
    <main className="relative bg-[var(--bg-primary)] overflow-x-hidden min-h-screen">
      {/* Fullscreen Cyberpunk Preloader */}
      {showPreloader && (
        <Preloader
          isLoading={is3DLoading}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero
        onSplineLoad={handle3DLoad}
        timelineRef={heroTimelineRef}
      />
      <AboutUS />
      <Marquee />
      <Work />
      <Pricing />
      <Contact />
    </main>
  )
}

export default App