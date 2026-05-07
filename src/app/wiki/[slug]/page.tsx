import { getAllSlugs, getWikiPage } from '@/lib/wiki'
import { WikiContent } from '@/components/WikiContent'
import { GiscusComments } from '@/components/GiscusComments'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getWikiPage(slug)
  if (!page) notFound()

  return (
    <article>
      <WikiContent html={page.contentHtml} />

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

      <GiscusComments />
    </article>
  )
}
