// Résolveur SurgeUI pour unplugin-vue-components (généré au build : dist/resolver.js).
// Les composants utilisés dans les templates (<SuButton>…) sont importés à
// l'usage depuis @surgeui/vue : seul leur JavaScript entre dans le bundle.

/** Composant → fichiers CSS à charger, dans l'ordre (rempli au build) */
const COMPONENTS = /* surgeui:components */ {}

const PACKAGE = '@surgeui/vue'

/**
 * @param {import('./resolver').SurgeUIResolverOptions} [options]
 * @returns {import('./resolver').SurgeUIComponentResolver}
 */
export function SurgeUIResolver(options = {}) {
  const { prefix = 'Su', importStyle = false } = options
  const cssDir = importStyle === 'layer' ? 'css/layer' : 'css'

  return {
    type: 'component',
    resolve(name) {
      if (!name.startsWith(prefix)) return undefined
      const component = name.slice(prefix.length)
      const files = COMPONENTS[component]
      if (!files) return undefined
      return {
        name: component,
        from: PACKAGE,
        sideEffects: importStyle
          ? [`${PACKAGE}/${cssDir}/base.css`, ...files.map((file) => `${PACKAGE}/${cssDir}/${file}`)]
          : undefined
      }
    }
  }
}

export default SurgeUIResolver
