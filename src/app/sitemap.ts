import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/wiki'

export const dynamic = 'force-static'

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
