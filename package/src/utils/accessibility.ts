/**
 * Utilitaires pour l'accessibilité
 */

/**
 * Génère un ID unique pour les éléments
 */
let idCounter = 0
export function generateId(prefix: string = 'su'): string {
  return `${prefix}-${++idCounter}-${Date.now().toString(36)}`
}

/**
 * Vérifie si un élément est focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ]
  
  return focusableSelectors.some(selector => element.matches(selector))
}

/**
 * Gère le focus trap dans un conteneur
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
  }
  
  container.addEventListener('keydown', handleKeydown)
  
  // Focus le premier élément
  firstElement?.focus()
  
  // Retourne une fonction de nettoyage
  return () => {
    container.removeEventListener('keydown', handleKeydown)
  }
}

/**
 * Annonce un message aux lecteurs d'écran
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  // Supprime l'élément après l'annonce
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Vérifie si les animations sont réduites
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Vérifie si le mode de contraste élevé est activé
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

function linearizeChannel(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return 0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b)
}

/**
 * Calcule le ratio de contraste WCAG 2.1 entre deux couleurs hex
 */
export function getContrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground)
  const l2 = relativeLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Valide qu'un ratio de contraste respecte WCAG
 */
export function isContrastValid(ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean {
  const minRatio = level === 'AAA' ? 7 : 4.5
  return ratio >= minRatio
}