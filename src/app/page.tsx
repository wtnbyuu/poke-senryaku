import { getAllWikiMeta } from '@/lib/wiki'
import Link from 'next/link'

export default function HomePage() {
  const pages = getAllWikiMeta()

  return (
    <div>
      <h1 style={{ color: 'var(--color-primary)' }} className="text-3xl font-bold mb-2">
        ⚔️ ポケ戦略 Wiki
      </h1>
      <p className="text-gray-600 mb-2">ガチ勢に追いつくための完全ガイド</p>
      <p className="text-sm text-gray-500 mb-8">
        対象: 世代共通の基礎知識 + SV（2022〜）+ ポケモンチャンピオンズ（2026年4月〜）
      </p>

      <div
        className="border-l-4 p-4 mb-8 rounded-r"
        style={{ borderColor: 'var(--color-primary)', backgroundColor: '#fff5f5' }}
      >
        <p className="text-sm leading-relaxed">
          ポケモン対戦で「ガチ勢に追いつく」には、まず3つの壁を越える必要があります。
          ①タイプ相性と素早さの基礎判断、②育成の型（種族値・性格・努力値）を正しく組む力、
          ③構築と選出の思考フレームです。本Wikiはこの3壁を10章で体系化しました。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map(page => (
          <Link
            key={page.slug}
            href={`/wiki/${page.slug}`}
            className="block border rounded-lg p-4 hover:border-red-500 transition-colors group"
          >
            <h2 className="font-bold text-base group-hover:text-red-600 mb-1">
              {page.title}
            </h2>
            {page.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{page.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
