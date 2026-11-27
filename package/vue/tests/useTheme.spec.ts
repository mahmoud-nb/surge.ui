/* eslint-disable vue/one-component-per-file -- composants de test définis sur place */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'

// useTheme garde un état partagé par module : chaque test recharge le module
type UseTheme = typeof import('@/composables/useTheme').useTheme

// matchMedia simulé : préférences système modifiables, écouteurs comptés
const media = {
  dark: false,
  listeners: new Set<() => void>(),
  setDark(value: boolean) {
    this.dark = value
    this.listeners.forEach((listener) => listener())
  }
}

const installMatchMedia = () => {
  window.matchMedia = ((query: string) => ({
    media: query,
    get matches() {
      return query.includes('prefers-color-scheme: dark') ? media.dark : false
    },
    addEventListener: (_: string, listener: () => void) => media.listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => media.listeners.delete(listener),
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false
  })) as unknown as typeof window.matchMedia
}

let useTheme: UseTheme
let wrapper: VueWrapper | undefined

beforeEach(async () => {
  vi.resetModules()
  localStorage.clear()
  media.dark = false
  media.listeners.clear()
  installMatchMedia()
  document.documentElement.removeAttribute('data-theme-mode')
  useTheme = (await import('@/composables/useTheme')).useTheme
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

const mode = () => document.documentElement.getAttribute('data-theme-mode')

describe('useTheme', () => {
  it('mode système : suit un changement de préférence sans recharger', async () => {
    let theme: ReturnType<UseTheme> | undefined
    wrapper = mount(defineComponent({
      setup() {
        theme = useTheme({ defaultThemeMode: 'system' })
        return () => null
      }
    }))
    await nextTick()
    expect(theme!.systemTheme.value).toBe('light')
    expect(mode()).toBe('light')

    media.setDark(true)
    await nextTick()
    expect(theme!.systemTheme.value).toBe('dark')
    expect(theme!.isDarkMode.value).toBe(true)
    expect(mode()).toBe('dark')
  })

  it('applique defaultThemeMode du parent, même quand un enfant monte avant lui', async () => {
    media.dark = true
    // L'enfant (ThemeToggle, par exemple) appelle useTheme sans option
    const Child = defineComponent({
      setup() {
        useTheme()
        return () => null
      }
    })
    wrapper = mount(defineComponent({
      setup() {
        useTheme({ defaultThemeMode: 'system' })
        return () => h(Child)
      }
    }))
    await nextTick()
    expect(mode()).toBe('dark')
  })

  it('les préférences enregistrées restent prioritaires sur defaultThemeMode', async () => {
    localStorage.setItem('su-theme-config', JSON.stringify({ theme: 'default', themeMode: 'light' }))
    media.dark = true
    wrapper = mount(defineComponent({
      setup() {
        useTheme({ defaultThemeMode: 'dark' })
        return () => null
      }
    }))
    await nextTick()
    expect(mode()).toBe('light')
  })

  it('retire ses écouteurs quand le dernier composant qui l’utilise est démonté', async () => {
    const show = ref(true)
    const User = defineComponent({
      setup() {
        useTheme()
        return () => null
      }
    })
    wrapper = mount(defineComponent({
      setup: () => () => (show.value ? [h(User), h(User)] : null)
    }))
    await nextTick()
    // Une seule écoute par préférence (mode, contraste, mouvement), quel que soit le nombre d'appels
    expect(media.listeners.size).toBe(1)

    show.value = false
    await nextTick()
    expect(media.listeners.size).toBe(0)
  })

  it('hors composant : suit le système aussitôt', async () => {
    const theme = useTheme({ defaultThemeMode: 'system' })
    await nextTick()
    media.setDark(true)
    await nextTick()
    expect(theme.effectiveThemeMode.value).toBe('dark')
    expect(mode()).toBe('dark')
  })
})
