import type { SurgeLocale } from './types'

/** Textes français : locale par défaut des composants */
export const fr: SurgeLocale = {
  code: 'fr',
  messages: {
    common: {
      loading: 'Chargement en cours…',
      close: 'Fermer'
    },
    formField: {
      required: 'requis'
    },
    alert: {
      dismiss: 'Fermer la notification'
    },
    avatar: {
      alt: 'Avatar de {name}',
      anonymous: 'utilisateur',
      initials: 'Avatar avec initiales de {name}',
      placeholder: 'Avatar par défaut',
      status: 'Statut : {status}',
      statusOnline: 'en ligne',
      statusOffline: 'hors ligne',
      statusBusy: 'occupé',
      statusAway: 'absent',
      notifications: { one: '{count} notification', other: '{count} notifications' }
    },
    image: {
      loading: '- Chargement en cours',
      error: '- Erreur de chargement',
      errorText: 'Erreur de chargement'
    },
    link: {
      external: '(s\'ouvre dans un nouvel onglet)'
    },
    progress: {
      indeterminate: 'En cours…'
    },
    spinner: {
      label: 'Chargement…'
    },
    textarea: {
      remaining: 'Caractères restants',
      overLimit: 'Limite de caractères dépassée'
    },
    selectBox: {
      placeholder: 'Sélectionnez une option…',
      searchPlaceholder: 'Rechercher…',
      noOptions: 'Aucune option disponible',
      noResults: 'Aucun résultat trouvé',
      clear: 'Effacer la sélection',
      removeTag: 'Retirer {label}',
      selectedCount: { one: '{count} élément sélectionné', other: '{count} éléments sélectionnés' },
      selected: '{label} sélectionné',
      deselected: '{label} désélectionné',
      removed: '{label} retiré de la sélection',
      cleared: 'Sélection effacée',
      maxReached: { one: '{count} élément sélectionnable au maximum', other: '{count} éléments sélectionnables au maximum' }
    },
    checkboxGroup: {
      maxReached: { one: '{count} sélection autorisée au maximum', other: '{count} sélections autorisées au maximum' }
    },
    slider: {
      min: 'minimum',
      max: 'maximum'
    },
    fileUpload: {
      placeholder: 'Sélectionnez des fichiers ou glissez-les ici',
      drop: 'Relâchez pour déposer les fichiers',
      browse: 'Parcourir',
      loading: 'Chargement…',
      loadingHint: 'Veuillez patienter',
      tooLarge: 'Le fichier « {name} » est trop volumineux ({size}). Taille maximale : {max}',
      invalidType: 'Le type de fichier « {type} » n\'est pas accepté pour « {name} »',
      maxFiles: 'Nombre maximum de fichiers dépassé ({max})',
      added: { one: 'Fichier « {name} » ajouté', other: '{count} fichiers ajoutés' },
      removed: 'Fichier « {name} » supprimé',
      cleared: 'Tous les fichiers ont été supprimés',
      selectedCount: { one: '{count} fichier sélectionné', other: '{count} fichiers sélectionnés' },
      preview: 'Aperçu de {name}',
      remove: 'Supprimer {name}',
      progress: 'Envoi de {name} : {progress} %',
      maxSize: 'Max {max}'
    },
    otpInput: {
      label: 'Code de vérification à {length} caractères',
      progress: { one: '{count} caractère saisi sur {length}', other: '{count} caractères saisis sur {length}' },
      character: 'Caractère {index} sur {length}'
    },
    password: {
      strength: 'Force du mot de passe : {score} %'
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Fermer la notification'
    },
    breadcrumb: {
      label: 'Fil d\'Ariane',
      expand: 'Afficher le chemin complet'
    },
    pagination: {
      label: 'Pagination',
      page: 'Page {page}',
      previous: 'Page précédente',
      next: 'Page suivante',
      first: 'Première page',
      last: 'Dernière page'
    },
    tag: {
      remove: 'Retirer {label}'
    },
    numberInput: {
      increment: 'Augmenter',
      decrement: 'Diminuer'
    },
    stepper: {
      label: 'Étapes',
      complete: 'terminée',
      error: 'à corriger'
    },
    confirm: {
      title: 'Confirmer l\'action ?',
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },
    autocomplete: {
      noResults: 'Aucune suggestion',
      loading: 'Recherche…',
      results: { one: '{count} suggestion', other: '{count} suggestions' },
      clear: 'Effacer'
    },
    dataTable: {
      selectAll: 'Tout sélectionner',
      selectRow: 'Sélectionner {label}',
      sortAscending: 'Trié par {column}, ordre croissant',
      sortDescending: 'Trié par {column}, ordre décroissant',
      sortCleared: 'Tri retiré',
      empty: 'Aucune donnée'
    },
    calendar: {
      previousMonth: 'Mois précédent',
      nextMonth: 'Mois suivant'
    },
    datePicker: {
      open: 'Choisir une date',
      openSelected: 'Changer la date, {date}',
      dialog: 'Calendrier',
      day: 'jj',
      month: 'mm',
      year: 'aaaa'
    },
    commandPalette: {
      label: 'Palette de commandes',
      placeholder: 'Rechercher une commande…',
      empty: 'Aucun résultat',
      results: { one: '{count} commande', other: '{count} commandes' }
    },
    gridLayout: {
      viewToggle: 'Affichage',
      grid: 'Grille',
      list: 'Liste'
    },
    holyGrailLayout: {
      skipLink: 'Aller au contenu principal',
      nav: 'Navigation principale',
      aside: 'Informations complémentaires'
    }
  }
}
