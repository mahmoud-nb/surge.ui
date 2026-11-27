// ============================================================
// Documentation lisible par les assistants IA, générée après
// `vitepress build` dans docs/.vitepress/dist :
// - une version Markdown de chaque page (/components/button.md…),
//   sans démos ni scripts Vue, liens internes vers les .md ;
// - /llms.txt (sommaire anglais, format llmstxt.org) et
//   /llms-full.txt (toute la documentation anglaise) ;
// - /llms-fr.txt et /llms-full-fr.txt (français).
// L'ordre et les catégories suivent la barre latérale (nav.ts).
// ============================================================

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getNavItems } from '../.vitepress/nav.ts'

const here = dirname(fileURLToPath(import.meta.url))
const docsDir = resolve(here, '..')
const distDir = resolve(docsDir, '.vitepress/dist')
const rootPkg = JSON.parse(readFileSync(resolve(docsDir, '../package.json'), 'utf8'))
const libPkg = JSON.parse(readFileSync(resolve(docsDir, '../package/vue/package.json'), 'utf8'))
const siteUrl = (rootPkg.config?.rootUrl ?? 'https://surgeui.com/').replace(/\/?$/, '/')

if (!existsSync(distDir)) {
  console.error('docs/.vitepress/dist absent : lancer d\'abord vitepress build')
  process.exit(1)
}

// ### Pages

/** Toutes les pages .md d'un dossier (récursif) */
const listPages = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return ['node_modules', '.vitepress', 'scripts', 'public'].includes(entry.name) ? [] : listPages(full)
    return entry.name.endsWith('.md') && entry.name !== 'CLAUDE.md' ? [full] : []
  })

/** Chemin de site d'un fichier : en/components/button.md → /en/components/button */
const routeOf = (file) => '/' + relative(docsDir, file).split(sep).join('/').replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')

/** URL absolue de la version Markdown d'une route */
const mdUrl = (route) => siteUrl + (route.endsWith('/') ? `${route.slice(1)}index.md` : `${route.slice(1)}.md`)

/**
 * Markdown pour un assistant : sans frontmatter, scripts, styles, démos
 * en direct ni commentaires ; liens internes vers les pages .md.
 */
const clean = (source) => {
  const lines = source.replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '').split('\n')
  const out = []
  let fence = false
  let skip = null // balise de fin du bloc ignoré (script, style)
  let demoDepth = 0

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line) && !skip && demoDepth === 0) {
      fence = !fence
      out.push(line)
      continue
    }
    if (fence) {
      out.push(line)
      continue
    }
    if (skip) {
      if (line.includes(skip)) skip = null
      continue
    }
    const block = line.match(/^\s*<(script|style)\b/)
    if (block) {
      if (!line.includes(`</${block[1]}>`)) skip = `</${block[1]}>`
      continue
    }
    // Démo en direct : <div class="component-demo"> … </div> (divs imbriquées)
    if (demoDepth > 0 || /^\s*<div class="component-demo"/.test(line)) {
      demoDepth += (line.match(/<div\b/g) ?? []).length - (line.match(/<\/div>/g) ?? []).length
      continue
    }
    if (/^\s*<\/?ClientOnly>\s*$/.test(line)) continue
    // Composant monté seul pour les démos de la page (<SuToaster />)
    if (/^\s*<Su[A-Z][\w-]*\b[^>]*\/>\s*$/.test(line)) continue
    out.push(
      line
        .replace(/<!--[\s\S]*?-->/g, '')
        // Liens internes (/components/x#ancre) → version Markdown absolue
        .replace(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g, (_, path, hash = '') => `](${mdUrl(path)}${hash})`)
    )
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

const titleOf = (markdown) => markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? ''

/** Premier paragraphe après le titre : description d'une ligne */
const descriptionOf = (markdown) => {
  const body = markdown.split('\n')
  const start = body.findIndex((line) => /^#\s/.test(line))
  for (const line of body.slice(start + 1)) {
    const text = line.trim()
    if (!text || /^(#|<|\||```|:::|>|-|\*|\d+\.)/.test(text)) continue
    const plain = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    return plain.length > 200 ? `${plain.slice(0, 197).trimEnd()}…` : plain
  }
  return ''
}

const pages = new Map()
for (const file of listPages(docsDir)) {
  const source = readFileSync(file, 'utf8')
  // Accueil (layout: home) : pas de contenu rédigé
  if (/^---\n[\s\S]*?layout:\s*home[\s\S]*?\n---/.test(source.replace(/\r\n/g, '\n'))) continue
  const markdown = clean(source)
  const route = routeOf(file)
  pages.set(route, { route, markdown, title: titleOf(markdown), description: descriptionOf(markdown) })

  const target = join(distDir, route.endsWith('/') ? `${route}index.md` : `${route}.md`)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, markdown)
}

// ### Manifeste d'API de la bibliothèque (package/vue/dist/api.json, construit avant la doc)

const apiSource = resolve(docsDir, '../package/vue/dist/api.json')
const hasApi = existsSync(apiSource)
if (hasApi) copyFileSync(apiSource, join(distDir, 'api.json'))
else console.warn('package/vue/dist/api.json absent : lancer npm run build:lib avant la doc pour publier /api.json')

// ### Sommaire et documentation complète, par langue

const text = {
  en: {
    summary: `Accessible, themable Vue 3 component library (npm package \`@surgeui/vue\`, version ${libPkg.version}): components, layouts and composables with WAI-ARIA keyboard and screen reader support, light/dark themes, RTL and translatable texts (French, English, Arabic).`,
    rules: [
      'Install `@surgeui/vue` (Vue 3.5+), register the plugin with `app.use(SurgeUI)` and import `@surgeui/vue/style.css` once.',
      'Components are registered globally with the `Su` prefix (`<SuButton>`, `<SuInputField>`); named imports drop it (`import { Button } from \'@surgeui/vue\'`).',
      'Form controls use `v-model`. Wrap a control in `<SuFormField label="…">` or use a `*Field` component (`SuInputField`, `SuSelectBoxField`…) for label, message and validation state.',
      'Theme with the `--su-*` CSS custom properties and `useTheme()`; do not hard-code colors.',
      'The package was named `@surgeui/ds-vue` up to 3.x; 4.0 removed deprecated APIs (see the migration guide).'
    ],
    sections: {
      guide: 'Guide',
      theme: 'Themes',
      display: 'Components: display',
      actions: 'Components: actions',
      forms: 'Components: forms',
      layouts: 'Layouts',
      composables: 'Composables',
      other: 'Other pages',
      optional: 'Optional'
    },
    full: 'Full documentation in one file',
    api: 'API manifest (JSON): props, events, slots and exposed methods of every component, extracted from the types',
    other: 'Documentation en français',
    agents: 'Usage guide shipped with the npm package (AGENTS.md)'
  },
  fr: {
    summary: `Bibliothèque de composants Vue 3 accessibles et thématisables (paquet npm \`@surgeui/vue\`, version ${libPkg.version}) : composants, mises en page et composables, clavier et lecteurs d'écran (motifs WAI-ARIA), thèmes clair et sombre, RTL, textes traduisibles (français, anglais, arabe).`,
    rules: [
      'Installer `@surgeui/vue` (Vue 3.5+), enregistrer le plugin avec `app.use(SurgeUI)` et importer `@surgeui/vue/style.css` une fois.',
      'Les composants sont enregistrés globalement avec le préfixe `Su` (`<SuButton>`, `<SuInputField>`) ; les imports nommés n\'en ont pas (`import { Button } from \'@surgeui/vue\'`).',
      'Les contrôles de formulaire utilisent `v-model`. Envelopper un contrôle dans `<SuFormField label="…">` ou utiliser un composant `*Field` (`SuInputField`, `SuSelectBoxField`…) pour le label, le message et l\'état de validation.',
      'Thèmes : propriétés CSS `--su-*` et `useTheme()` ; pas de couleur codée en dur.',
      'Le paquet s\'appelait `@surgeui/ds-vue` jusqu\'à la 3.x ; la 4.0 a retiré les API dépréciées (voir le guide de migration).'
    ],
    sections: {
      guide: 'Guide',
      theme: 'Thèmes',
      display: 'Composants : affichage',
      actions: 'Composants : actions',
      forms: 'Composants : formulaires',
      layouts: 'Mises en page',
      composables: 'Composables',
      other: 'Autres pages',
      optional: 'Facultatif'
    },
    full: 'Toute la documentation en un fichier',
    api: 'Manifeste d\'API (JSON) : props, événements, slots et méthodes exposées de chaque composant, extraits des types',
    other: 'English documentation',
    agents: 'Guide d\'usage livré avec le paquet npm (AGENTS.md, en anglais)'
  }
}

// Guide et thèmes : ordre de la barre latérale, puis les pages restantes du dossier
const ordered = (prefix, order) => {
  const routes = [...pages.keys()].filter((route) => route.startsWith(prefix) && route.slice(prefix.length).split('/').length === 1)
  const rank = (route) => {
    const index = order.indexOf(route.slice(prefix.length))
    return index === -1 ? order.length : index
  }
  return routes.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
}

const build = (lang) => {
  const t = text[lang]
  const prefix = lang === 'en' ? '/en' : ''
  const sections = [
    ['guide', ordered(`${prefix}/guide/`, ['get-started', 'installation', 'migration', 'ai', 'nuxt', 'rtl'])],
    ['theme', ordered(`${prefix}/theme/`, ['', 'colors', 'tokens', 'accessibility', 'examples'])],
    ...['display', 'actions', 'forms', 'layouts', 'composables'].map((section) => [
      section,
      getNavItems(section, lang).map((item) => item.link)
    ])
  ]

  // Pages de la langue absentes des sections (pages de catégories, index…)
  const listed = new Set(sections.flatMap(([, routes]) => routes))
  const rest = [...pages.keys()].filter((route) =>
    !listed.has(route) && (lang === 'en' ? route.startsWith('/en/') : !route.startsWith('/en/'))
  ).sort()
  sections.push(['other', rest])

  const entry = (route) => {
    const page = pages.get(route)
    if (!page) return null
    return `- [${page.title}](${mdUrl(route)})${page.description ? `: ${page.description}` : ''}`
  }

  const suffix = lang === 'en' ? '' : '-fr'
  const index = [
    '# SurgeUI',
    '',
    `> ${t.summary}`,
    '',
    ...t.rules.map((rule) => `- ${rule}`),
    '',
    ...sections.flatMap(([key, routes]) => {
      const items = routes.map(entry).filter(Boolean)
      return items.length ? [`## ${t.sections[key]}`, '', ...items, ''] : []
    }),
    `## ${t.sections.optional}`,
    '',
    `- [${t.full}](${siteUrl}llms-full${suffix}.txt)`,
    ...(hasApi ? [`- [${t.api}](${siteUrl}api.json)`] : []),
    `- [${t.other}](${siteUrl}${lang === 'en' ? 'llms-fr.txt' : 'llms.txt'})`,
    `- [${t.agents}](https://github.com/mahmoud-nb/surge.ui/blob/main/package/vue/AGENTS.md)`,
    ''
  ].join('\n')

  const full = [
    `# SurgeUI — documentation (${libPkg.version})`,
    '',
    `> ${t.summary}`,
    '',
    ...sections.flatMap(([, routes]) =>
      routes.map((route) => pages.get(route)).filter(Boolean).map((page) =>
        `<!-- ${mdUrl(page.route)} -->\n\n${page.markdown.replace(/^#\s/m, '# ')}`
      )
    )
  ].join('\n\n---\n\n')

  writeFileSync(join(distDir, `llms${suffix}.txt`), index)
  writeFileSync(join(distDir, `llms-full${suffix}.txt`), full)
  return { index: index.length, full: full.length }
}

const sizes = { en: build('en'), fr: build('fr') }
const kb = (n) => `${Math.round(n / 1024)} ko`
console.log(
  `llms : ${pages.size} pages .md ; llms.txt ${kb(sizes.en.index)}, llms-full.txt ${kb(sizes.en.full)} ; ` +
    `llms-fr.txt ${kb(sizes.fr.index)}, llms-full-fr.txt ${kb(sizes.fr.full)}`
)
