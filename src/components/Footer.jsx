import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-white/60">© 2025 FluxWatch. All rights reserved.</p>
        <nav className="flex items-center gap-6 text-sm text-white/70">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#onboarding" className="hover:text-white">Get Started</a>
          <a href="/test" className="hover:text-white">System Check</a>
        </nav>
      </div>
    </footer>
  )
}
