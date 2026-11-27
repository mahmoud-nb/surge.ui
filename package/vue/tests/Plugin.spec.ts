import { describe, expect, it } from 'vitest'
import { createApp, defineComponent } from 'vue'
import SurgeUI, * as library from '@/index'

// Composants exportés par le paquet : objets avec un rendu ou un setup
const exportedComponents = Object.entries(library).filter(
  ([name, value]) => /^[A-Z]/.test(name) && typeof value === 'object' && value !== null && ('setup' in value || 'render' in value)
)

// Racine vide : seule compte l'installation du plugin
const Root = defineComponent({ render: () => null })

describe('Plugin SurgeUI', () => {
  it('enregistre SuPopover (documenté, absent avant 3.2.0)', () => {
    const app = createApp(Root)
    app.use(SurgeUI)
    expect(app.component('SuPopover')).toBe(library.Popover)
  })

  it('enregistre chaque composant exporté sous le préfixe', () => {
    const app = createApp(Root)
    app.use(SurgeUI, { prefix: 'Ui' })

    expect(exportedComponents.length).toBeGreaterThan(70)
    const missing = exportedComponents.filter(([name, component]) => app.component(`Ui${name}`) !== component)
    expect(missing.map(([name]) => name)).toEqual([])
  })
})
