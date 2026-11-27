// ============================================================
// Manifeste d'API : dist/api.json, extrait des types des composants
// (vue-component-meta, l'analyseur de Volar et vue-tsc).
// Pour chaque composant enregistré par le plugin : props (type,
// valeur par défaut, obligatoire, description JSDoc), événements,
// slots et méthodes exposées. Lu par les assistants IA et les
// éditeurs ; source de vérité des tableaux d'API de la doc.
// ============================================================

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createChecker } from 'vue-component-meta'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const entry = readFileSync(resolve(root, 'src/index.ts'), 'utf8')

// Composants enregistrés (interface SurgeComponents) et leur fichier (imports de src/index.ts)
const names = [...(entry.match(/export interface SurgeComponents \{([\s\S]*?)\n\}/)?.[1] ?? '').matchAll(/^\s+(\w+): typeof/gm)]
  .map((match) => match[1])
const files = Object.fromEntries(
  [...entry.matchAll(/^import (\w+) from '\.\/(components\/[^']+\.vue)'/gm)].map(([, name, file]) => [name, file])
)

const missing = names.filter((name) => !files[name])
if (missing.length) {
  console.error(`Fichier introuvable pour : ${missing.join(', ')}`)
  process.exit(1)
}

const checker = createChecker(resolve(root, 'tsconfig.json'), {
  forceUseTs: true,
  // Types non développés : on garde leur nom
  schema: { ignore: ['Component', 'LinkTo', 'Date', 'HTMLElement', 'Event', 'MouseEvent', 'KeyboardEvent', 'FocusEvent'] }
})

/** Type lisible : union de littéraux développée, sans « | undefined » ; composant Vue : « Component » */
const typeOf = (item) => {
  const text = rawTypeOf(item)
  return /ComponentPublicInstanceConstructor|ComponentOptions</.test(text) ? 'Component' : text
}

const rawTypeOf = (item) => {
  const schema = item.schema
  if (schema && typeof schema === 'object' && schema.kind === 'enum') {
    let parts = [...new Set(schema.schema
      .map((part) => (typeof part === 'string' ? part : part.type))
      .filter((part) => part && part !== 'undefined'))]
    // false | true → boolean
    if (parts.includes('false') && parts.includes('true')) {
      parts = ['boolean', ...parts.filter((part) => part !== 'false' && part !== 'true')]
    }
    if (parts.length) return parts.join(' | ')
  }
  return (item.type ?? '').replace(/\s*\|\s*undefined\b/g, '').trim()
}

const clean = (text) => (text ? text.replace(/\s+/g, ' ').trim() : undefined)

const components = {}
for (const name of names) {
  const meta = checker.getComponentMeta(resolve(root, 'src', files[name]))
  const events = meta.events.map((event) => ({
    name: event.name,
    payload: clean(event.type) || undefined,
    description: clean(event.description)
  }))
  const eventProps = new Set(events.map((event) => `on${event.name.replace(/(^|[-:])(\w)/g, (_, __, c) => c.toUpperCase())}`))

  components[name] = {
    file: `src/${files[name]}`,
    props: meta.props
      .filter((prop) => !prop.global && !eventProps.has(prop.name))
      .map((prop) => ({
        name: prop.name,
        type: typeOf(prop),
        required: prop.required || undefined,
        default: prop.default,
        description: clean(prop.description)
      })),
    events,
    slots: meta.slots.map((slot) => ({
      name: slot.name,
      props: clean(slot.type) && slot.type !== 'any' && slot.type !== '{}' ? clean(slot.type) : undefined,
      description: clean(slot.description)
    })),
    // Méthodes exposées (defineExpose), sans les props ni leurs gestionnaires on…
    exposed: meta.exposed
      .filter((item) => !item.name.startsWith('$') && !/^on[A-Z]|^onUpdate:/.test(item.name) && !meta.props.some((prop) => prop.name === item.name))
      .map((item) => ({ name: item.name, type: clean(item.type) }))
  }
}

const manifest = {
  $comment: 'Généré par scripts/api-manifest.mjs depuis les types des composants. Ne pas modifier.',
  name: pkg.name,
  version: pkg.version,
  prefix: 'Su',
  components
}

writeFileSync(resolve(root, 'dist/api.json'), JSON.stringify(manifest, null, 2) + '\n')
const count = (key) => Object.values(components).reduce((sum, component) => sum + component[key].length, 0)
console.log(`api.json : ${names.length} composants, ${count('props')} props, ${count('events')} événements, ${count('slots')} slots`)
