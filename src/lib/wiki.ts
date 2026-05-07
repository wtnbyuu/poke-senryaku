import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const WIKI_DIR = path.join(process.cwd(), 'wiki')

export interface WikiPage {
  slug: string
  title: string
  description: string
  contentHtml: string
  lastUpdated: string
  prevPage: { slug: string; title: string } | null
  nextPage: { slug: string; title: string } | null
}

export interface WikiMeta {
  slug: string
  title: string
  description: string
  lastUpdated: string
}

export interface SearchIndexItem {
  slug: string
  title: string
  headings: string[]
}

function getWikiFiles(): string[] {
  return fs.readdirSync(WIKI_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
}

function slugFromFilename(filename: string): string {
  if (filename === 'README.md') return 'index'
  return filename.replace(/\.md$/, '')
}

function titleFromContent(content: string, slug: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return slug.replace(/-/g, ' ')
}

function headingsFromContent(content: string): string[] {
  const matches = content.matchAll(/^#{2,3}\s+(.+)$/gm)
  return Array.from(matches).map(m => m[1].trim())
}

function lastUpdatedFromFile(filePath: string): string {
  const stat = fs.statSync(filePath)
  return stat.mtime.toISOString().split('T')[0]
}

export function getAllWikiMeta(): WikiMeta[] {
  return getWikiFiles()
    .filter(f => f !== 'README.md')
    .map(filename => {
      const filePath = path.join(WIKI_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { content } = matter(fileContent)
      const slug = slugFromFilename(filename)
      const title = titleFromContent(content, slug)
      const descriptionMatch = content.match(/\*\*このページを読んだらできるようになること\*\*\s*\n→\s*(.+)/)
      const description = descriptionMatch ? descriptionMatch[1].trim() : ''
      return {
        slug,
        title,
        description,
        lastUpdated: lastUpdatedFromFile(filePath),
      }
    })
}

export async function getWikiPage(slug: string): Promise<WikiPage | null> {
  const filename = slug === 'index' ? 'README.md' : `${slug}.md`
  const filePath = path.join(WIKI_DIR, filename)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContent)

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = processed.toString()

  const allMeta = getAllWikiMeta()
  const currentIndex = allMeta.findIndex(p => p.slug === slug)
  const prevPage = currentIndex > 0 ? { slug: allMeta[currentIndex - 1].slug, title: allMeta[currentIndex - 1].title } : null
  const nextPage = currentIndex < allMeta.length - 1 ? { slug: allMeta[currentIndex + 1].slug, title: allMeta[currentIndex + 1].title } : null

  return {
    slug,
    title: titleFromContent(content, slug),
    description: '',
    contentHtml,
    lastUpdated: lastUpdatedFromFile(filePath),
    prevPage,
    nextPage,
  }
}

export function getAllSlugs(): string[] {
  return getWikiFiles()
    .filter(f => f !== 'README.md')
    .map(f => slugFromFilename(f))
}

export function generateSearchIndex(): SearchIndexItem[] {
  return getWikiFiles()
    .filter(f => f !== 'README.md')
    .map(filename => {
      const filePath = path.join(WIKI_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { content } = matter(fileContent)
      const slug = slugFromFilename(filename)
      return {
        slug,
        title: titleFromContent(content, slug),
        headings: headingsFromContent(content),
      }
    })
}
