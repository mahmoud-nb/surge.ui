import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import SelectBox from '@/components/atoms/SelectBox.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

const options = [
  { value: 'apple', label: 'Pomme' },
  { value: 'banana', label: 'Banane' },
  { value: 'cherry', label: 'Cerise', disabled: true },
  { value: 'pear', label: 'Poire' }
]

const mountSelect = (props: Record<string, unknown> = {}) => {
  wrapper = mount(SelectBox, {
    props: {
      options,
      ariaLabel: 'Fruit',
      'onUpdate:modelValue': (value: unknown) => wrapper!.setProps({ modelValue: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const combobox = () => wrapper!.find('[role="combobox"]')
const press = async (key: string, target = combobox()) => {
  await target.trigger('keydown', { key })
  await flushPromises()
}
const activeLabel = () => {
  const id = combobox().attributes('aria-activedescendant')
  return id ? wrapper!.find(`[id="${id}"]`).text() : undefined
}

describe('SuSelectBox', () => {
  it('expose le motif combobox + listbox', async () => {
    mountSelect()
    expect(combobox().attributes('aria-expanded')).toBe('false')
    expect(combobox().attributes('aria-haspopup')).toBe('listbox')

    await press('ArrowDown')

    const listbox = wrapper!.find(`[id="${combobox().attributes('aria-controls')}"]`)
    expect(combobox().attributes('aria-expanded')).toBe('true')
    expect(listbox.attributes('role')).toBe('listbox')
    expect(listbox.findAll('[role="option"]')).toHaveLength(4)
  })

  it('suit l’option active avec aria-activedescendant en sautant les options désactivées', async () => {
    mountSelect()
    await press('ArrowDown')
    expect(activeLabel()).toBe('Pomme')

    await press('ArrowDown')
    await press('ArrowDown')
    expect(activeLabel()).toBe('Poire')

    await press('Home')
    expect(activeLabel()).toBe('Pomme')
    await press('End')
    expect(activeLabel()).toBe('Poire')
  })

  it('sélectionne avec Entrée, ferme la liste et garde le focus', async () => {
    mountSelect()
    ;(combobox().element as HTMLElement).focus()

    await press('ArrowDown')
    await press('ArrowDown')
    await press('Enter')

    expect(wrapper!.props('modelValue')).toBe('banana')
    expect(combobox().attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(combobox().element)
  })

  it('ferme avec Échap sans changer la valeur', async () => {
    mountSelect({ modelValue: 'apple' })
    await press('ArrowDown')
    await press('ArrowDown')
    await press('Escape')

    expect(combobox().attributes('aria-expanded')).toBe('false')
    expect(wrapper!.props('modelValue')).toBe('apple')
  })

  it('met en avant l’option choisie à l’ouverture', async () => {
    mountSelect({ modelValue: 'pear' })
    await press('ArrowDown')
    expect(activeLabel()).toBe('Poire')
  })

  it('saisie rapide : une lettre met en avant l’option suivante qui commence ainsi', async () => {
    mountSelect()
    await press('p')
    expect(activeLabel()).toBe('Pomme')

    await press('p')
    expect(activeLabel()).toBe('Poire')
  })

  it('sélection multiple : la liste reste ouverte et Retour arrière retire la dernière étiquette', async () => {
    mountSelect({ multiple: true, modelValue: [] })
    await press('ArrowDown')
    await press('Enter')
    await press('ArrowDown')
    await press('Enter')

    expect(wrapper!.props('modelValue')).toEqual(['apple', 'banana'])
    expect(combobox().attributes('aria-expanded')).toBe('true')
    expect(wrapper!.find('[role="listbox"]').attributes('aria-multiselectable')).toBe('true')

    await press('Escape')
    await press('Backspace')
    expect(wrapper!.props('modelValue')).toEqual(['apple'])
  })

  it('regroupe les options dans des groupes nommés', async () => {
    mountSelect({
      options: [],
      groups: [
        { label: 'Fruits', options: [{ value: 'apple', label: 'Pomme' }] },
        { label: 'Légumes', options: [{ value: 'leek', label: 'Poireau' }] }
      ]
    })
    await press('ArrowDown')

    const groups = wrapper!.findAll('[role="group"]')
    expect(groups).toHaveLength(2)
    const names = groups.map(group => wrapper!.find(`[id="${group.attributes('aria-labelledby')}"]`).text())
    expect(names).toEqual(['Fruits', 'Légumes'])
  })

  it('avec recherche : le champ porte l’option active et filtre la liste', async () => {
    mountSelect({ searchable: true })
    await press('ArrowDown')

    const search = wrapper!.find('input')
    expect(document.activeElement).toBe(search.element)

    await search.setValue('ba')
    await flushPromises()
    const id = search.attributes('aria-activedescendant')
    expect(wrapper!.find(`[id="${id}"]`).text()).toBe('Banane')
    expect(wrapper!.findAll('[role="option"]')).toHaveLength(1)
  })

  it('se ferme au pointerdown à l’extérieur', async () => {
    mountSelect()
    await press('ArrowDown')

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(combobox().attributes('aria-expanded')).toBe('false')
  })

  it('ne s’ouvre pas quand il est désactivé', async () => {
    mountSelect({ disabled: true })
    await press('ArrowDown')
    await combobox().trigger('click')

    expect(combobox().attributes('aria-expanded')).toBe('false')
    expect(combobox().attributes('aria-disabled')).toBe('true')
  })
})
