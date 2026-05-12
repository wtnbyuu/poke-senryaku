import { getAllWikiMeta } from '@/lib/wiki'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポケ戦略 Wiki — ポケモン対戦ガチ勢に追いつくための完全ガイド',
  description: 'タイプ相性・育成・構築・選出の基礎から、受けループ崩し・耐久調整・チャンピオンズ移行まで。ポケモン対戦を体系的に学べるWikiです。',
}

const CHAPTER_TAGS: Record<string, string> = {
  '01-start-guide': '初心者向け',
  '02-type-matchup': '基礎',
  '03-training-checklist': '基礎',
  '04-damage-calc': '基礎',
  '05-team-building': '実践',
  '06-team-selection': '実践',
  '07-stall-breaking': '実践',
  '08-ev-spreads': 'リファレンス',
  '09-generations': 'リファレンス',
  '10-champions-migration': '最新情報',
  'appendix': 'リファレンス',
}

export default function HomePage() {
  const pages = getAllWikiMeta()

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ポケ戦略 Wiki',
        url: 'https://poke-senryaku.com',
      }) }} />

      {/* Hero */}
      <section className="hero">
        <div className="hero__badge">Pokémon Battle Strategy Wiki</div>
        <h1>ガチ勢に追いつくための<br />ポケモン対戦完全ガイド</h1>
        <p>タイプ相性、育成、構築、選出まで。初心者が対戦の考え方を体系的に学べる攻略Wikiです。</p>
        <div className="hero__actions">
          <Link href="/wiki/01-start-guide" className="btn btn--primary">30日ロードマップから始める</Link>
          <Link href="/wiki/02-type-matchup" className="btn btn--secondary">タイプ相性を見る</Link>
        </div>
      </section>

      {/* 3つの壁 */}
      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">First Goals</p>
          <h2>まず越えるべき3つの壁</h2>
          <p>対戦初心者が最初に理解すべきポイントを、順番に整理します。</p>
        </div>
        <div className="wall-grid">
          <article className="wall-card">
            <span className="wall-card__number">01</span>
            <h3>タイプ相性と素早さ</h3>
            <p>一方的に倒されないための基本判断を身につけます。</p>
          </article>
          <article className="wall-card">
            <span className="wall-card__number">02</span>
            <h3>育成の型</h3>
            <p>種族値・性格・努力値を理解し、役割に合った型を作ります。</p>
          </article>
          <article className="wall-card">
            <span className="wall-card__number">03</span>
            <h3>構築と選出</h3>
            <p>6体を組み、相手に合わせて3体を選ぶ考え方を学びます。</p>
          </article>
        </div>
      </section>

      {/* 10章カード */}
      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Guide Chapters</p>
          <h2>10章で学ぶポケモン対戦</h2>
          <p>基礎から実戦判断まで、順番に読み進められる構成です。</p>
        </div>
        <div className="guide-grid">
          {pages.map((page, i) => (
            <Link key={page.slug} href={`/wiki/${page.slug}`} className="guide-card">
              <span className="guide-card__number">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{page.title}</h3>
                {page.description && <p>{page.description}</p>}
              </div>
              {CHAPTER_TAGS[page.slug] && (
                <span className="guide-card__tag">{CHAPTER_TAGS[page.slug]}</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12" style={{ color: 'var(--muted)', fontSize: '13px' }}>
        <p>ポケ戦略 Wiki — ポケモン対戦を体系的に学ぶ</p>
        <p className="mt-1">ポケモンに関する著作権は株式会社ポケモン、任天堂株式会社、株式会社ゲームフリークに帰属します。</p>
      </footer>
    </div>
  )
}
