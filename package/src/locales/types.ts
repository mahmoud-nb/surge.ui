// ============================================================
// LOCALES — textes par défaut des composants (libellés, annonces)
//
// Un message est une chaîne avec des paramètres `{nom}`, ou un objet de
// formes plurielles choisies avec Intl.PluralRules selon `{count}` :
//   selectedCount: { one: '{count} fichier', other: '{count} fichiers' }
// ============================================================

/** Formes plurielles (catégories d'Intl.PluralRules) ; `other` est obligatoire */
export type PluralMessage = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

export type LocaleMessage = string | PluralMessage

export interface SurgeMessages {
  common: {
    /** Chargement générique (Button, Avatar, Dropdown…) */
    loading: LocaleMessage
    /** Bouton de fermeture (Dialog, Popover) */
    close: LocaleMessage
  }
  formField: {
    /** Infobulle de l'astérisque des champs requis */
    required: LocaleMessage
  }
  alert: {
    dismiss: LocaleMessage
  }
  avatar: {
    /** Texte alternatif de l'image : {name} */
    alt: LocaleMessage
    /** Nom utilisé quand aucun n'est fourni */
    anonymous: LocaleMessage
    /** Avatar à initiales : {name} */
    initials: LocaleMessage
    /** Avatar sans image ni initiales */
    placeholder: LocaleMessage
    /** Statut : {status} */
    status: LocaleMessage
    statusOnline: LocaleMessage
    statusOffline: LocaleMessage
    statusBusy: LocaleMessage
    statusAway: LocaleMessage
    /** Pastille : {count} */
    notifications: LocaleMessage
  }
  image: {
    /** Suffixe du nom pendant le chargement */
    loading: LocaleMessage
    /** Suffixe du nom en cas d'erreur */
    error: LocaleMessage
    /** Texte visible en cas d'erreur */
    errorText: LocaleMessage
  }
  link: {
    /** Précision lue pour un lien externe */
    external: LocaleMessage
  }
  progress: {
    indeterminate: LocaleMessage
  }
  spinner: {
    label: LocaleMessage
  }
  textarea: {
    remaining: LocaleMessage
    overLimit: LocaleMessage
  }
  selectBox: {
    placeholder: LocaleMessage
    searchPlaceholder: LocaleMessage
    noOptions: LocaleMessage
    noResults: LocaleMessage
    clear: LocaleMessage
    /** Bouton de retrait d'une étiquette : {label} */
    removeTag: LocaleMessage
    /** Plusieurs valeurs choisies : {count} */
    selectedCount: LocaleMessage
    /** Annonces : {label} */
    selected: LocaleMessage
    deselected: LocaleMessage
    removed: LocaleMessage
    cleared: LocaleMessage
    /** Limite atteinte : {count} */
    maxReached: LocaleMessage
  }
  checkboxGroup: {
    /** Limite atteinte : {count} */
    maxReached: LocaleMessage
  }
  slider: {
    /** Suffixes du nom des curseurs d'une plage */
    min: LocaleMessage
    max: LocaleMessage
  }
  fileUpload: {
    placeholder: LocaleMessage
    drop: LocaleMessage
    browse: LocaleMessage
    loading: LocaleMessage
    loadingHint: LocaleMessage
    /** {name}, {size}, {max} */
    tooLarge: LocaleMessage
    /** {name}, {type} */
    invalidType: LocaleMessage
    /** {max} */
    maxFiles: LocaleMessage
    /** {count}, {name} (premier fichier) */
    added: LocaleMessage
    /** {name} */
    removed: LocaleMessage
    cleared: LocaleMessage
    /** {count} */
    selectedCount: LocaleMessage
    /** {name} */
    preview: LocaleMessage
    /** {name} */
    remove: LocaleMessage
    /** {name}, {progress} */
    progress: LocaleMessage
    /** Taille maximale affichée : {max} */
    maxSize: LocaleMessage
  }
  otpInput: {
    /** {length} */
    label: LocaleMessage
    /** {count}, {length} */
    progress: LocaleMessage
    /** {index}, {length} */
    character: LocaleMessage
  }
  password: {
    /** {score} */
    strength: LocaleMessage
  }
  gridLayout: {
    viewToggle: LocaleMessage
    grid: LocaleMessage
    list: LocaleMessage
  }
  holyGrailLayout: {
    skipLink: LocaleMessage
    nav: LocaleMessage
    aside: LocaleMessage
  }
}

export interface SurgeLocale {
  /** Code BCP 47 (`fr`, `en`, `fr-CA`…) : règles de pluriel et formats */
  code: string
  messages: SurgeMessages
}

/** Locale partielle : seuls les messages fournis remplacent ceux de la base */
export interface SurgeLocaleInput {
  code?: string
  messages?: { [N in keyof SurgeMessages]?: Partial<SurgeMessages[N]> }
}

/** Clé d'un message : `espace.message` (ex. `selectBox.clear`) */
export type MessageKey = {
  [N in keyof SurgeMessages]: `${N}.${Extract<keyof SurgeMessages[N], string>}`
}[keyof SurgeMessages]

export type MessageParams = Record<string, string | number | undefined>
