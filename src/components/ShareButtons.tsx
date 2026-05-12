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
