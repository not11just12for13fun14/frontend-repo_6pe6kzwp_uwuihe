import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Onboarding from './components/Onboarding'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <Onboarding />
      <Footer />
    </div>
  )
}

export default App
