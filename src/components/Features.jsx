import React from 'react'
import { BarChart3, ShieldCheck, Globe, BellRing } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    desc: 'Track uptime, response time, and error rates with second-level granularity.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Alerts',
    desc: 'Noise-free notifications powered by adaptive thresholds and incident grouping.',
  },
  {
    icon: Globe,
    title: 'Global Probing',
    desc: 'Measure from multiple regions to detect localized outages and routing issues.',
  },
  {
    icon: BellRing,
    title: 'Beautiful Status Pages',
    desc: 'Public or private pages that keep stakeholders informed during incidents.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative bg-black py-20 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
