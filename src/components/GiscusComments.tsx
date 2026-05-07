'use client'

import { useEffect } from 'react'

export function GiscusComments() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'wtnbyuu/poke-senryaku')
    script.setAttribute('data-repo-id', 'REPO_ID_HERE')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'CATEGORY_ID_HERE')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'ja')
    script.async = true
    document.getElementById('giscus-container')?.appendChild(script)
    return () => { document.getElementById('giscus-container')!.innerHTML = '' }
  }, [])

  return <div id="giscus-container" className="mt-8" />
}
