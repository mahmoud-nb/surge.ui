import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// AGENTS.md (guide des assistants IA, livré dans le paquet) doit citer
// chaque composant enregistré par le plugin : un composant ajouté sans
// mise à jour du guide fait échouer ce test.

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const guide = readFileSync(resolve(root, 'AGENTS.md'), 'utf8')
const entry = readFileSync(resolve(root, 'src/index.ts'), 'utf8')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

const registered = [...(entry.match(/export interface SurgeComponents \{([\s\S]*?)\n\}/)?.[1] ?? '').matchAll(/^\s+(\w+): typeof/gm)]
  .map((match) => match[1])

describe('AGENTS.md', () => {
  it('cite chaque composant enregistré par le plugin', () => {
    expect(registered.length).toBeGreaterThan(80)
    const missing = registered.filter((name) => !guide.includes(`**${name}**`))
    expect(missing).toEqual([])
  })

  it('est publié avec le paquet', () => {
    expect(pkg.files).toContain('AGENTS.md')
  })
})
