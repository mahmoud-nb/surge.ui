/* eslint-disable vue/one-component-per-file -- composants de test définis sur place */
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import SurgeUI from '@/index'
import SelectBox from '@/components/atoms/SelectBox.vue'
import Button from '@/components/atoms/Button.vue'
import { defineLocale, formatMessage, provideLocale, useLocale } from '@/composables/useLocale'
import { en, fr } from '@/locales'

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
