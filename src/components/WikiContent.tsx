export function WikiContent({ html }: { html: string }) {
  return (
    <div
      className="article wiki-content prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
