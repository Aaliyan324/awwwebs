import { useState } from 'react'
import './App.css'
import Hero from './sections/Hero'
import AboutUS from './sections/AboutUS'
import Marquee from './sections/Marquee'
import Work from './sections/Work'

function App() {
  return (
    <>
    <Hero/>
    <AboutUS/>
    <Marquee/>
    <Work/>
    </>
  )
}

export default App