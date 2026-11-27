/* eslint-disable vue/one-component-per-file -- composants de test définis sur place */
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import SurgeUI, { Price } from '@/index'
import SelectBox from '@/components/atoms/SelectBox.vue'
import Button from '@/components/atoms/Button.vue'
import { defineLocale, formatMessage, matchLocale, provideLocale, useLocale } from '@/composables/useLocale'
import { ar, en, fr, locales } from '@/locales'

describe('formatMessage', () => {
  it('remplace les paramètres', () => {
    expect(formatMessage('Retirer {label}', { label: 'Pomme' })).toBe('Retirer Pomme')
  })

  it('laisse un paramètre absent tel quel', () => {
    expect(formatMessage('Bonjour {name}')).toBe('Bonjour {name}')
  })

  it('choisit la forme plurielle selon la langue', () => {
    const message = { one: '{count} fichier', other: '{count} fichiers' }
    // En français, 0 et 1 sont au singulier ; en anglais, seulement 1
    expect(formatMessage(message, { count: 0 }, 'fr')).toBe('0 fichier')
    expect(formatMessage(message, { count: 2 }, 'fr')).toBe('2 fichiers')
    expect(formatMessage({ one: '{count} file', other: '{count} files' }, { count: 0 }, 'en')).toBe('0 files')
  })
})

describe('useLocale', () => {
  const Probe = defineComponent({
    setup() {
      const { t, formatBytes } = useLocale()
      return () => h('p', `${t('selectBox.clear')} | ${t('fileUpload.selectedCount', { count: 3 })} | ${formatBytes(1536)}`)
    }
  })

  it('utilise le français sans configuration', () => {
    const wrapper = mount(Probe)
    expect(wrapper.text()).toContain('Effacer la sélection | 3 fichiers sélectionnés')
  })

  it('suit la locale du plugin', () => {
    const wrapper = mount(Probe, { global: { plugins: [[SurgeUI, { locale: en }]] } })
    expect(wrapper.text()).toContain('Clear selection | 3 files selected')
  })

  it('formate les tailles de fichier dans la langue courante', () => {
    expect(mount(Probe).text()).toMatch(/1,5\s?ko/)
    expect(mount(Probe, { global: { plugins: [[SurgeUI, { locale: en }]] } }).text()).toMatch(/1\.5\s?kB/i)
  })

  it('complète la locale avec des messages partiels', () => {
    const custom = defineLocale(en, { messages: { selectBox: { clear: 'Reset' } } })
    expect(custom.messages.selectBox.clear).toBe('Reset')
    expect(custom.messages.selectBox.placeholder).toBe(en.messages.selectBox.placeholder)
    expect(custom.code).toBe('en')
  })

  it('provideLocale s’applique au sous-arbre et suit une ref', async () => {
    const lang = ref<'fr' | 'en'>('fr')
    const Root = defineComponent({
      setup() {
        provideLocale(() => (lang.value === 'en' ? en : fr))
        return () => h(Probe)
      }
    })
    const wrapper = mount(Root)
    expect(wrapper.text()).toContain('Effacer la sélection')

    lang.value = 'en'
    await nextTick()
    expect(wrapper.text()).toContain('Clear selection')
  })
})

describe('textes des composants', () => {
  it('le placeholder de la SelectBox vient de la locale', () => {
    const wrapper = mount(SelectBox, {
      props: { options: [] },
      global: { plugins: [[SurgeUI, { locale: en }]] }
    })
    expect(wrapper.text()).toContain('Select an option…')
  })

  it('une prop explicite reste prioritaire sur la locale', () => {
    const wrapper = mount(SelectBox, {
      props: { options: [], placeholder: 'Choisir un fruit' },
      global: { plugins: [[SurgeUI, { locale: en }]] }
    })
    expect(wrapper.text()).toContain('Choisir un fruit')
  })

  it('le libellé de chargement du bouton suit la locale', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      global: { plugins: [[SurgeUI, { locale: en }]] }
    })
    expect(wrapper.find('.su-spinner__label').text()).toBe('Loading…')
  })
})

describe('Locales fournies', () => {
  // Clés « namespace.message » d'une locale, pour comparer les structures
  const keysOf = (messages: object) =>
    Object.entries(messages).flatMap(([namespace, values]) => Object.keys(values).map((name) => `${namespace}.${name}`)).sort()

  it('en et ar ont exactement les messages de fr', () => {
    expect(keysOf(en.messages)).toEqual(keysOf(fr.messages))
    expect(keysOf(ar.messages)).toEqual(keysOf(fr.messages))
  })

  it('ar : formes plurielles zero, one, two, few, many, other', () => {
    const message = ar.messages.fileUpload.selectedCount
    const forms = [0, 1, 2, 3, 11, 100].map((count) => formatMessage(message, { count }, 'ar'))
    expect(forms).toEqual([
      'لم يُحدَّد أي ملف',
      'ملف واحد محدد',
      'ملفان محددان',
      '3 ملفات محددة',
      '11 ملفًا محددًا',
      '100 ملف محدد'
    ])
  })
})

describe('matchLocale', () => {
  it('retrouve la locale fournie et garde le code complet pour Intl', () => {
    expect(matchLocale('fr')).toBe(fr)
    expect(matchLocale('fr-CA').messages).toBe(fr.messages)
    expect(matchLocale('fr-CA').code).toBe('fr-CA')
    expect(matchLocale('ar-EG').messages).toBe(ar.messages)
    expect(matchLocale('ar-EG').code).toBe('ar-EG')
    expect(matchLocale('EN_gb').messages).toBe(en.messages)
  })

  it("se replie sur l'anglais pour une langue sans traduction ou vide", () => {
    expect(matchLocale('de')).toBe(en)
    expect(matchLocale('')).toBe(en)
    expect(matchLocale(undefined, fr)).toBe(fr)
  })
})

describe("Plugin : locale 'auto'", () => {
  const Probe = defineComponent({
    setup() {
      const { t } = useLocale()
      return () => h('p', t('common.close'))
    }
  })

  afterEach(() => document.documentElement.removeAttribute('lang'))

  it('suit <html lang>, y compris quand il change', async () => {
    document.documentElement.lang = 'en-US'
    const wrapper = mount(Probe, { global: { plugins: [[SurgeUI, { locale: 'auto' }]] } })
    expect(wrapper.text()).toBe('Close')

    document.documentElement.lang = 'ar'
    await flushPromises()
    expect(wrapper.text()).toBe('إغلاق')

    document.documentElement.lang = 'fr-FR'
    await flushPromises()
    expect(wrapper.text()).toBe('Fermer')

    // Langue sans traduction : anglais
    document.documentElement.lang = 'de'
    await flushPromises()
    expect(wrapper.text()).toBe('Close')
    wrapper.unmount()
  })

  it('sans option, le français reste la langue par défaut', () => {
    document.documentElement.lang = 'en'
    const wrapper = mount(Probe, { global: { plugins: [SurgeUI] } })
    expect(wrapper.text()).toBe('Fermer')
  })
})

describe('SuPrice et la locale', () => {
  // Montant et devise sont rendus dans des éléments séparés : comparaison sans espaces
  const text = (wrapper: { text: () => string }) => wrapper.text().replace(/\s/g, '')

  it('formate dans la langue des composants, sauf prop locale', () => {
    expect(text(mount(Price, { props: { amount: 1234.5 } }))).toContain('1234,50€')
    expect(text(mount(Price, { props: { amount: 1234.5 }, global: { plugins: [[SurgeUI, { locale: locales.en }]] } }))).toContain('€1,234.50')
    expect(text(mount(Price, { props: { amount: 1234.5, locale: 'fr-FR' }, global: { plugins: [[SurgeUI, { locale: locales.en }]] } }))).toContain('1234,50€')
  })

  it('nomme un montant invalide dans la langue des composants', () => {
    const wrapper = mount(Price, { props: { amount: Number.NaN }, global: { plugins: [[SurgeUI, { locale: locales.ar }]] } })
    expect(wrapper.find('[aria-label]').attributes('aria-label')).toBe('السعر غير متاح')
  })
})
