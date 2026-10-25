import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import Dialog from '@/components/organisms/Dialog.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const mountDialog = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Dialog, {
    props: {
      title: 'Supprimer le projet',
      description: 'Cette action est définitive.',
      modelValue: false,
      'onUpdate:modelValue': (value: boolean) => wrapper?.setProps({ modelValue: value }),
      ...props
    },
    slots: { default: '<p>Contenu</p>' },
    attachTo: document.body
  })
  return wrapper
}

const dialogEl = () => wrapper!.find('dialog').element as HTMLDialogElement

describe('SuDialog', () => {
  it('s’ouvre sur un <dialog> natif nommé par son titre', async () => {
    mountDialog()
    await wrapper!.setProps({ modelValue: true })
    await flushPromises()

    const dialog = wrapper!.find('dialog')
    expect(dialogEl().open).toBe(true)
    expect(wrapper!.find(`[id="${dialog.attributes('aria-labelledby')}"]`).text()).toBe('Supprimer le projet')
    expect(wrapper!.find(`[id="${dialog.attributes('aria-describedby')}"]`).text()).toBe('Cette action est définitive.')
    expect(wrapper!.emitted('open')).toHaveLength(1)
  })

  it('se ferme sur l’événement cancel (Échap)', async () => {
    mountDialog({ modelValue: true })
    await flushPromises()

    await wrapper!.find('dialog').trigger('cancel')
    expect(wrapper!.props('modelValue')).toBe(false)
    expect(wrapper!.emitted('close')).toHaveLength(1)
  })

  it('ignore Échap quand closeOnEscape est faux', async () => {
    mountDialog({ modelValue: true, closeOnEscape: false })
    await flushPromises()

    await wrapper!.find('dialog').trigger('cancel')
    expect(wrapper!.props('modelValue')).toBe(true)
    expect(dialogEl().open).toBe(true)
  })

  it('se ferme au clic sur le fond, pas au clic dans le contenu', async () => {
    mountDialog({ modelValue: true })
    await flushPromises()

    // Geste commencé et terminé dans le contenu : rien ne se passe
    const content = wrapper!.find('.su-dialog-content')
    await content.trigger('pointerdown')
    await content.trigger('click')
    expect(wrapper!.props('modelValue')).toBe(true)

    // Geste sur le <dialog> lui-même (zone ::backdrop) : fermeture
    const dialog = wrapper!.find('dialog')
    await dialog.trigger('pointerdown')
    await dialog.trigger('click')
    expect(wrapper!.props('modelValue')).toBe(false)
  })

  it('rend le focus à l’élément déclencheur à la fermeture', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    mountDialog()
    await wrapper!.setProps({ modelValue: true })
    await flushPromises()

    await wrapper!.find('.su-dialog__close').trigger('click')
    expect(document.activeElement).toBe(trigger)
  })
})
