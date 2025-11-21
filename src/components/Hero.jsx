import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 pb-16 text-center sm:px-8">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live network insights
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Monitor network resources with clarity
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base text-emerald-100/80 md:text-lg">
          A modern, minimal platform for uptime, latency, and performance analytics. Zero noise. Actionable signals.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#onboarding" className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400">Start monitoring</a>
          <a href="#features" className="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">See features</a>
        </div>
      </div>
    </section>
  )
}
