import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
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
      // Sur place : wrapper.find ne voit pas le contenu téléporté (testé à part)
      teleport: false,
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

describe('SuDialog — téléportation', () => {
  // Hôte : conteneur avec son propre contexte (sens, langue, thème) et une
  // règle de type space-y-* qui ne doit plus atteindre le <dialog>
  const Host = defineComponent({
    __scopeId: 'data-v-host',
    props: { open: { type: Boolean, default: false } },
    setup(props) {
      return () =>
        h('section', { dir: 'rtl', lang: 'ar', 'data-theme': 'ocean', 'data-theme-mode': 'dark', class: 'space-y-6' }, [
          h('p', 'Avant'),
          h(Dialog, { modelValue: props.open, title: 'Titre', class: 'mon-dialog', 'data-testid': 'dlg' }, () => 'Contenu')
        ])
    }
  })

  let host: VueWrapper | undefined
  afterEach(() => {
    host?.unmount()
    host = undefined
  })

  const dialog = () => document.querySelector('dialog') as HTMLDialogElement

  it('rend le <dialog> dans <body>, hors du DOM du parent', async () => {
    host = mount(Host, { attachTo: document.body })
    await flushPromises()

    expect(dialog().parentElement).toBe(document.body)
    expect(host.find('section dialog').exists()).toBe(false)
  })

  it("recopie le sens, la langue et le thème de l'emplacement d'origine", async () => {
    host = mount(Host, { attachTo: document.body })
    await host.setProps({ open: true })
    await flushPromises()

    const el = dialog()
    expect(el.open).toBe(true)
    expect(el.getAttribute('dir')).toBe('rtl')
    expect(el.getAttribute('lang')).toBe('ar')
    expect(el.getAttribute('data-theme')).toBe('ocean')
    expect(el.getAttribute('data-theme-mode')).toBe('dark')
  })

  it('garde les attributs du parent et ses styles scoped sur le <dialog>', async () => {
    host = mount(Host, { attachTo: document.body })
    await flushPromises()

    const el = dialog()
    expect(el.classList.contains('su-dialog')).toBe(true)
    expect(el.classList.contains('mon-dialog')).toBe(true)
    expect(el.getAttribute('data-testid')).toBe('dlg')
    expect(el.hasAttribute('data-v-host')).toBe(true)
  })

  it("s'ouvre déjà téléporté quand modelValue est vrai au montage", async () => {
    host = mount(Host, { props: { open: true }, attachTo: document.body })
    await flushPromises()

    expect(dialog().parentElement).toBe(document.body)
    expect(dialog().open).toBe(true)
  })

  it('reste sur place avec teleport à false', async () => {
    wrapper = mount(Dialog, { props: { modelValue: false, teleport: false }, attachTo: document.body })
    await flushPromises()

    expect(wrapper.find('dialog').exists()).toBe(true)
  })
})

describe('SuDialog — rendu serveur', () => {
  it('rend le <dialog> sur place côté serveur (hydratation sans écart)', async () => {
    const { createSSRApp } = await import('vue')
    const { renderToString } = await import('vue/server-renderer')
    const html = await renderToString(createSSRApp({ render: () => h('main', [h(Dialog, { title: 'Titre' })]) }))

    expect(html).toMatch(/<main><!--teleport start--><dialog[^>]*class="su-dialog/)
  })
})

describe('SuDialog — tiroirs start / end', () => {
  it('display="start" / "end" : tiroirs du côté du sens de lecture', () => {
    mountDialog({ display: 'start' })
    expect(wrapper!.find('dialog').classes()).toContain('su-dialog--start')
    wrapper!.unmount()

    mountDialog({ display: 'end' })
    expect(wrapper!.find('dialog').classes()).toContain('su-dialog--end')
  })

  it('left / right sont des alias de start / end (ancienne classe conservée)', () => {
    mountDialog({ display: 'left' })
    expect(wrapper!.find('dialog').classes()).toEqual(expect.arrayContaining(['su-dialog--start', 'su-dialog--left']))
    wrapper!.unmount()

    mountDialog({ display: 'right' })
    expect(wrapper!.find('dialog').classes()).toEqual(expect.arrayContaining(['su-dialog--end', 'su-dialog--right']))
  })
})
