import type { Metadata } from 'next'
import { getAllSlugs, getWikiPage } from '@/lib/wiki'
import { WikiContent } from '@/components/WikiContent'
import { GiscusComments } from '@/components/GiscusComments'
import { ShareButtons } from '@/components/ShareButtons'
import { AffiliateBooks } from '@/components/AffiliateBooks'
import { AdSense } from '@/components/AdSense'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
      description: page.description || `ポケモン対戦の${page.title}について解説します。`,
      url,
      siteName: 'ポケ戦略 Wiki',
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description || `ポケモン対戦の${page.title}について解説します。`,
    },
  }
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getWikiPage(slug)
  if (!page) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title,
        dateModified: page.lastUpdated,
        url: `https://poke-senryaku.com/wiki/${slug}`,
      }) }} />
      <article>
        <WikiContent html={page.contentHtml} />

        {process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE && (
          <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE} />
        )}

        <div className="flex justify-between mt-8 pt-4 border-t text-sm">
          {page.prevPage ? (
            <Link href={`/wiki/${page.prevPage.slug}`} className="text-red-600 hover:underline">
              ← {page.prevPage.title}
            </Link>
          ) : <span />}
          {page.nextPage && (
            <Link href={`/wiki/${page.nextPage.slug}`} className="text-red-600 hover:underline">
              {page.nextPage.title} →
            </Link>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">最終更新: {page.lastUpdated}</p>
        <ShareButtons url={`https://poke-senryaku.com/wiki/${slug}`} title={page.title} />
        <AffiliateBooks slug={slug} />

        <GiscusComments />
      </article>
    </>
  )
}
