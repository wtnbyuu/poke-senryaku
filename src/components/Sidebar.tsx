'use client'

export function Sidebar({ pages }: { pages: { slug: string; title: string }[] }) {
  return (
    <aside style={{ backgroundColor: 'var(--color-dark)' }} className="w-64 min-h-screen text-white p-4 hidden md:block">
      <nav>
        <ul>
          {pages.map(p => (
            <li key={p.slug}>
              <a href={`/wiki/${p.slug}`} className="block py-1 px-2 text-sm hover:text-yellow-300">
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
