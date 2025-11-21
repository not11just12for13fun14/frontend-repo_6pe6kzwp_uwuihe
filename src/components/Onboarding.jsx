import React, { useState } from 'react'

export default function Onboarding() {
  const [form, setForm] = useState({ name: '', type: 'website', url: '', region: 'auto' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${backend}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create resource')
      const data = await res.json()
      setMessage(`Added “${data.name}” for monitoring.`)
      setForm({ name: '', type: 'website', url: '', region: 'auto' })
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="onboarding" className="bg-black py-16 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-2xl font-semibold">Add your first resource</h2>
        <p className="mt-2 text-center text-white/70">Set up monitoring in seconds. Minimal inputs, powerful defaults.</p>
        <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-white/80">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none ring-emerald-400/30 focus:ring" placeholder="My API" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <option value="website">Website</option>
              <option value="api">API</option>
              <option value="server">Server</option>
              <option value="database">Database</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Region</label>
            <select name="region" value={form.region} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <option value="auto">Auto</option>
              <option value="us-east">US East</option>
              <option value="eu-west">EU West</option>
              <option value="ap-south">AP South</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-white/80">URL or Connection</label>
            <input name="url" value={form.url} onChange={handleChange} required className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none ring-emerald-400/30 focus:ring" placeholder="https://api.example.com/health" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60">
              {loading ? 'Adding…' : 'Add resource'}
            </button>
            {message && <p className="text-sm text-white/80">{message}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
