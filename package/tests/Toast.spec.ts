import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import Toaster from '@/components/organisms/Toaster.vue'
import Toast from '@/components/molecules/Toast.vue'
import { createToaster, ToasterKey, useToast, type Toaster as ToasterStore } from '@/composables/useToast'
import { clearAnnouncements } from '@/composables/useAnnouncer'

let wrapper: VueWrapper | undefined

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  clearAnnouncements()
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('createToaster', () => {
  it('ajoute, remplace (même id) et retire des toasts', () => {
    const toaster = createToaster()
    const onDismiss = vi.fn()
    const id = toaster.show({ title: 'Envoi…', onDismiss })
    toaster.success('Brouillon enregistré')
    expect(toaster.toasts.value.map((toast) => toast.title)).toEqual(['Envoi…', 'Brouillon enregistré'])

    // update fusionne (le callback reste), show avec le même id remplace
    toaster.update(id, { title: 'Envoyé', type: 'success' })
    expect(toaster.toasts.value[0]).toMatchObject({ id, title: 'Envoyé', type: 'success', dismissible: true })
    expect(toaster.toasts.value).toHaveLength(2)

    toaster.dismiss(id)
    expect(toaster.toasts.value).toHaveLength(1)
    expect(onDismiss).toHaveBeenCalledOnce()

    toaster.dismiss()
    expect(toaster.toasts.value).toHaveLength(0)
  })

  it('annonce le toast, en assertif pour une erreur', () => {
    const toaster = createToaster()
    toaster.error('Échec de l’envoi', { description: 'Réessayez plus tard' })
    vi.advanceTimersByTime(300)
    const assertive = document.querySelector('[data-su-announcer="assertive"]')
    expect(assertive?.textContent).toBe('Échec de l’envoi. Réessayez plus tard')
  })

  it('useToast lit le store fourni par l’application', () => {
    const provided = createToaster()
    let received: ToasterStore | undefined
    wrapper = mount(defineComponent({
      setup() {
        received = useToast()
        return () => h('div')
      }
    }), { global: { provide: { [ToasterKey as symbol]: provided } } })
    expect(received).toBe(provided)
  })
})

describe('SuToast', () => {
  it('se ferme après sa durée, sauf pendant une pause', async () => {
    wrapper = mount(Toast, { props: { title: 'Enregistré', duration: 1000 } })
    vi.advanceTimersByTime(600)
    await wrapper.setProps({ paused: true })
    vi.advanceTimersByTime(5000)
    expect(wrapper.emitted('dismiss')).toBeUndefined()

    await wrapper.setProps({ paused: false })
    vi.advanceTimersByTime(399)
    expect(wrapper.emitted('dismiss')).toBeUndefined()
    vi.advanceTimersByTime(1)
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['timeout'])
  })

  it('reste affiché avec une durée nulle', () => {
    wrapper = mount(Toast, { props: { title: 'Connexion perdue', duration: 0 } })
    vi.advanceTimersByTime(60_000)
    expect(wrapper.emitted('dismiss')).toBeUndefined()
  })

  it('appelle l’action puis se ferme', async () => {
    const onClick = vi.fn()
    wrapper = mount(Toast, { props: { title: 'Message archivé', action: { label: 'Annuler', onClick } } })
    await wrapper.find('.su-toast__action').trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['action'])
  })

  it('nomme le bouton de fermeture', () => {
    wrapper = mount(Toast, { props: { title: 'Enregistré' } })
    expect(wrapper.find('.su-toast__close').attributes('aria-label')).toBe('Fermer la notification')
  })
})

describe('SuToaster', () => {
  const mountToaster = (toaster: ToasterStore, props: Record<string, unknown> = {}) => {
    wrapper = mount(Toaster, {
      props,
      global: { provide: { [ToasterKey as symbol]: toaster } },
      attachTo: document.body
    })
    return wrapper
  }

  it('affiche les toasts dans une zone nommée, limitée à max', async () => {
    const toaster = createToaster()
    mountToaster(toaster, { max: 2 })
    toaster.show('Un')
    toaster.show('Deux')
    toaster.show('Trois')
    await nextTick()

    const region = wrapper!.find('section')
    expect(region.attributes('aria-label')).toBe('Notifications')
    expect(region.attributes('aria-live')).toBeUndefined()
    expect(wrapper!.findAll('.su-toast__title').map((title) => title.text())).toEqual(['Deux', 'Trois'])
  })

  it('retire un toast fermé par son bouton', async () => {
    const toaster = createToaster()
    mountToaster(toaster)
    toaster.show('Supprimé')
    await nextTick()
    await wrapper!.find('.su-toast__close').trigger('click')
    expect(toaster.toasts.value).toHaveLength(0)
  })

  it('suspend les délais au survol', async () => {
    const toaster = createToaster()
    mountToaster(toaster, { duration: 1000 })
    toaster.show('Enregistré')
    await flushPromises()

    await wrapper!.find('section').trigger('pointerenter')
    vi.advanceTimersByTime(5000)
    expect(toaster.toasts.value).toHaveLength(1)

    await wrapper!.find('section').trigger('pointerleave')
    vi.advanceTimersByTime(1000)
    expect(toaster.toasts.value).toHaveLength(0)
  })
})
