// Copies the tool list from the live server card into lhm.plugin.json, so the
// LobeHub listing matches what a connected client sees. Run it after the server
// gains or changes a tool, then bump "version" and run `lhm plugin update`.
// Node 22+, no dependencies.
import { readFile, writeFile } from 'node:fs/promises'

const CARD_URL = 'https://www.sprite-ai.art/.well-known/mcp/server-card.json'
const MANIFEST = new URL('./lhm.plugin.json', import.meta.url)

const res = await fetch(CARD_URL)
if (!res.ok) throw new Error(`Server card returned HTTP ${res.status}`)
const card = await res.json()

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
manifest.tools = card.tools.map(({ name, title, description, inputSchema, annotations }) => ({
  name,
  title,
  description,
  inputSchema,
  annotations,
}))

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`lhm.plugin.json now lists ${manifest.tools.length} tools.`)
