import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
import { useClipboard } from '@/composables/useClipboard'
import CopyButton from '@/components/atoms/CopyButton.vue'
import CodeBlock from '@/components/molecules/CodeBlock.vue'
import Stat from '@/components/molecules/Stat.vue'
import Timeline from '@/components/organisms/Timeline.vue'
import Rating from '@/components/atoms/Rating.vue'
import Prose from '@/components/atoms/Prose.vue'
import FormField from '@/components/atoms/FormField.vue'
import { expectNoAxeViolations } from './axe'

// Données et contenu (4.0) : useClipboard, CopyButton, CodeBlock, Stat,
// Timeline, Rating, Prose — comportement et audit axe-core

let wrapper: VueWrapper | undefined
let writeText: ReturnType<typeof vi.fn>

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.useRealTimers()
  document.body.innerHTML = ''
})

const region = (priority: 'polite' | 'assertive') =>
  document.body.querySelector<HTMLElement>(`[data-su-announcer="${priority}"]`)

describe('useClipboard', () => {
  const mountClipboard = () => {
    let api!: ReturnType<typeof useClipboard>
    wrapper = mount(defineComponent({ setup: () => ((api = useClipboard({ timeout: 1000 })), () => h('div')) }))
    return api
  }

  it('copie, puis l’état « copié » retombe après le délai', async () => {
    vi.useFakeTimers()
    const clipboard = mountClipboard()

    expect(await clipboard.copy('npm install @surgeui/vue')).toBe(true)
    expect(writeText).toHaveBeenCalledWith('npm install @surgeui/vue')
    expect(clipboard.copied.value).toBe(true)

    vi.advanceTimersByTime(1000)
    expect(clipboard.copied.value).toBe(false)
  })

  it('signale l’échec (permission refusée)', async () => {
    writeText.mockRejectedValueOnce(new Error('NotAllowedError'))
    const clipboard = mountClipboard()

    expect(await clipboard.copy('texte')).toBe(false)
    expect(clipboard.copied.value).toBe(false)
    expect(clipboard.error.value).toBeInstanceOf(Error)
  })
})

describe('SuCopyButton', () => {
  it('copie, affiche « Copié » et l’annonce', async () => {
    wrapper = mount(CopyButton, { props: { value: 'SU-2026' }, attachTo: document.body })

    const button = wrapper.find('button')
    expect(button.text()).toBe('Copier')
    await button.trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledWith('SU-2026')
    expect(button.text()).toBe('Copié')
    expect(wrapper.emitted('copy')?.[0]).toEqual(['SU-2026'])
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(region('polite')?.textContent).toBe('Copié dans le presse-papiers')
    await expectNoAxeViolations()
  })

  it('icône seule : nom stable ; échec annoncé', async () => {
    writeText.mockRejectedValueOnce(new Error('NotAllowedError'))
    wrapper = mount(CopyButton, { props: { value: 'x', iconOnly: true, label: 'Copier la clé' }, attachTo: document.body })

    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBe('Copier la clé')
    await button.trigger('click')
    await flushPromises()

    expect(button.attributes('aria-label')).toBe('Copier la clé')
    expect(wrapper.emitted('error')).toHaveLength(1)
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(region('assertive')?.textContent).toBe('Impossible de copier')
    await expectNoAxeViolations()
  })
})

describe('SuCodeBlock', () => {
  const code = 'const a = 1\nconst b = 2\n'

  it('figure légendée, code et bouton de copie nommé', async () => {
    wrapper = mount(CodeBlock, { props: { code, title: 'main.ts', language: 'ts' }, attachTo: document.body })

    expect(wrapper.find('figure').attributes('data-language')).toBe('ts')
    expect(wrapper.find('figure > figcaption').text()).toContain('main.ts')
    expect(wrapper.find('pre code').text()).toBe(code.trim())
    expect(wrapper.find('pre code').classes()).toContain('language-ts')

    const copy = wrapper.find('.su-code-block__copy')
    expect(copy.attributes('aria-label')).toBe('Copier le code')
    await copy.trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith(code)
    await expectNoAxeViolations()
  })

  it('numéros de ligne, sans bouton de copie', () => {
    wrapper = mount(CodeBlock, { props: { code, lineNumbers: true, copyable: false } })

    expect(wrapper.findAll('.su-code-block__line')).toHaveLength(2)
    expect(wrapper.find('.su-code-block__copy').exists()).toBe(false)
    expect(wrapper.find('figcaption').exists()).toBe(false)
  })
})

describe('SuStat', () => {
  const fr = (value: number, options: Intl.NumberFormatOptions) => new Intl.NumberFormat('fr', options).format(value)

  it('valeur formatée, variation en hausse lue', async () => {
    wrapper = mount(Stat, {
      props: {
        label: 'Chiffre d’affaires',
        value: 12400,
        format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
        delta: 0.125,
        deltaLabel: 'vs mois dernier'
      },
      attachTo: document.body
    })

    expect(wrapper.find('.su-stat__value').text()).toBe(fr(12400, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }))
    const delta = wrapper.find('.su-stat__delta')
    expect(delta.classes()).toContain('su-stat__delta--positive')
    expect(delta.find('.sr-only').element.textContent).toBe('En hausse ')
    expect(delta.find('bdi').text()).toBe(fr(0.125, { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }))
    expect(wrapper.find('.su-stat__context').text()).toBe('vs mois dernier')
    await expectNoAxeViolations()
  })

  it('baisse favorable (invertTrend), texte libre, lien et chargement', async () => {
    wrapper = mount(Stat, { props: { label: 'Délai moyen', value: '2,4 j', delta: '−0,3 j', invertTrend: true, href: '/delais' } })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/delais')
    expect(wrapper.find('.su-stat__delta').classes()).toContain('su-stat__delta--positive')
    expect(wrapper.find('.su-stat__delta .sr-only').text()).toBe('En baisse')

    await wrapper.setProps({ loading: true })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.su-stat__value').exists()).toBe(false)
  })
})

describe('SuTimeline', () => {
  const now = new Date(2026, 10, 27, 15, 0)
  const items = [
    { id: 1, title: 'Commentaire ajouté', author: 'Camille', date: new Date(2026, 10, 27, 9, 30), icon: ChatBubbleLeftIcon },
    { id: 2, title: 'Tâche terminée', author: 'Léo', date: new Date(2026, 10, 26, 17, 5), variant: 'success' as const },
    { id: 3, title: 'Projet créé', date: new Date(2026, 10, 20, 8, 0), description: 'Refonte du site' }
  ]

  it('regroupe par jour : aujourd’hui, hier, date complète', async () => {
    wrapper = mount(Timeline, { props: { items, now }, attachTo: document.body })

    const days = wrapper.findAll('h3').map((heading) => heading.text())
    expect(days[0]).toBe('Aujourd’hui')
    expect(days[1]).toBe('Hier')
    expect(days[2]).toBe(new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(items[2].date).replace(/^./, (c) => c.toUpperCase()))

    const time = wrapper.find('time')
    expect(time.attributes('datetime')).toBe(items[0].date.toISOString())
    expect(time.text()).toBe(new Intl.DateTimeFormat('fr', { timeStyle: 'short' }).format(items[0].date))
    expect(wrapper.find('.su-timeline__meta').text()).toContain('Camille')
    expect(wrapper.findAll('.su-timeline__item')[1].classes()).toContain('su-timeline__item--success')
    await expectNoAxeViolations()
  })

  it('sans regroupement : une liste, date et heure', () => {
    wrapper = mount(Timeline, { props: { items, now, groupByDay: false, headingLevel: 4 } })

    expect(wrapper.findAll('h4')).toHaveLength(0)
    expect(wrapper.findAll('ol')).toHaveLength(1)
    expect(wrapper.find('time').text()).toBe(
      new Intl.DateTimeFormat('fr', { dateStyle: 'medium', timeStyle: 'short' }).format(items[0].date)
    )
  })
})

describe('SuRating', () => {
  it('groupe de boutons radio nommés, choix et remise à zéro', async () => {
    wrapper = mount(Rating, {
      props: { modelValue: 0, clearable: true, 'onUpdate:modelValue': (value: number) => wrapper?.setProps({ modelValue: value }) },
      attachTo: document.body
    })

    const group = wrapper.find('[role="radiogroup"]')
    expect(group.attributes('aria-label')).toBe('Note')
    const labels = wrapper.findAll('label').map((label) => label.text())
    expect(labels[0]).toBe('1 étoile sur 5')
    expect(labels[2]).toBe('3 étoiles sur 5')

    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios).toHaveLength(5)
    await radios[2].setValue(true)
    expect(wrapper.props('modelValue')).toBe(3)
    expect(wrapper.findAll('.su-rating__option--filled')).toHaveLength(3)

    await radios[2].trigger('click')
    expect(wrapper.props('modelValue')).toBe(0)
    await expectNoAxeViolations()
  })

  it('lecture seule : image nommée, étoiles partielles', async () => {
    wrapper = mount(Rating, { props: { modelValue: 4.5, readonly: true }, attachTo: document.body })

    const image = wrapper.find('[role="img"]')
    expect(image.attributes('aria-label')).toBe('Note : 4,5 sur 5')
    const fills = wrapper.findAll('.su-rating__fill').map((fill) => (fill.element as HTMLElement).style.inlineSize)
    expect(fills).toEqual(['100%', '100%', '100%', '100%', '50%'])
    expect(wrapper.find('input').exists()).toBe(false)
    await expectNoAxeViolations()
  })

  it('dans un SuFormField : nommé par le label, désactivé', async () => {
    wrapper = mount(FormField, {
      props: { label: 'Votre avis', disabled: true },
      slots: { default: () => h(Rating, { modelValue: 2 }) },
      attachTo: document.body
    })
    await nextTick()

    const group = wrapper.find('[role="radiogroup"]')
    const labelId = group.attributes('aria-labelledby')!
    expect(wrapper.find(`[id="${labelId}"]`).text()).toContain('Votre avis')
    expect(group.attributes('aria-label')).toBeUndefined()
    expect(wrapper.findAll('input').every((input) => (input.element as HTMLInputElement).disabled)).toBe(true)
    await expectNoAxeViolations()
  })
})

describe('SuProse', () => {
  it('contenu rédigé : élément choisi et audit', async () => {
    wrapper = mount(Prose, {
      props: { as: 'article', size: 'lg' },
      slots: {
        default: `
          <h2>Installation</h2>
          <p>Ajoutez le paquet <code>@surgeui/vue</code>, puis <a href="#plugin">le plugin</a>.</p>
          <ul><li>Vue 3.5+</li><li>Node 20+</li></ul>
          <blockquote><p>Une citation.</p></blockquote>
          <table><thead><tr><th>Prop</th><th>Type</th></tr></thead><tbody><tr><td>size</td><td>string</td></tr></tbody></table>
        `
      },
      attachTo: document.body
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toEqual(['su-prose', 'su-prose--lg'])
    await expectNoAxeViolations()
  })
})
