import axe from 'axe-core'
import { expect } from 'vitest'

// Audit d'accessibilité axe-core d'un fragment monté (happy-dom).
// Désactivées : le contraste (pas de rendu ni de CSS dans les tests) et
// `region` (un composant isolé n'est pas dans un repère de page).
const options: axe.RunOptions = {
  rules: {
    'color-contrast': { enabled: false },
    region: { enabled: false }
  }
}

/** Échoue en listant chaque règle enfreinte et les éléments concernés */
export async function expectNoAxeViolations(context: Element | Document = document.body, extra: axe.RunOptions = {}) {
  const results = await axe.run(context, { ...options, ...extra, rules: { ...options.rules, ...extra.rules } })
  const violations = results.violations.map(
    (violation) => `${violation.id} — ${violation.help} : ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`
  )
  expect(violations).toEqual([])
}
