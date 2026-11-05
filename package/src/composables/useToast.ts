import { hasInjectionContext, inject, readonly, shallowRef, type InjectionKey, type Ref } from 'vue'
import type { ToastAction, ToastType } from '@/types'
import { announce } from './useAnnouncer'

// ============================================================
// TOASTS — file de notifications éphémères
//
// L'état est un store créé par `createToaster()` et fourni par le plugin
// (une instance par application : pas de fuite entre requêtes en SSR).
// `useToast()` le récupère ; hors plugin (tests, Storybook), un store
// par défaut est créé côté navigateur.
// Chaque toast est annoncé aux lecteurs d'écran par useAnnouncer
// (assertif pour une erreur) : SuToaster n'est pas une région live.
// ============================================================

export interface ToastOptions {
  /** Id choisi : un toast de même id est remplacé (ex. « Envoi… » → « Envoyé ») */
  id?: string
  type?: ToastType
  title?: string
  description?: string
  /** Durée d'affichage (ms) ; 0 = jusqu'à fermeture. Défaut : celle du SuToaster */
  duration?: number
  /** Bouton de fermeture (défaut : true) */
  dismissible?: boolean
  /** Bouton d'action (ex. « Annuler ») : ferme le toast après l'appel */
  action?: ToastAction
  /** Annonce aux lecteurs d'écran (défaut : true) */
  announce?: boolean
  /** Appelé quand le toast est retiré (fermeture, délai écoulé, action, clear) */
  onDismiss?: (toast: ToastItem) => void
}

export interface ToastItem extends ToastOptions {
  id: string
  type: ToastType
  dismissible: boolean
}

type TypedToastOptions = Omit<ToastOptions, 'type' | 'title'>

export interface Toaster {
  /** Toasts en cours, du plus ancien au plus récent */
  toasts: Readonly<Ref<readonly ToastItem[]>>
  /** Affiche un toast (un texte seul devient le titre) ; renvoie son id */
  show: (options: ToastOptions | string) => string
  success: (title: string, options?: TypedToastOptions) => string
  error: (title: string, options?: TypedToastOptions) => string
  warning: (title: string, options?: TypedToastOptions) => string
  info: (title: string, options?: TypedToastOptions) => string
  /** Modifie un toast affiché (relance son délai) */
  update: (id: string, options: Omit<ToastOptions, 'id'>) => void
  /** Retire un toast, ou tous sans argument */
  dismiss: (id?: string) => void
}

export const ToasterKey: InjectionKey<Toaster> = Symbol('SurgeToaster')

const announceToast = (toast: ToastItem) => {
  if (toast.announce === false) return
  const message = [toast.title, toast.description].filter(Boolean).join('. ')
  announce(message, { priority: toast.type === 'error' ? 'assertive' : 'polite' })
}

/** Crée un store de toasts (fourni par le plugin sous `ToasterKey`) */
export function createToaster(): Toaster {
  const toasts = shallowRef<ToastItem[]>([])
  let counter = 0

  const show = (input: ToastOptions | string): string => {
    const options = typeof input === 'string' ? { title: input } : input
    const id = options.id ?? `su-toast-${++counter}`
    const item: ToastItem = { type: 'neutral', dismissible: true, ...options, id }
    const exists = toasts.value.some((toast) => toast.id === id)
    toasts.value = exists
      ? toasts.value.map((toast) => (toast.id === id ? item : toast))
      : [...toasts.value, item]
    announceToast(item)
    return id
  }

  const typed = (type: ToastType) => (title: string, options: TypedToastOptions = {}) =>
    show({ ...options, type, title })

  const update = (id: string, options: Omit<ToastOptions, 'id'>) => {
    const current = toasts.value.find((toast) => toast.id === id)
    if (!current) return
    const item: ToastItem = { ...current, ...options, id }
    toasts.value = toasts.value.map((toast) => (toast.id === id ? item : toast))
    if (options.title !== undefined || options.description !== undefined) announceToast(item)
  }

  const dismiss = (id?: string) => {
    const removed = id === undefined ? toasts.value : toasts.value.filter((toast) => toast.id === id)
    if (!removed.length) return
    toasts.value = id === undefined ? [] : toasts.value.filter((toast) => toast.id !== id)
    removed.forEach((toast) => toast.onDismiss?.(toast))
  }

  return {
    toasts: readonly(toasts) as Readonly<Ref<readonly ToastItem[]>>,
    show,
    success: typed('success'),
    error: typed('error'),
    warning: typed('warning'),
    info: typed('info'),
    update,
    dismiss
  }
}

let defaultToaster: Toaster | undefined

/**
 * Accès aux toasts : celui fourni par le plugin, sinon un store par défaut
 * (navigateur uniquement : côté serveur, chaque appel reçoit un store neuf).
 *
 * @example
 * const toast = useToast()
 * toast.success('Projet enregistré', { action: { label: 'Annuler', onClick: undo } })
 */
export function useToast(): Toaster {
  const provided = hasInjectionContext() ? inject(ToasterKey, null) : null
  if (provided) return provided
  if (typeof window === 'undefined') return createToaster()
  defaultToaster ??= createToaster()
  return defaultToaster
}
