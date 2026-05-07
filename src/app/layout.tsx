import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { getAllWikiMeta } from '@/lib/wiki'

export const metadata: Metadata = {
  title: 'ポケ戦略 Wiki',
  description: 'ポケモン対戦ガチ勢に追いつくための完全ガイド',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = getAllWikiMeta()

  return (
    <html lang="ja">
      <body>
        <header style={{ backgroundColor: 'var(--color-primary)' }} className="text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <a href="/" className="font-bold text-xl tracking-wide">
            ⚔️ ポケ戦略 Wiki
          </a>
        </header>

        <div className="flex min-h-screen">
          <Sidebar pages={pages} />
          <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
