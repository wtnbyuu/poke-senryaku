import { getBooksForSlug } from '@/lib/affiliate'

export function AffiliateBooks({ slug }: { slug: string }) {
  const associateId = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID
  if (!associateId) return null
  const books = getBooksForSlug(slug)
  return (
    <div className="my-6 p-4 border rounded-lg bg-gray-50">
      <p className="text-xs text-gray-500 mb-3">📚 関連書籍</p>
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
