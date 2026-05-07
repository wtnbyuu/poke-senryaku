'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface SearchItem {
  slug: string
  title: string
  headings: string[]
}

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then((data: SearchItem[]) => {
        setFuse(new Fuse(data, {
          keys: ['title', 'headings'],
          threshold: 0.3,
        }))
      })
  }, [])

  useEffect(() => {
    if (!fuse || query.length < 1) { setResults([]); setOpen(false); return }
    const res = fuse.search(query).slice(0, 5).map(r => r.item)
    setResults(res)
    setOpen(res.length > 0)
  }, [query, fuse])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="検索..."
        className="w-full px-3 py-2 rounded text-black text-sm"
      />
      {open && (
        <ul className="absolute top-full left-0 right-0 bg-white text-black rounded shadow-lg z-50 mt-1">
          {results.map(r => (
            <li key={r.slug}>
              <button
                onClick={() => { router.push(`/wiki/${r.slug}`); setQuery(''); setOpen(false) }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
              >
                {r.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
