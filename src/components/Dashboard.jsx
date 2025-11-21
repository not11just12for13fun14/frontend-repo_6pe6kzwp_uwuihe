import React, { useEffect, useMemo, useState } from 'react'
import { Plus, RefreshCw, Globe2, Link as LinkIcon, Server, Database, Activity, Search } from 'lucide-react'

const TYPE_ICON = {
  website: Globe2,
  api: LinkIcon,
  server: Server,
  database: Database,
  service: Activity,
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ name: '', type: 'website', url: '', region: 'auto' })

  const fetchResources = async (silent = false) => {
    if (!silent) setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/resources`)
      if (!res.ok) throw new Error('Failed to load resources')
      const data = await res.json()
      setResources(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
    const id = setInterval(() => fetchResources(true), 10000)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return resources
    const q = query.toLowerCase()
    return resources.filter(r => [r.name, r.type, r.region, r.url].filter(Boolean).some(v => String(v).toLowerCase().includes(q)))
  }, [resources, query])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const addResource = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      const res = await fetch(`${backend}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create resource')
      setForm({ name: '', type: 'website', url: '', region: 'auto' })
      await fetchResources(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <div className="text-lg font-semibold">FluxWatch</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-64 rounded-lg border border-white/10 bg-black/40 pl-9 pr-3 py-2 text-sm outline-none ring-emerald-400/30 focus:ring"
              />
            </div>
            <button onClick={() => fetchResources()} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
              <RefreshCw size={16} className={cx('transition', loading && 'animate-spin')} />
              Refresh
            </button>
            <button onClick={() => document.getElementById('add-panel').showModal()} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black hover:bg-emerald-400">
              <Plus size={16} />
              Add resource
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Overview</h1>
        <p className="mb-8 text-white/70">Your monitored resources at a glance. Add endpoints, services, or servers and see them update in real time.</p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-12 bg-white/5 px-4 py-3 text-xs font-medium uppercase tracking-wide text-white/60">
            <div className="col-span-4 sm:col-span-4">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2 hidden sm:block">Region</div>
            <div className="col-span-4 sm:col-span-4">URL</div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-white/60">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">No resources yet</div>
              <p className="max-w-sm text-white/60">Add your first resource to begin monitoring uptime and latency. You can add websites, APIs, servers, databases, or any custom service.</p>
              <button onClick={() => document.getElementById('add-panel').showModal()} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400">Add resource</button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {filtered.map((r) => {
                const Icon = TYPE_ICON[r.type] || Activity
                return (
                  <li key={r.id || r._id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-white/5">
                    <div className="col-span-4 flex items-center gap-3 sm:col-span-4">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                        <Icon size={16} />
                      </span>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-white/50">{r.id?.slice?.(0, 8) || ''}</div>
                      </div>
                    </div>
                    <div className="col-span-2 capitalize text-white/80">{r.type}</div>
                    <div className="col-span-2 hidden text-white/70 sm:block">{r.region || 'auto'}</div>
                    <div className="col-span-4 truncate text-emerald-300 underline/50">
                      <a href={r.url} target="_blank" rel="noreferrer" className="hover:underline">{r.url}</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-6 text-sm text-white/60">
          Tip: Use the search bar to quickly filter by name, type, region, or URL.
        </div>
      </main>

      {/* Add resource panel */}
      <dialog id="add-panel" className="backdrop:bg-black/70 rounded-xl">
        <form method="dialog" className="absolute right-0 top-0 h-full w-full sm:static sm:h-auto sm:w-[36rem]">
          <div className="rounded-2xl border border-white/10 bg-black p-6 text-white sm:mx-auto sm:my-10">
            <div className="mb-4 text-lg font-semibold">Add resource</div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button className="rounded-lg border border-white/15 px-4 py-2 text-sm" onClick={() => document.getElementById('add-panel').close()}>Cancel</button>
              <button disabled={adding} onClick={addResource} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60">
                {adding ? 'Adding…' : 'Add'}
              </button>
            </div>
          </div>
        </form>
      </dialog>

      <footer className="border-t border-white/10 bg-black py-8 text-white">
        <div className="mx-auto max-w-7xl px-6 text-sm text-white/60">© 2025 FluxWatch</div>
      </footer>
    </div>
  )
}
