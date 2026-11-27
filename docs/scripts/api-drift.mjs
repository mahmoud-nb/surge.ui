// ============================================================
// Écart entre la documentation et le manifeste d'API
// (package/vue/dist/api.json, généré depuis les types).
// Pour chaque composant, compare les props des tableaux « Props »
// des pages FR et EN aux props réelles :
// - inconnues : documentées mais absentes du code (erreur : elles
//   induisent les lecteurs et les assistants IA en erreur) ;
// - non documentées : présentes dans le code, absentes de la page.
// Les props d'accessibilité communes (ariaLabel…) ne sont pas exigées.
// Usage : npm run api:check -w docs [-- --strict] [-- --verbose]
// ============================================================

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestFile = resolve(docsDir, '../package/vue/dist/api.json')
const strict = process.argv.includes('--strict')
const verbose = process.argv.includes('--verbose')

if (!existsSync(manifestFile)) {
  console.error('package/vue/dist/api.json absent : lancer npm run build:lib')
  process.exit(1)
}
const { components } = JSON.parse(readFileSync(manifestFile, 'utf8'))

// Props communes d'accessibilité (AccessibilityProps) : héritées, pas exigées par page
const COMMON = new Set(['ariaLabel', 'ariaLabelledBy', 'ariaDescribedBy', 'ariaHidden', 'ariaInvalid', 'ariaRequired', 'ariaValueText', 'role', 'tabIndex'])
// Attributs transmis à l'élément racine, pas des props
const ATTRIBUTES = new Set(['class', 'style', 'id'])

/** Pages d'un dossier, indexées par nom normalisé (checkbox-group → checkboxgroup) */
const pagesIn = (dir) =>
  Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => [file.replace(/\.md$/, '').replace(/-/g, '').toLowerCase(), join(dir, file)])
  )

/**
 * Props documentées d'une page, par composant : sections dont le titre
 * contient « props » (« Props », « Props de SuToaster », « SuToaster
 * props »), sous-titres en gras (**AccordionItem**). null : composant
 * de la page.
 */
const documentedProps = (markdown) => {
  const tables = new Map()
  let inProps = false
  let current = null
  for (const line of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const heading = line.match(/^#{1,4}\s+(.*)$/)
    if (heading) {
      inProps = /\bprops\b/i.test(heading[1]) && !/slot props/i.test(heading[1])
      // Autre composant seulement si le titre le désigne : « Props (OtpInputField) »,
      // « Props de SuToaster », « SuToaster props » (pas « … inherited from SuFormField »)
      const target = heading[1].match(/^Props\s+(?:de\s+)?\(?(?:Su)?([A-Z]\w+)\)?\s*$|^Su([A-Z]\w+)\s+props\s*$/)
      current = target ? (target[1] ?? target[2]) : null
      continue
    }
    if (!inProps) continue
    const label = line.match(/^\*\*(?:Su)?([A-Z]\w+)\*\*\s*$/)
    if (label) {
      current = label[1]
      continue
    }
    if (!line.startsWith('|') || /^\|\s*:?-/.test(line)) continue
    const first = line.split('|')[1] ?? ''
    if (!tables.has(current)) tables.set(current, new Set())
    const names = tables.get(current)
    for (const [, raw] of first.matchAll(/`([^`]+)`/g)) {
      const name = raw.trim()
      if (name === 'v-model') names.add('modelValue')
      else if (name.startsWith('v-model:')) names.add(name.slice('v-model:'.length))
      else if (/^[a-z][\w-]*$/i.test(name)) names.add(name.replace(/-(\w)/g, (_, c) => c.toUpperCase()))
    }
  }
  return tables
}

const report = []
for (const [lang, dir] of [['fr', join(docsDir, 'components')], ['en', join(docsDir, 'en/components')]]) {
  const pages = pagesIn(dir)
  for (const name of Object.keys(components)) {
    const page = pages[name.toLowerCase()]
    if (!page) {
      report.push({ lang, name, page: null })
      continue
    }
    const tables = documentedProps(readFileSync(page, 'utf8'))
    if (!tables.has(null) && !tables.has(name)) {
      report.push({ lang, name, page, noTable: true })
    }
    // Chaque tableau est comparé au composant qu'il décrit (la page, ou un sous-composant)
    for (const [target, documented] of tables) {
      const targetName = target ?? name
      const actualComponent = components[targetName]
      if (!actualComponent) continue
      // Casse ignorée : aria-describedby s'écrit ariaDescribedby ou ariaDescribedBy selon les pages
      const actual = new Map(actualComponent.props.map((prop) => [prop.name.toLowerCase(), prop.name]))
      const seen = new Set([...documented].map((prop) => prop.toLowerCase()))
      report.push({
        lang,
        name: targetName,
        page,
        unknown: [...documented].filter((prop) => !actual.has(prop.toLowerCase()) && !ATTRIBUTES.has(prop)),
        undocumented: [...actual.values()].filter((prop) => !seen.has(prop.toLowerCase()) && !COMMON.has(prop))
      })
    }
  }
}

const sum = (key) => report.reduce((total, entry) => total + (entry[key]?.length ?? 0), 0)
const noPage = report.filter((entry) => entry.page === null)
const noTable = report.filter((entry) => entry.noTable)
const withUnknown = report.filter((entry) => entry.unknown?.length)

for (const entry of report) {
  if (!entry.unknown?.length && !(verbose && entry.undocumented?.length)) continue
  const parts = []
  if (entry.unknown?.length) parts.push(`inconnues : ${entry.unknown.join(', ')}`)
  if (verbose && entry.undocumented?.length) parts.push(`non documentées : ${entry.undocumented.join(', ')}`)
  console.log(`[${entry.lang}] ${entry.name} — ${parts.join(' ; ')}`)
}

console.log(
  `\nÉcart doc / code : ${sum('unknown')} props inconnues (${withUnknown.length} pages), ` +
    `${sum('undocumented')} props non documentées ; ` +
    `${noPage.length} composants sans page, ${noTable.length} pages sans tableau Props`
)
if (verbose) {
  if (noPage.length) console.log(`Sans page : ${noPage.map((e) => `[${e.lang}] ${e.name}`).join(', ')}`)
  if (noTable.length) console.log(`Sans tableau Props : ${noTable.map((e) => `[${e.lang}] ${e.name}`).join(', ')}`)
}
if (strict && sum('unknown') > 0) process.exit(1)
