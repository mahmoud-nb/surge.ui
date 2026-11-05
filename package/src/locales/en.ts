import type { SurgeLocale } from './types'

/** Textes anglais */
export const en: SurgeLocale = {
  code: 'en',
  messages: {
    common: {
      loading: 'Loading…',
      close: 'Close'
    },
    formField: {
      required: 'required'
    },
    alert: {
      dismiss: 'Dismiss notification'
    },
    avatar: {
      alt: '{name}\'s avatar',
      anonymous: 'User',
      initials: 'Avatar with {name}\'s initials',
      placeholder: 'Default avatar',
      status: 'Status: {status}',
      statusOnline: 'online',
      statusOffline: 'offline',
      statusBusy: 'busy',
      statusAway: 'away',
      notifications: { one: '{count} notification', other: '{count} notifications' }
    },
    image: {
      loading: '- Loading',
      error: '- Failed to load',
      errorText: 'Failed to load'
    },
    link: {
      external: '(opens in a new tab)'
    },
    progress: {
      indeterminate: 'In progress…'
    },
    spinner: {
      label: 'Loading…'
    },
    textarea: {
      remaining: 'Characters remaining',
      overLimit: 'Character limit exceeded'
    },
    selectBox: {
      placeholder: 'Select an option…',
      searchPlaceholder: 'Search…',
      noOptions: 'No options available',
      noResults: 'No results found',
      clear: 'Clear selection',
      removeTag: 'Remove {label}',
      selectedCount: { one: '{count} item selected', other: '{count} items selected' },
      selected: '{label} selected',
      deselected: '{label} deselected',
      removed: '{label} removed from selection',
      cleared: 'Selection cleared',
      maxReached: { one: 'You can select up to {count} item', other: 'You can select up to {count} items' }
    },
    checkboxGroup: {
      maxReached: { one: 'You can select up to {count} option', other: 'You can select up to {count} options' }
    },
    slider: {
      min: 'minimum',
      max: 'maximum'
    },
    fileUpload: {
      placeholder: 'Select files or drag them here',
      drop: 'Drop files to upload',
      browse: 'Browse',
      loading: 'Loading…',
      loadingHint: 'Please wait',
      tooLarge: 'The file "{name}" is too large ({size}). Maximum size: {max}',
      invalidType: 'The file type "{type}" is not accepted for "{name}"',
      maxFiles: 'Maximum number of files exceeded ({max})',
      added: { one: 'File "{name}" added', other: '{count} files added' },
      removed: 'File "{name}" removed',
      cleared: 'All files have been removed',
      selectedCount: { one: '{count} file selected', other: '{count} files selected' },
      preview: 'Preview of {name}',
      remove: 'Remove {name}',
      progress: 'Uploading {name}: {progress}%',
      maxSize: 'Max {max}'
    },
    otpInput: {
      label: '{length}-character verification code',
      progress: { one: '{count} of {length} character entered', other: '{count} of {length} characters entered' },
      character: 'Character {index} of {length}'
    },
    password: {
      strength: 'Password strength: {score}%'
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Dismiss notification'
    },
    breadcrumb: {
      label: 'Breadcrumb',
      expand: 'Show full path'
    },
    pagination: {
      label: 'Pagination',
      page: 'Page {page}',
      previous: 'Previous page',
      next: 'Next page',
      first: 'First page',
      last: 'Last page'
    },
    tag: {
      remove: 'Remove {label}'
    },
    numberInput: {
      increment: 'Increase',
      decrement: 'Decrease'
    },
    stepper: {
      label: 'Steps',
      complete: 'completed',
      error: 'needs attention'
    },
    confirm: {
      title: 'Confirm this action?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    autocomplete: {
      noResults: 'No suggestions',
      loading: 'Searching…',
      results: { one: '{count} suggestion', other: '{count} suggestions' },
      clear: 'Clear'
    },
    dataTable: {
      selectAll: 'Select all',
      selectRow: 'Select {label}',
      sortAscending: 'Sorted by {column}, ascending',
      sortDescending: 'Sorted by {column}, descending',
      sortCleared: 'Sorting removed',
      empty: 'No data'
    },
    calendar: {
      previousMonth: 'Previous month',
      nextMonth: 'Next month'
    },
    datePicker: {
      open: 'Choose a date',
      openSelected: 'Change date, {date}',
      dialog: 'Calendar',
      day: 'dd',
      month: 'mm',
      year: 'yyyy'
    },
    commandPalette: {
      label: 'Command palette',
      placeholder: 'Search for a command…',
      empty: 'No results',
      results: { one: '{count} command', other: '{count} commands' }
    },
    gridLayout: {
      viewToggle: 'View',
      grid: 'Grid',
      list: 'List'
    },
    holyGrailLayout: {
      skipLink: 'Skip to main content',
      nav: 'Main navigation',
      aside: 'Additional information'
    }
  }
}
