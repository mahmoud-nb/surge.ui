import { onScopeDispose, readonly, ref } from 'vue'

// ============================================================
// PRESSE-PAPIERS — copie d'un texte, état « copié » temporaire.
// API Clipboard (contexte sécurisé : HTTPS, localhost), sinon repli
// sur execCommand('copy') (HTTP, anciens navigateurs). Sans effet
// côté serveur. Ne fait pas d'annonce : au composant de l'annoncer
// (useAnnouncer), comme SuCopyButton.
// ============================================================

export interface UseClipboardOptions {
  /** Durée de l'état `copied` après une copie réussie (ms) */
  timeout?: number
}

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

/** Repli : sélection d'un champ caché puis commande de copie */
const legacyCopy = (text: string): boolean => {
  const previous = document.activeElement as HTMLElement | null
  // Dans un dialog modal, le reste de la page est inerte : le champ y est posé
  const host = previous?.closest('dialog[open]') ?? document.body
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.setAttribute('aria-hidden', 'true')
  field.style.position = 'fixed'
  field.style.insetBlockStart = '0'
  field.style.opacity = '0'
  field.style.pointerEvents = 'none'
  host.append(field)
  field.select()
  let done = false
  try {
    done = document.execCommand('copy')
  } finally {
    field.remove()
    previous?.focus({ preventScroll: true })
  }
  return done
}

/**
 * Copie dans le presse-papiers.
 *
 * @example
 * const { copy, copied } = useClipboard()
 * await copy('npm install @surgeui/vue') // true si la copie a réussi
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000 } = options

  const copied = ref(false)
  const error = ref<unknown>(null)
  const isSupported = isBrowser() && (!!navigator.clipboard?.writeText || typeof document.execCommand === 'function')

  let timer: ReturnType<typeof setTimeout> | undefined
  const reset = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
    copied.value = false
  }

  /** Copie `text` ; renvoie true si la copie a réussi */
  const copy = async (text: string): Promise<boolean> => {
    if (!isBrowser()) return false
    reset()
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext !== false) {
        await navigator.clipboard.writeText(text)
      } else if (!legacyCopy(text)) {
        throw new Error('Copie refusée par le navigateur')
      }
    } catch (cause) {
      error.value = cause
      return false
    }
    error.value = null
    copied.value = true
    if (timeout > 0) timer = setTimeout(reset, timeout)
    return true
  }

  onScopeDispose(reset)

  return {
    copy,
    /** Vrai pendant `timeout` ms après une copie réussie */
    copied: readonly(copied),
    /** Erreur de la dernière copie, ou null */
    error: readonly(error),
    /** Copie possible dans ce navigateur */
    isSupported,
    reset
  }
}
