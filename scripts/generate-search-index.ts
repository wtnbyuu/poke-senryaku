import fs from 'fs'
import path from 'path'
import { generateSearchIndex } from '../src/lib/wiki'

const index = generateSearchIndex()
const outPath = path.join(process.cwd(), 'public', 'search-index.json')
fs.writeFileSync(outPath, JSON.stringify(index, null, 2))
console.log(`Search index written: ${index.length} pages`)
