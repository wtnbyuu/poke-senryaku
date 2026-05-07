export function WikiContent({ html }: { html: string }) {
  return (
    <div
      className="wiki-content prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
