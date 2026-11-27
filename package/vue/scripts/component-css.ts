// ============================================================
// CSS par composant : dist/css/
//
// Le build de la bibliothèque produit une seule feuille (style.css). Ce
// plugin récupère aussi le CSS compilé de chaque SFC (après Sass et
// scoped) et écrit, en plus :
//   - css/base.css : tokens, thèmes, contraste, utilitaires (styles/index.scss) ;
//   - css/<Composant>.css : les styles d'un composant exporté et de ses
//     sous-composants privés (TreeView + TreeViewNode…) ;
//   - css/layer/… : les mêmes fichiers dans la couche CSS `surgeui` ;
//   - css/manifest.json : pour chaque composant, les fichiers à charger
//     dans l'ordre (composants utilisés d'abord : Dialog → Button, Dialog) ;
//   - resolver.js / resolver.d.ts : résolveur pour unplugin-vue-components,
//     qui importe les composants à l'usage (et, au choix, leur CSS).
// ============================================================

import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { normalizePath, transformWithEsbuild, type Plugin } from 'vite'

interface ComponentCssOptions {
  /** Racine du paquet (package/vue) */
  root: string
  /** Couche CSS des fichiers css/layer/ */
  layer?: string
  /** Cibles de la minification (celles du build Vite par défaut) */
  target?: string[]
}

const STYLE_QUERY = /[?&]vue&type=style\b/

export function componentCss({ root, layer = 'surgeui', target = ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'] }: ComponentCssOptions): Plugin {
  const entryFile = normalizePath(resolve(root, 'src/index.ts'))
  const baseFile = normalizePath(resolve(root, 'src/styles/index.scss'))
  const distDir = resolve(root, 'dist')

  // Composants exportés : nom → fichier .vue (imports de src/index.ts)
  const entrySource = readFileSync(entryFile, 'utf8')
  const exported = new Map<string, string>()
  for (const [, name, file] of entrySource.matchAll(/^import (\w+) from '\.\/(components\/[^']+\.vue)'/gm)) {
    exported.set(normalizePath(resolve(root, 'src', file)), name)
  }

  // CSS compilé de chaque SFC, par bloc <style> (index), et de la base
  const styles = new Map<string, Map<number, string>>()
  let baseCss: string | undefined

  // Calculés à la fin du build : SFC de chaque composant (le sien et ses
  // sous-composants privés) et fichiers CSS à charger, dépendances d'abord
  let graph: Map<string, { own: string[]; deps: string[] }> | undefined
  let components: { name: string; files: string[] }[] | undefined

  return {
    name: 'surgeui-component-css',
    apply: 'build',

    // Après Sass (vite:css) et le scoped de plugin-vue, avant la mise en bundle
    transform(code, id) {
      const [path, query = ''] = id.split('?')
      const file = normalizePath(path)
      if (file === baseFile && !query) {
        baseCss = code
      } else if (file.endsWith('.vue') && STYLE_QUERY.test(`?${query}`)) {
        const index = Number(new URLSearchParams(query).get('index') ?? 0)
        if (!styles.has(file)) styles.set(file, new Map())
        styles.get(file)!.set(index, code)
      }
      return null
    },

    buildEnd(error) {
      components = undefined
      graph = undefined
      // Build de la bibliothèque seulement (pas Storybook, qui reprend cette config)
      if (error || !this.getModuleInfo(entryFile)?.isEntry) return

      // Sous-composants privés et composants exportés atteints depuis un composant
      const walk = (start: string) => {
        const own: string[] = []
        const deps = new Set<string>()
        const seen = new Set<string>([start])
        // Le script d'un SFC en TypeScript est un sous-module (X.vue?vue&type=script…) :
        // on le parcourt ; les blocs <style> (sous-modules type=style) sont lus à part
        const visit = (id: string) => {
          for (const imported of this.getModuleInfo(id)?.importedIds ?? []) {
            if (STYLE_QUERY.test(imported) || imported.includes('/node_modules/') || seen.has(imported)) continue
            seen.add(imported)
            const [path, query] = imported.split('?')
            const file = normalizePath(path)
            const name = exported.get(file)
            if (name && file !== start) {
              deps.add(name)
              continue
            }
            visit(imported)
            if (file.endsWith('.vue') && query === undefined && file !== start) own.push(file)
          }
        }
        visit(start)
        return { own: [...own, start], deps: [...deps] }
      }

      const nodes = new Map([...exported].map(([file, name]) => [name, walk(file)]))
      graph = nodes

      // Balisage repris sans import (FileUploadField reprend les classes de
      // FileUpload…) : une classe su-* écrite dans un composant, absente de
      // son CSS et de la base mais définie par un autre composant, ajoute
      // ce composant à ses dépendances.
      const CLASS = /\.(su-[a-z0-9_-]*[a-z0-9])(?![a-z0-9_-])/g
      const classesIn = (css: string) => new Set([...css.matchAll(CLASS)].map((match) => match[1]))
      const ownCss = (name: string) =>
        nodes.get(name)!.own.flatMap((file) => [...(styles.get(file)?.values() ?? [])]).join('\n')
      const definedBy = new Map<string, Set<string>>()
      for (const name of nodes.keys()) {
        for (const className of classesIn(ownCss(name))) {
          if (!definedBy.has(className)) definedBy.set(className, new Set())
          definedBy.get(className)!.add(name)
        }
      }
      const baseClasses = classesIn(baseCss ?? '')
      for (const [name, node] of nodes) {
        const defined = classesIn(ownCss(name))
        const source = node.own.map((file) => readFileSync(file, 'utf8').replace(/<style[\s\S]*?<\/style>/g, '')).join('\n')
        for (const [token] of source.matchAll(/(?<![\w-])su-[a-z0-9_-]*[a-z0-9](?![a-z0-9_-])/g)) {
          if (defined.has(token) || baseClasses.has(token)) continue
          for (const other of definedBy.get(token) ?? []) {
            if (other !== name && !node.deps.includes(other)) node.deps.push(other)
          }
        }
      }

      // Fichiers d'un composant : ceux de ses dépendances d'abord, puis le sien
      const filesOf = (name: string, trail = new Set<string>()): string[] => {
        if (trail.has(name)) return []
        trail.add(name)
        const node = nodes.get(name)!
        const list = node.deps.flatMap((dep) => filesOf(dep, trail))
        if (node.own.some((file) => styles.has(file))) list.push(name)
        return [...new Set(list)]
      }

      components = [...nodes.keys()].sort().map((name) => ({ name, files: filesOf(name) }))
    },

    async closeBundle() {
      if (!components || !graph || baseCss === undefined) return
      const cssDir = resolve(distDir, 'css')
      rmSync(cssDir, { recursive: true, force: true })
      mkdirSync(resolve(cssDir, 'layer'), { recursive: true })

      const minify = async (css: string) =>
        (await transformWithEsbuild(css, 'style.css', { loader: 'css', minify: true, target })).code.trim()

      const write = async (name: string, css: string) => {
        const code = await minify(css)
        writeFileSync(resolve(cssDir, `${name}.css`), `${code}\n`)
        writeFileSync(resolve(cssDir, 'layer', `${name}.css`), `@layer ${layer}{${code}}\n`)
      }

      await write('base', baseCss)
      for (const { name } of components) {
        const own = graph.get(name)?.own ?? []
        const css = own
          .flatMap((file) => [...(styles.get(file) ?? new Map()).entries()].sort(([a], [b]) => a - b).map(([, code]) => code))
          .join('\n')
        if (css.trim()) await write(name, css)
      }

      const manifest = {
        base: 'base.css',
        components: Object.fromEntries(components.map(({ name, files }) => [name, files.map((file) => `${file}.css`)]))
      }
      writeFileSync(resolve(cssDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

      // Résolveur : liste des composants et de leurs fichiers CSS, insérée dans le gabarit
      const template = readFileSync(resolve(root, 'scripts/resolver.template.js'), 'utf8')
      const marker = '/* surgeui:components */ {}'
      if (!template.includes(marker)) throw new Error(`scripts/resolver.template.js : repère « ${marker} » absent`)
      writeFileSync(resolve(distDir, 'resolver.js'), template.replace(marker, JSON.stringify(manifest.components)))
      copyFileSync(resolve(root, 'scripts/resolver.template.d.ts'), resolve(distDir, 'resolver.d.ts'))
    }
  }
}
