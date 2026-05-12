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
      <nav>
        <Link href="/" className="block py-1 px-2 text-sm text-gray-300 hover:text-yellow-300 mb-2">
          🏠 トップページ
        </Link>
        <ul className="space-y-1">
          {pages.map(p => {
            const isActive = pathname === `/wiki/${p.slug}`
            return (
              <li key={p.slug}>
                <Link
                  href={`/wiki/${p.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-1 px-2 text-sm rounded transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  {p.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Link href="/privacy" className="block py-1 px-2 text-xs text-gray-500 hover:text-gray-300">
            プライバシーポリシー
          </Link>
        </div>
      </nav>
    </>
  )

  return (
    <>
      {/* デスクトップサイドバー */}
      <aside
        style={{ backgroundColor: 'var(--color-dark)' }}
        className="w-64 min-h-screen text-white p-4 hidden md:block flex-shrink-0"
      >
        {navContent}
      </aside>

      {/* モバイルハンバーガーボタン */}
      <button
        className="fixed top-3 right-4 z-50 md:hidden text-white text-2xl"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="メニューを開く"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* モバイルオーバーレイ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
      )}

      {/* モバイルサイドバー */}
      <aside
        style={{ backgroundColor: 'var(--color-dark)' }}
        className={`fixed top-0 left-0 h-full w-64 text-white p-4 z-50 transform transition-transform md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mt-12">
          {navContent}
        </div>
      </aside>
    </>
  )
}
