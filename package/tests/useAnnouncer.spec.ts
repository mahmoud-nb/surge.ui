import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { announce, clearAnnouncements, ensureAnnouncerRegions, useAnnouncer } from '@/composables/useAnnouncer'
import { announceToScreenReader } from '@/utils/accessibility'

const region = (priority: 'polite' | 'assertive') =>
  document.body.querySelector<HTMLElement>(`[data-su-announcer="${priority}"]`)

beforeEach(() => {
  vi.useFakeTimers()
  document.body.innerHTML = ''
})

afterEach(() => {
  clearAnnouncements()
  vi.useRealTimers()
})

describe('useAnnouncer', () => {
  it('crée les régions live au montage, avant toute annonce', () => {
    const Host = defineComponent({
      setup() {
        useAnnouncer()
        return () => h('div')
      }
    })
    mount(Host, { attachTo: document.body })

    expect(region('polite')?.getAttribute('aria-live')).toBe('polite')
    expect(region('polite')?.getAttribute('role')).toBe('status')
    expect(region('assertive')?.getAttribute('aria-live')).toBe('assertive')
    expect(region('polite')?.textContent).toBe('')
  })

  it('écrit le message après un court délai, dans une région déjà présente', () => {
    ensureAnnouncerRegions()
    announce('3 résultats')

    expect(region('polite')?.textContent).toBe('')
    vi.advanceTimersByTime(100)
    expect(region('polite')?.textContent).toBe('3 résultats')
  })

  it('réutilise les mêmes régions', () => {
    announce('Premier')
    announce('Second')
    vi.runAllTimers()

    expect(document.querySelectorAll('[data-su-announcer="polite"]')).toHaveLength(1)
  })

  it('relit un message identique (la région est vidée entre deux annonces)', () => {
    ensureAnnouncerRegions()
    announce('Enregistré')
    vi.advanceTimersByTime(100)
    expect(region('polite')?.textContent).toBe('Enregistré')

    announce('Enregistré')
    expect(region('polite')?.textContent).toBe('')
    vi.advanceTimersByTime(100)
    expect(region('polite')?.textContent).toBe('Enregistré')
  })

  it('utilise la région assertive pour les priorités élevées', () => {
    ensureAnnouncerRegions()
    announce('Fichier trop volumineux', { priority: 'assertive' })
    vi.advanceTimersByTime(100)

    expect(region('assertive')?.textContent).toBe('Fichier trop volumineux')
    expect(region('polite')?.textContent).toBe('')
  })

  it('efface le message après clearAfter', () => {
    ensureAnnouncerRegions()
    announce('Copié', { clearAfter: 1000 })
    vi.advanceTimersByTime(100)
    expect(region('polite')?.textContent).toBe('Copié')

    vi.advanceTimersByTime(1000)
    expect(region('polite')?.textContent).toBe('')
  })

  it('announceToScreenReader (obsolète) passe par les mêmes régions', () => {
    ensureAnnouncerRegions()
    announceToScreenReader('Ancienne API', 'assertive')
    vi.advanceTimersByTime(100)

    expect(region('assertive')?.textContent).toBe('Ancienne API')
    expect(document.querySelectorAll('[data-su-announcer]')).toHaveLength(2)
  })
})
