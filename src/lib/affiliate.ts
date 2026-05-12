export interface BookItem {
  title: string
  asin: string
  description: string
}

const BOOK_MAP: Record<string, BookItem[]> = {
  '03-training-checklist': [
    { asin: '4047334502', title: 'ポケットモンスター スカーレット・バイオレット 公式ガイドブック', description: '育成・対戦の基礎が分かる公式本' },
  ],
  '09-generations': [
    { asin: '4091067263', title: 'ポケモン全キャラ大事典', description: '全世代のポケモンを網羅' },
  ],
}

const DEFAULT_BOOKS: BookItem[] = [
  { asin: '4047334502', title: 'ポケットモンスター スカーレット・バイオレット 公式ガイドブック', description: '対戦入門に最適' },
]

export function getBooksForSlug(slug: string): BookItem[] {
  return BOOK_MAP[slug] ?? DEFAULT_BOOKS
}
