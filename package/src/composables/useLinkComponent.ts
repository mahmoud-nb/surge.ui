import { getCurrentInstance, inject, type Component, type InjectionKey } from 'vue'
import type { LinkTo } from '@/types'

// ============================================================
// LIENS DU ROUTEUR — props `to` des composants (Button, Link,
// Breadcrumb, Dropdown, CommandPalette, Tabs).
//
// Composant rendu : celui de l'option `linkComponent` du plugin
// (ex. NuxtLink), sinon RouterLink s'il est enregistré (Vue Router,
// Nuxt), sinon un simple <a href>. Aucune dépendance à vue-router.
// ============================================================

/** Composant de lien fourni par l'option `linkComponent` du plugin */
export const LinkComponentKey: InjectionKey<Component | string | undefined> = Symbol('SurgeLinkComponent')

interface RouterLike {
  push?: (to: LinkTo) => unknown
  resolve?: (to: LinkTo) => { href?: string }
}

export function useLinkComponent() {
  const instance = getCurrentInstance()
  const configured = inject(LinkComponentKey, undefined)
  const app = instance?.appContext.app
  const registered = app?.component('RouterLink')
  /** Composant de lien du routeur, ou undefined sans routeur */
  const component: Component | string | undefined = configured ?? registered
  const router = instance?.appContext.config.globalProperties.$router as RouterLike | undefined

  /** href d'une destination (repli <a>, ouverture dans un autre onglet) */
  const toHref = (to: LinkTo): string | undefined => {
    if (typeof to === 'string') return to
    try {
      const href = router?.resolve?.(to).href
      if (href) return href
    } catch {
      // Route inconnue : repli sur le chemin s'il est donné
    }
    const path = (to as { path?: unknown }).path
    return typeof path === 'string' ? path : undefined
  }

  /** Élément et attributs d'un lien vers `to` */
  const linkFor = (to: LinkTo): { is: Component | string; attrs: Record<string, unknown> } =>
    component ? { is: component, attrs: { to } } : { is: 'a', attrs: { href: toHref(to) } }

  /** Navigation par programme (option choisie dans une liste) */
  const navigate = (to: LinkTo) => {
    if (router?.push) return router.push(to)
    const href = toHref(to)
    if (href && typeof window !== 'undefined') window.location.assign(href)
  }

  return { component, linkFor, toHref, navigate }
}
