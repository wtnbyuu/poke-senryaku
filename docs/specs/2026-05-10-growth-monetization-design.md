# poke-senryaku 成長・収益化設計仕様

作成日: 2026-05-10

---

## 概要

poke-senryaku.vercel.app（ポケモン対戦Wiki）のアクセス解析・SEO・拡散・収益化を段階的に実装する。
実装順: SEO基盤 → GA4 → OGP+拡散 → Amazonアフィリエイト → 独自ドメイン+AdSense審査。

---

## セクション1: SEO基盤

### 実装ファイル

| ファイル | 内容 |
|---------|------|
| `src/app/sitemap.ts` | 全Wikiページ + トップページのsitemap.xml自動生成 |
| `src/app/robots.ts` | クローラー設定（全ページ許可） |
| `src/app/wiki/[slug]/page.tsx` | `generateMetadata()` でページ別title/description/canonical/OGP基本タグ |
| `src/app/page.tsx` | トップページのmetadata強化 |
| `src/lib/jsonld.ts` | JSON-LDスキーマ生成ユーティリティ |

### sitemap.ts

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/wiki'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://poke-senryaku.com'
  const slugs = getAllSlugs()
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...slugs.map(slug => ({
      url: `${base}/wiki/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
```

### robots.ts

```ts
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://poke-senryaku.com/sitemap.xml',
  }
}
```

### generateMetadata（各Wikiページ）

```ts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getWikiPage(slug)
  if (!page) return {}
  const url = `https://poke-senryaku.com/wiki/${slug}`
  return {
    title: `${page.title} | ポケ戦略 Wiki`,
    description: page.description || `ポケモン対戦の${page.title}について解説します。`,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: 'ポケ戦略 Wiki',
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}
```

### JSON-LD

- トップページ: `WebSite` スキーマ（サイト名・URL・検索アクション）
- 各Wikiページ: `Article` スキーマ（タイトル・最終更新日・URL）
- `<script type="application/ld+json">` として各ページのJSX内に埋め込む

---

## セクション2: Google Analytics 4

### 実装ファイル

| ファイル | 内容 |
|---------|------|
| `src/components/GoogleAnalytics.tsx` | GA4スクリプト埋め込みコンポーネント（'use client'） |
| `src/app/layout.tsx` | GoogleAnalyticsを追加 |

### GoogleAnalytics.tsx

```tsx
'use client'
import Script from 'next/script'

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}</Script>
    </>
  )
}
```

### 環境変数

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Vercelのenv varsに設定
```

未設定時はコンポーネントをレンダリングしない（`if (!gaId) return null`）。

### layout.tsxへの追加

```tsx
const gaId = process.env.NEXT_PUBLIC_GA_ID
// <head>内に追加:
{gaId && <GoogleAnalytics gaId={gaId} />}
```

---

## セクション3: OGP画像自動生成 + シェアボタン

### 実装ファイル

| ファイル | 内容 |
|---------|------|
| `src/app/opengraph-image.tsx` | トップページのOGP画像（ImageResponse） |
| `src/app/wiki/[slug]/opengraph-image.tsx` | 各WikiページのOGP画像（ページタイトル入り） |
| `src/components/ShareButtons.tsx` | X・はてなブックマークシェアボタン |

### OGP画像仕様

- サイズ: 1200×630px
- 背景: ポケモン赤（#EE1515）
- タイトル: 白・大文字・中央
- サイト名「ポケ戦略 Wiki」: 右下・小
- 静的エクスポート対応: `generateStaticParams` で全slug分をビルド時生成

```tsx
// src/app/wiki/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getWikiPage, getAllSlugs } from '@/lib/wiki'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getWikiPage(slug)
  return new ImageResponse(
    <div style={{ background: '#EE1515', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <div style={{ color: 'white', fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
        {page?.title ?? 'ポケ戦略 Wiki'}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 28, position: 'absolute', bottom: 40, right: 60 }}>
        ⚔️ ポケ戦略 Wiki
      </div>
    </div>
  )
}
```

### ShareButtons.tsx

```tsx
// src/components/ShareButtons.tsx
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' | ポケ戦略 Wiki')}`
  const hatenaUrl = `https://b.hatena.ne.jp/add?url=${encodeURIComponent(url)}`
  return (
    <div className="flex gap-3 my-4">
      <a href={xUrl} target="_blank" rel="noopener noreferrer"
        className="px-4 py-2 rounded text-white text-sm font-bold"
        style={{ backgroundColor: '#000' }}>
        𝕏 でシェア
      </a>
      <a href={hatenaUrl} target="_blank" rel="noopener noreferrer"
        className="px-4 py-2 rounded text-white text-sm font-bold"
        style={{ backgroundColor: '#00A4DE' }}>
        はてブ
      </a>
    </div>
  )
}
```

各Wikiページの配置順（下から）: GiscusComments → AffiliateBooks → ShareButtons → 最終更新日 → 前後ナビ

---

## セクション4: Amazonアフィリエイト

### 実装ファイル

| ファイル | 内容 |
|---------|------|
| `src/components/AffiliateBooks.tsx` | 関連書籍カードコンポーネント |
| `src/lib/affiliate.ts` | slug別の書籍データマッピング |

### 環境変数

```
NEXT_PUBLIC_AMAZON_ASSOCIATE_ID=xxxxx-22
```

### 書籍マッピング（src/lib/affiliate.ts）

```ts
export interface BookItem {
  title: string
  asin: string
  description: string
}

const BOOK_MAP: Record<string, BookItem[]> = {
  '03-training-checklist': [
    { asin: 'B0CSVZ3P7H', title: 'ポケモンSV公式完全攻略本', description: '育成・厳選の完全ガイド' },
  ],
  '04-damage-calc': [
    { asin: 'B0CSVZ3P7H', title: 'ポケモン対戦完全マスターガイド', description: 'ダメージ計算から構築まで' },
  ],
  '09-generations': [
    { asin: 'B0CSVZ3P7H', title: 'ポケモン全世代大全', description: '歴代の環境と対戦史を網羅' },
  ],
}

const DEFAULT_BOOKS: BookItem[] = [
  { asin: 'B0CSVZ3P7H', title: 'ポケモン対戦入門', description: '初心者から上級者まで' },
]

export function getBooksForSlug(slug: string): BookItem[] {
  return BOOK_MAP[slug] ?? DEFAULT_BOOKS
}
```

> **注意:** ASINは実際のAmazon商品コードに差し替えること。上記はプレースホルダー。

### AffiliateBooks.tsx

```tsx
import { getBooksForSlug } from '@/lib/affiliate'

export function AffiliateBooks({ slug }: { slug: string }) {
  const associateId = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID
  if (!associateId) return null
  const books = getBooksForSlug(slug)
  return (
    <div className="my-6 p-4 border rounded-lg bg-gray-50">
      <p className="text-xs text-gray-500 mb-3">📚 関連書籍（Amazonアフィリエイト）</p>
      <div className="space-y-2">
        {books.map(book => (
          <a key={book.asin}
            href={`https://www.amazon.co.jp/dp/${book.asin}?tag=${associateId}`}
            target="_blank" rel="noopener noreferrer sponsored"
            className="block hover:bg-white border rounded p-3 transition-colors">
            <div className="font-bold text-sm">{book.title}</div>
            <div className="text-xs text-gray-600">{book.description}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
```

---

## セクション5: 独自ドメイン + AdSense

### ドメイン設定（手動操作）

1. お名前.com / Cloudflare Registrar 等で `poke-senryaku.com` を取得（年間〜2,000円）
2. Vercel Dashboard → Project → Settings → Domains → `poke-senryaku.com` を追加
3. ドメインレジストラのDNS設定でVercel指定のAレコード/CNAMEを設定
4. sitemap.ts / robots.ts / generateMetadata の `https://poke-senryaku.com` URLが正しくなる

### AdSense実装ファイル

| ファイル | 内容 |
|---------|------|
| `src/components/AdSense.tsx` | AdSense広告ユニットコンポーネント（'use client'） |

### 環境変数

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX  # 審査通過後に設定
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=XXXXXXXXXX
```

未設定時は非表示（審査前は環境変数を設定しない）。

### AdSense.tsx

```tsx
'use client'
import { useEffect } from 'react'

declare global { interface Window { adsbygoogle: unknown[] } }

export function AdSense({ slot }: { slot: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  if (!clientId) return null

  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
  }, [])

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
```

### 広告配置

- **サイドバー上部**（PCのみ）: `Sidebar.tsx` の検索ボックス上
- **記事下部**: `wiki/[slug]/page.tsx` の前後ナビとシェアボタンの間

### AdSense審査申請の流れ

1. 独自ドメインにVercelデプロイ済みであること
2. Google AdSenseに申請 → 審査（1日〜4週間）
3. 審査通過後、Vercelの環境変数に `NEXT_PUBLIC_ADSENSE_CLIENT` を追加 → 自動デプロイで広告が有効化

---

## 実装順序

| フェーズ | 内容 | 期間目安 |
|---------|------|---------|
| Phase 1 | SEO基盤（sitemap/robots/metadata/JSON-LD） | 1日 |
| Phase 2 | GA4埋め込み | 半日 |
| Phase 3 | OGP画像生成 + シェアボタン | 1日 |
| Phase 4 | Amazonアフィリエイト | 半日 |
| Phase 5 | 独自ドメイン取得 + DNS設定（手動） | 1時間 |
| Phase 6 | AdSense審査申請（手動）→ 審査待ち | 1〜4週間 |
| Phase 7 | AdSense広告配置（審査通過後） | 半日 |

---

## スコープ外

- Amazon Product Advertising API連携（書籍情報の自動取得）
- 独自のコメント/レビューシステム
- メールマガジン・会員機能
- 有料コンテンツ（サブスクリプション）
