import { getCurrentInstance, onBeforeUnmount, toValue, type MaybeRefOrGetter } from 'vue'

// ============================================================
// SAISIE RAPIDE (typeahead)
//
// Les lettres tapées à la suite forment un préfixe : « po » met en avant
// « Pomme ». Une même lettre répétée passe d'un élément à l'autre parmi
// ceux qui commencent par elle (« p », « p » : Pomme puis Poire).
// ============================================================

export interface TypeaheadOptions<T> {
  items: MaybeRefOrGetter<readonly T[]>
  /** Texte comparé au préfixe saisi */
  getLabel: (item: T) => string
  /** Éléments ignorés */
  isDisabled?: (item: T, index: number) => boolean
  /** Délai d'inactivité qui remet le préfixe à zéro (ms) */
  timeout?: number
}

export function useTypeahead<T>(options: TypeaheadOptions<T>) {
  const { getLabel, isDisabled, timeout = 500 } = options
  let buffer = ''
  let timer: ReturnType<typeof setTimeout> | undefined

  const reset = () => {
    clearTimeout(timer)
    buffer = ''
  }

  /**
   * Ajoute un caractère au préfixe et cherche l'élément correspondant.
   * @param fromIndex élément actif (-1 : aucun, la recherche part du début)
   * @returns index trouvé, ou -1
   */
  const search = (char: string, fromIndex: number): number => {
    clearTimeout(timer)
    buffer += char.toLocaleLowerCase()
    timer = setTimeout(() => { buffer = '' }, timeout)

    const list = toValue(options.items)
    if (!list.length) return -1

    // Même lettre répétée : on passe à l'élément suivant qui commence ainsi
    const repeated = [...buffer].every((c) => c === buffer[0])
    const query = repeated ? buffer[0] : buffer
    // Préfixe en cours : l'élément actif peut encore correspondre
    const offset = buffer.length === 1 || repeated ? 1 : 0
    const start = Math.max(fromIndex + offset, 0)

    for (let i = 0; i < list.length; i++) {
      const index = (start + i) % list.length
      const item = list[index]
      if (isDisabled?.(item, index)) continue
      if (getLabel(item).trim().toLocaleLowerCase().startsWith(query)) return index
    }
    return -1
  }

  if (getCurrentInstance()) onBeforeUnmount(reset)

  return {
    search,
    reset,
    /** Une saisie est en cours (Espace complète alors le préfixe) */
    isTyping: () => buffer.length > 0
  }
}
