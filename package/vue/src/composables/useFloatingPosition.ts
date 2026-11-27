import { onBeforeUnmount, ref, toValue, watch, nextTick, type MaybeRefOrGetter, type Ref } from 'vue'
import {
  arrow as arrowMiddleware,
  autoUpdate,
  computePosition,
  flip,
  offset as offsetMiddleware,
  shift,
  size,
  type Middleware,
  type Placement
} from '@floating-ui/dom'

export interface FloatingPositionOptions {
  /** Placement souhaité ; il est retourné automatiquement s'il manque de place */
  placement: MaybeRefOrGetter<Placement>
  /** Élément flottant affiché ou non */
  open: MaybeRefOrGetter<boolean>
  /** Distance entre la référence et l'élément flottant (px) */
  offset?: number
  /** Élément « flèche » à aligner sur la référence */
  arrow?: Ref<HTMLElement | undefined | null>
  /** Largeur minimale = largeur de la référence (listes déroulantes) */
  matchReferenceWidth?: boolean
  /** Marge minimale avec les bords de l'écran (px) */
  padding?: number
}

/**
 * Positionne un élément flottant (popover, menu, liste) contre sa référence.
 *
 * - Position `fixed` : l'élément n'est plus coupé par un parent en
 *   `overflow: hidden`.
 * - Retournement (flip) et décalage (shift) quand il manque de place.
 * - Suivi du défilement et du redimensionnement tant qu'il est ouvert.
 *
 * Renvoie le placement réellement appliqué, à utiliser pour orienter
 * la flèche et l'animation (`transform-origin`).
 */
export function useFloatingPosition(
  reference: Ref<HTMLElement | undefined | null>,
  floating: Ref<HTMLElement | undefined | null>,
  options: FloatingPositionOptions
) {
  const placement = ref<Placement>(toValue(options.placement))
  let cleanup: (() => void) | undefined

  const update = async () => {
    const referenceEl = reference.value
    const floatingEl = floating.value
    if (!referenceEl || !floatingEl) return

    const padding = options.padding ?? 8
    const middleware: Middleware[] = [
      offsetMiddleware(options.offset ?? 8),
      flip({ padding }),
      shift({ padding })
    ]

    if (options.matchReferenceWidth) {
      middleware.push(size({
        apply({ rects, elements }) {
          elements.floating.style.minWidth = `${rects.reference.width}px`
        }
      }))
    }

    if (options.arrow?.value) {
      middleware.push(arrowMiddleware({ element: options.arrow.value, padding: 12 }))
    }

    const result = await computePosition(referenceEl, floatingEl, {
      strategy: 'fixed',
      placement: toValue(options.placement),
      middleware
    })

    Object.assign(floatingEl.style, {
      position: 'fixed',
      left: `${result.x}px`,
      top: `${result.y}px`
    })
    floatingEl.dataset.placement = result.placement
    placement.value = result.placement

    const arrowEl = options.arrow?.value
    const arrowData = result.middlewareData.arrow
    if (arrowEl && arrowData) {
      Object.assign(arrowEl.style, {
        left: arrowData.x != null ? `${arrowData.x}px` : '',
        top: arrowData.y != null ? `${arrowData.y}px` : ''
      })
    }
  }

  const stop = () => {
    cleanup?.()
    cleanup = undefined
  }

  const start = () => {
    stop()
    if (!reference.value || !floating.value) return
    cleanup = autoUpdate(reference.value, floating.value, update)
  }

  // Le suivi ne tourne que pendant l'ouverture (rien côté serveur)
  watch(
    () => [toValue(options.open), toValue(options.placement), reference.value, floating.value] as const,
    async ([open]) => {
      if (typeof window === 'undefined') return
      if (open) {
        await nextTick()
        start()
      } else {
        stop()
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(stop)

  return { placement, update }
}
