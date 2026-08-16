import { useState } from 'react'
import './App.css'
import Hero from './sections/Hero'
import AboutUS from './sections/AboutUS'
import Marquee from './sections/Marquee'
import Work from './sections/Work'
import Pricing from './sections/Pricing'
import Contact from './Contact/Contact'
import Navbar from './Contact/Navbar'

function App() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutUS/>
    <Marquee/>
    <Work/>
    <Pricing/>
    <Contact/>
    </>
  )
}

export default App