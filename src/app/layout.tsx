import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { getAllWikiMeta } from '@/lib/wiki'

export const metadata: Metadata = {
  title: 'ポケ戦略 Wiki — ポケモン対戦ガチ勢に追いつくための完全ガイド',
  description: 'タイプ相性・育成・構築・選出の基礎から、受けループ崩し・耐久調整・チャンピオンズ移行まで。ポケモン対戦を体系的に学べるWikiです。',
  openGraph: {
    title: 'ポケ戦略 Wiki',
    description: 'ポケモン対戦ガチ勢に追いつくための完全ガイド',
    url: 'https://poke-senryaku.com',
    siteName: 'ポケ戦略 Wiki',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = getAllWikiMeta()

  return (
    <html lang="ja">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
        )}
      </head>
      <body>
        <header className="sticky top-0 z-40 border-b" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
          <div style={{ width: 'min(1180px, calc(100% - 32px))', margin: '0 auto' }} className="flex items-center justify-between py-3">
            <a href="/" className="font-black text-xl tracking-tight" style={{ color: 'var(--red)' }}>
              ⚔️ ポケ戦略
            </a>
          </div>
        </header>

        <div style={{ width: 'min(1180px, calc(100% - 32px))', margin: '0 auto' }} className="mt-6">
          <div className="md:grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
            <div className="hidden md:block">
              <Sidebar pages={pages} />
            </div>
            <main className="min-w-0 pb-12">
              {children}
            </main>
          </div>
          <div className="md:hidden">
            <Sidebar pages={pages} />
          </div>
        </div>
      </body>
    </html>
  )
}
