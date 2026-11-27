export interface SurgeUIResolverOptions {
  /** Préfixe des composants dans les templates (défaut : 'Su') */
  prefix?: string
  /**
   * Importe aussi le CSS des composants utilisés (`@surgeui/vue/css/…`),
   * à la place de `style.css` : `true`, ou `'layer'` pour la couche CSS
   * `surgeui` (Tailwind 4). Défaut : false (importez alors `style.css`).
   */
  importStyle?: boolean | 'layer'
}

export interface SurgeUIComponentResolveResult {
  name: string
  from: string
  sideEffects?: string[]
}

/** Résolveur au format d'unplugin-vue-components (`resolvers: [SurgeUIResolver()]`) */
export interface SurgeUIComponentResolver {
  type: 'component'
  resolve: (name: string) => SurgeUIComponentResolveResult | undefined
}

export declare function SurgeUIResolver(options?: SurgeUIResolverOptions): SurgeUIComponentResolver

export default SurgeUIResolver
