import { ref, computed, readonly, onMounted, onUnmounted } from 'vue'

// ============================================================
// TYPES
// ============================================================

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface BreakpointConfig {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

export interface UseBreakpointOptions {
  /** Surcharge des breakpoints par défaut */
  breakpoints?: BreakpointConfig
}

export interface BreakpointMatches {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}

// ============================================================
// BREAKPOINTS PAR DÉFAUT
// ============================================================

const DEFAULT_BREAKPOINTS: Required<BreakpointConfig> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Ordre croissant pour la résolution du breakpoint courant
const BREAKPOINT_ORDER: BreakpointKey[] = ['sm', 'md', 'lg', 'xl', '2xl']

// ============================================================
// SSR GUARD
// ============================================================

const isClient = typeof window !== 'undefined'

// ============================================================
// COMPOSABLE
// ============================================================

/**
 * Composable pour la détection réactive des breakpoints.
 *
 * Utilise `window.matchMedia` pour une détection performante
 * sans écouter l'événement `resize`. Compatible SSR (valeurs
 * neutres côté serveur).
 *
 * @example
 * ```ts
 * const { current, isUp, isDown, isBetween, matches } = useBreakpoint()
 *
 * // Breakpoint actif
 * current.value // 'md'
 *
 * // Vérifications
 * isUp('md')    // true si largeur >= 768px
 * isDown('lg')  // true si largeur < 1024px
 * isBetween('sm', 'lg') // true si >= 640px et < 1024px
 *
 * // Objet réactif complet
 * matches.value // { sm: true, md: true, lg: false, xl: false, '2xl': false }
 * ```
 */
export function useBreakpoint(options: UseBreakpointOptions = {}) {
  const breakpoints = { ...DEFAULT_BREAKPOINTS, ...options.breakpoints }

  // État réactif — chaque breakpoint a un ref indépendant
  const matchState = ref<BreakpointMatches>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  })

  // Stockage des MediaQueryList pour le nettoyage
  const mediaQueries = new Map<BreakpointKey, MediaQueryList>()
  const cleanupFns: (() => void)[] = []

  // ========================================
  // Initialisation des MediaQueryList
  // ========================================

  const setupMediaQueries = () => {
    if (!isClient) return

    for (const key of BREAKPOINT_ORDER) {
      const minWidth = breakpoints[key]
      const mql = window.matchMedia(`(min-width: ${minWidth}px)`)

      // État initial
      matchState.value[key] = mql.matches

      // Listener réactif
      const handler = (event: MediaQueryListEvent) => {
        matchState.value = { ...matchState.value, [key]: event.matches }
      }

      mql.addEventListener('change', handler)
      mediaQueries.set(key, mql)
      cleanupFns.push(() => mql.removeEventListener('change', handler))
    }
  }

  // ========================================
  // Nettoyage
  // ========================================

  const cleanup = () => {
    cleanupFns.forEach(fn => fn())
    cleanupFns.length = 0
    mediaQueries.clear()
  }

  // ========================================
  // API — current
  // ========================================

  /**
   * Nom du breakpoint actif le plus large.
   * Retourne 'xs' si aucun breakpoint n'est atteint.
   */
  const current = computed<BreakpointKey | 'xs'>(() => {
    // Parcourir du plus grand au plus petit
    for (let i = BREAKPOINT_ORDER.length - 1; i >= 0; i--) {
      const key = BREAKPOINT_ORDER[i]
      if (matchState.value[key]) return key
    }
    return 'xs'
  })

  // ========================================
  // API — isUp / isDown / isBetween
  // ========================================

  /**
   * Retourne `true` si la largeur est >= au breakpoint donné.
   */
  const isUp = (breakpoint: BreakpointKey): boolean => {
    return matchState.value[breakpoint] ?? false
  }

  /**
   * Retourne `true` si la largeur est < au breakpoint donné.
   */
  const isDown = (breakpoint: BreakpointKey): boolean => {
    return !matchState.value[breakpoint]
  }

  /**
   * Retourne `true` si la largeur est >= min et < max.
   */
  const isBetween = (min: BreakpointKey, max: BreakpointKey): boolean => {
    return matchState.value[min] && !matchState.value[max]
  }

  // ========================================
  // API — matches (lecture seule)
  // ========================================

  const matches = readonly(matchState)

  // ========================================
  // API — width (valeur numérique)
  // ========================================

  const width = ref(isClient ? window.innerWidth : 0)
  let resizeCleanup: (() => void) | null = null

  const setupResizeObserver = () => {
    if (!isClient) return

    width.value = window.innerWidth

    // Utiliser ResizeObserver sur documentElement pour éviter
    // le spam de l'événement resize (plus performant)
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        width.value = window.innerWidth
      })
      ro.observe(document.documentElement)
      resizeCleanup = () => ro.disconnect()
    } else {
      // Fallback pour les anciens navigateurs
      const handler = () => { width.value = window.innerWidth }
      window.addEventListener('resize', handler, { passive: true })
      resizeCleanup = () => window.removeEventListener('resize', handler)
    }
  }

  // ========================================
  // Lifecycle
  // ========================================

  onMounted(() => {
    setupMediaQueries()
    setupResizeObserver()
  })

  onUnmounted(() => {
    cleanup()
    resizeCleanup?.()
  })

  // ========================================
  // API publique
  // ========================================

  return {
    /** Breakpoint actif le plus large ('xs' si aucun) */
    current,

    /** Largeur du viewport en pixels (réactif) */
    width: readonly(width),

    /** Objet réactif { sm: bool, md: bool, lg: bool, xl: bool, '2xl': bool } */
    matches,

    /** true si largeur >= breakpoint */
    isUp,

    /** true si largeur < breakpoint */
    isDown,

    /** true si largeur >= min et < max */
    isBetween,

    /** Configuration des breakpoints utilisée */
    breakpoints: readonly(ref(breakpoints)),
  }
}
