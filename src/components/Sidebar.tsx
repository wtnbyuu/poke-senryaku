'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchBox } from './SearchBox'

interface PageMeta { slug: string; title: string }

export function Sidebar({ pages }: { pages: PageMeta[] }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navContent = (
    <>
      <SearchBox />
      <nav className="sidebar-nav">
        <Link href="/"
          className={pathname === '/' ? 'is-active' : ''}
          onClick={() => setMobileOpen(false)}>
          🏠 トップページ
        </Link>
        {pages.map(p => (
          <Link key={p.slug}
            href={`/wiki/${p.slug}`}
            className={pathname === `/wiki/${p.slug}` ? 'is-active' : ''}
            onClick={() => setMobileOpen(false)}>
            {p.title}
          </Link>
        ))}
        <div style={{ borderTop: '1px solid var(--line)', marginTop: '12px', paddingTop: '12px' }}>
          <Link href="/privacy" className="text-xs" style={{ color: 'var(--muted)' }}
            onClick={() => setMobileOpen(false)}>
            プライバシーポリシー
          </Link>
        </div>
      </nav>
    </>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block sticky top-20 p-4"
        style={{ borderRadius: 'var(--radius-lg)', background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
        {navContent}
      </aside>

      {/* Mobile hamburger */}
      <button
        className="fixed top-3 right-4 z-50 md:hidden text-2xl"
        style={{ color: 'var(--text)' }}
        onClick={() => setMobileOpen(o => !o)}
        aria-label="メニューを開く">
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 z-50 p-5 pt-16 transform transition-transform md:hidden overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-lg)' }}>
        {navContent}
      </aside>
    </>
  )
}
