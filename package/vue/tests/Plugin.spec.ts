/* eslint-disable vue/one-component-per-file -- composants de test définis sur place */
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

describe('createSurgeUI (plugin à la carte)', () => {
  it('n’enregistre que les composants demandés, sous le préfixe', () => {
    const app = createApp(Root)
    app.use(library.createSurgeUI({ prefix: 'Ui', components: { Button: library.Button, Dialog: library.Dialog } }))
    expect(app.component('UiButton')).toBe(library.Button)
    expect(app.component('UiDialog')).toBe(library.Dialog)
    expect(app.component('UiInput')).toBeUndefined()
  })

  it('fournit la locale, les toasts et les confirmations comme le plugin complet', () => {
    const app = createApp(defineComponent({
      setup() {
        const { t } = library.useLocale()
        const toast = library.useToast()
        return () => `${t('common.close')}|${typeof toast.success}`
      }
    }))
    app.use(library.createSurgeUI({ locale: library.locales.en }))
    const host = document.createElement('div')
    app.mount(host)
    expect(host.textContent).toBe('Close|function')
    app.unmount()
  })
})
