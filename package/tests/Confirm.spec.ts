import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import ConfirmDialog from '@/components/organisms/ConfirmDialog.vue'
import { ConfirmerKey, createConfirmer, type Confirmer } from '@/composables/useConfirm'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

const mountDialog = (confirmer: Confirmer) => {
  wrapper = mount(ConfirmDialog, {
    global: { provide: { [ConfirmerKey as symbol]: confirmer } },
    attachTo: document.body
  })
  return wrapper
}

const buttons = () => wrapper!.findAll('.su-dialog-footer button')

describe('createConfirmer', () => {
  it('se replie sur window.confirm sans SuConfirmDialog', async () => {
    const native = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const confirmer = createConfirmer()
    await expect(confirmer.confirm({ title: 'Supprimer ?', description: 'Définitif.' })).resolves.toBe(true)
    expect(native).toHaveBeenCalledWith('Supprimer ?\n\nDéfinitif.')
  })

  it('traite les demandes dans l’ordre', async () => {
    const confirmer = createConfirmer()
    confirmer.register()
    const first = confirmer.confirm('Première')
    const second = confirmer.confirm('Seconde')
    expect(confirmer.current.value?.title).toBe('Première')
    confirmer.settle(true)
    expect(confirmer.current.value?.title).toBe('Seconde')
    confirmer.settle(false)
    await expect(first).resolves.toBe(true)
    await expect(second).resolves.toBe(false)
    expect(confirmer.current.value).toBeNull()
  })

  it('refuse les demandes en attente quand le dialog disparaît', async () => {
    const confirmer = createConfirmer()
    const unregister = confirmer.register()
    const pending = confirmer.confirm('En attente')
    unregister()
    await expect(pending).resolves.toBe(false)
  })
})

describe('SuConfirmDialog', () => {
  it('affiche la demande dans un alertdialog et répond true', async () => {
    const confirmer = createConfirmer()
    mountDialog(confirmer)
    const answer = confirmer.confirm({ title: 'Publier l’article ?', description: 'Il sera visible de tous.' })
    await flushPromises()

    const dialog = wrapper!.find('dialog')
    expect(dialog.attributes('role')).toBe('alertdialog')
    expect(dialog.text()).toContain('Publier l’article ?')
    expect(buttons().map((button) => button.text())).toEqual(['Annuler', 'Confirmer'])

    await buttons()[1].trigger('click')
    await expect(answer).resolves.toBe(true)
  })

  it('répond false sur Annuler et sur Échap', async () => {
    const confirmer = createConfirmer()
    mountDialog(confirmer)

    const cancelled = confirmer.confirm('Quitter ?')
    await flushPromises()
    await buttons()[0].trigger('click')
    await expect(cancelled).resolves.toBe(false)

    const escaped = confirmer.confirm('Quitter ?')
    await flushPromises()
    await wrapper!.find('dialog').trigger('cancel')
    await expect(escaped).resolves.toBe(false)
  })

  it('action dangereuse : focus initial sur Annuler, fond inactif', async () => {
    const confirmer = createConfirmer()
    mountDialog(confirmer)
    confirmer.confirm({ title: 'Supprimer le projet ?', tone: 'danger', confirmLabel: 'Supprimer' })
    await flushPromises()

    const [cancel, confirm] = buttons()
    expect(cancel.attributes('autofocus')).toBeDefined()
    expect(confirm.attributes('autofocus')).toBeUndefined()
    expect(confirm.text()).toBe('Supprimer')
    expect(confirm.classes()).toContain('su-confirm-dialog__danger')
  })

  it('affiche la demande suivante après Échap', async () => {
    const confirmer = createConfirmer()
    mountDialog(confirmer)
    confirmer.confirm('Première')
    const second = confirmer.confirm('Seconde')
    await flushPromises()

    await wrapper!.find('dialog').trigger('cancel')
    await flushPromises()
    expect((wrapper!.find('dialog').element as HTMLDialogElement).open).toBe(true)
    expect(wrapper!.find('dialog').text()).toContain('Seconde')

    await buttons()[1].trigger('click')
    await expect(second).resolves.toBe(true)
  })
})
