import { onMounted } from 'vue'

// ============================================================
// ANNONCES AUX LECTEURS D'ÉCRAN
//
// Une annonce n'est lue que si la région live EXISTE déjà quand son
// texte change : une région insérée avec son contenu est souvent
// ignorée. Les régions sont donc créées une fois (au montage du premier
// composant qui en a besoin), puis seul leur texte change.
//
// Quand un <dialog> modal est ouvert, le reste de la page est inerte et
// ses régions se taisent : l'annonce passe par une région placée dans
// le dialog du dessus.
// ============================================================

export type AnnouncePriority = 'polite' | 'assertive'

export interface AnnounceOptions {
  /** `assertive` interrompt la lecture en cours : à réserver aux erreurs */
  priority?: AnnouncePriority
  /** Délai avant d'effacer le message (ms) : un texte resté en place serait relu au curseur virtuel */
  clearAfter?: number
}

const REGION_ATTRIBUTE = 'data-su-announcer'
// Laisse aux lecteurs d'écran le temps de voir la région vide avant le message
const ANNOUNCE_DELAY = 100
const DEFAULT_CLEAR_AFTER = 5000

const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>[]>()

const isBrowser = () => typeof document !== 'undefined'

/** Dialog modal du dessus : le seul endroit encore accessible quand il est ouvert */
const getTopModal = (): HTMLElement | null => {
  const open = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog[open]'))
  for (let i = open.length - 1; i >= 0; i--) {
    try {
      if (open[i].matches(':modal')) return open[i]
    } catch {
      // :modal non pris en charge : on garde la région du document
      return null
    }
  }
  return null
}

const createRegion = (container: HTMLElement, priority: AnnouncePriority) => {
  const region = document.createElement('div')
  region.setAttribute(REGION_ATTRIBUTE, priority)
  region.setAttribute('aria-live', priority)
  region.setAttribute('aria-atomic', 'true')
  if (priority === 'polite') region.setAttribute('role', 'status')
  // Masquage accessible en style en ligne : fonctionne sans la feuille de style
  Object.assign(region.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: '0',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    border: '0'
  })
  container.appendChild(region)
  return region
}

/** Région live du conteneur (document ou dialog modal), créée au besoin */
const getRegion = (priority: AnnouncePriority, container: HTMLElement) => {
  const existing = Array.from(container.querySelectorAll<HTMLElement>(`[${REGION_ATTRIBUTE}="${priority}"]`))
    .find((region) => region.parentElement === container)
  return { region: existing ?? createRegion(container, priority), created: !existing }
}

const clearTimers = (region: HTMLElement) => {
  timers.get(region)?.forEach(clearTimeout)
  timers.delete(region)
}

/**
 * Crée les régions live du document s'il n'en a pas encore.
 * Appelé au montage par `useAnnouncer` pour qu'elles précèdent la première annonce.
 */
export function ensureAnnouncerRegions(): void {
  if (!isBrowser() || !document.body) return
  getRegion('polite', document.body)
  getRegion('assertive', document.body)
}

/**
 * Annonce un message aux lecteurs d'écran, sans le rendre visible.
 * Utilisable hors composant (aucun effet côté serveur).
 */
export function announce(message: string, options: AnnounceOptions = {}): void {
  if (!isBrowser() || !document.body || !message) return

  const { priority = 'polite', clearAfter = DEFAULT_CLEAR_AFTER } = options
  const container = getTopModal() ?? document.body
  const { region, created } = getRegion(priority, container)

  // Vider d'abord : un message identique au précédent est ainsi relu
  clearTimers(region)
  region.textContent = ''

  const pending = [
    setTimeout(() => {
      region.textContent = message
    }, created ? ANNOUNCE_DELAY * 2 : ANNOUNCE_DELAY)
  ]
  if (clearAfter > 0) {
    pending.push(setTimeout(() => {
      region.textContent = ''
    }, ANNOUNCE_DELAY + clearAfter))
  }
  timers.set(region, pending)
}

/** Efface les messages en attente ou affichés */
export function clearAnnouncements(): void {
  if (!isBrowser()) return
  document.querySelectorAll<HTMLElement>(`[${REGION_ATTRIBUTE}]`).forEach((region) => {
    clearTimers(region)
    region.textContent = ''
  })
}

/**
 * Annonces accessibles depuis un composant.
 *
 * @example
 * const { announce } = useAnnouncer()
 * announce('3 résultats')
 * announce('Le fichier dépasse 5 Mo', { priority: 'assertive' })
 */
export function useAnnouncer() {
  onMounted(ensureAnnouncerRegions)

  return {
    announce,
    clear: clearAnnouncements
  }
}
