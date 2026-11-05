import { computed, hasInjectionContext, inject, shallowRef, type ComputedRef, type InjectionKey } from 'vue'

// ============================================================
// CONFIRMATIONS — `await confirm({...})` renvoie true ou false
//
// Même principe que useToast : un store créé par `createConfirmer()`,
// fourni par le plugin (une instance par application), affiché par
// SuConfirmDialog placé une fois dans l'application. Les demandes
// simultanées attendent leur tour.
// Sans SuConfirmDialog monté, repli sur window.confirm().
// ============================================================

export type ConfirmTone = 'default' | 'danger'

export interface ConfirmOptions {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** `danger` : bouton de confirmation rouge, focus initial sur Annuler */
  tone?: ConfirmTone
}

export interface ConfirmRequest extends ConfirmOptions {
  id: number
}

export interface Confirmer {
  /** Demande affichée (la première de la file) */
  current: ComputedRef<ConfirmRequest | null>
  /** Ouvre une confirmation (un texte seul devient le titre) */
  confirm: (options?: ConfirmOptions | string) => Promise<boolean>
  /** Répond à la demande affichée */
  settle: (value: boolean) => void
  /** Déclare un SuConfirmDialog monté ; renvoie la fonction de retrait */
  register: () => () => void
}

export const ConfirmerKey: InjectionKey<Confirmer> = Symbol('SurgeConfirmer')

interface Pending {
  request: ConfirmRequest
  resolve: (value: boolean) => void
}

/** Crée un store de confirmations (fourni par le plugin sous `ConfirmerKey`) */
export function createConfirmer(): Confirmer {
  const queue = shallowRef<Pending[]>([])
  let counter = 0
  let mounted = 0

  const confirm = (input: ConfirmOptions | string = {}): Promise<boolean> => {
    const options = typeof input === 'string' ? { title: input } : input

    if (!mounted) {
      if (typeof window === 'undefined' || typeof window.confirm !== 'function') return Promise.resolve(false)
      const message = [options.title, options.description].filter(Boolean).join('\n\n')
      return Promise.resolve(window.confirm(message))
    }

    return new Promise<boolean>((resolve) => {
      queue.value = [...queue.value, { request: { ...options, id: ++counter }, resolve }]
    })
  }

  const settle = (value: boolean) => {
    const [first, ...rest] = queue.value
    if (!first) return
    queue.value = rest
    first.resolve(value)
  }

  const register = () => {
    mounted++
    return () => {
      mounted--
      // Plus aucun dialog : les demandes en attente sont refusées
      if (!mounted) {
        const pending = queue.value
        queue.value = []
        pending.forEach(({ resolve }) => resolve(false))
      }
    }
  }

  return {
    current: computed(() => queue.value[0]?.request ?? null),
    confirm,
    settle,
    register
  }
}

let defaultConfirmer: Confirmer | undefined

/**
 * Confirmations : celles fournies par le plugin, sinon un store par
 * défaut (navigateur uniquement).
 *
 * @example
 * const { confirm } = useConfirm()
 * if (await confirm({ title: 'Supprimer le projet ?', tone: 'danger', confirmLabel: 'Supprimer' })) remove()
 */
export function useConfirm(): Confirmer {
  const provided = hasInjectionContext() ? inject(ConfirmerKey, null) : null
  if (provided) return provided
  if (typeof window === 'undefined') return createConfirmer()
  defaultConfirmer ??= createConfirmer()
  return defaultConfirmer
}
