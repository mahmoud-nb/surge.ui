import type { Meta, StoryFn } from '@storybook/vue3'
import { ref, computed } from 'vue'
import Heading from '@/components/atoms/Heading.vue'
import Panel from '@/components/atoms/Panel.vue'
import Button from '@/components/atoms/Button.vue'

export default {
  title: 'Design System/Preview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Cette story permet de tester le comportement global du design system : bascule entre les modes **clair/sombre** et les directions **LTR/RTL**.',
      },
    },
  },
} as Meta

export const GlobalPreview: StoryFn = () => ({
  components: { Heading, Panel },
  setup() {
    const isDark = ref(false)
    const isRTL = ref(false)

    const toggleDark = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    const toggleRTL = () => {
      isRTL.value = !isRTL.value
      document.documentElement.dir = isRTL.value ? 'rtl' : 'ltr'
    }

    return { isDark, isRTL, toggleDark, toggleRTL }
  },
  template: `
    <div
      :class="['su-preview-wrapper', { 'dark': isDark }]"
      :dir="isRTL ? 'rtl' : 'ltr'"
      style="min-height: 100vh; background-color: var(--background, #f9fafb); transition: background 0.3s ease; padding: 2rem;"
    >
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div>
          <button
            class="su-btn"
            @click="toggleDark"
            style="margin-right: 0.5rem;"
          >
            {{ isDark ? '☀️ Mode clair' : '🌙 Mode sombre' }}
          </button>

          <button
            class="su-btn"
            @click="toggleRTL"
          >
            {{ isRTL ? '⬅️ LTR' : '➡️ RTL' }}
          </button>
        </div>
      </div>

      <Panel bordered elevated>
        <template #head>
          <Heading level="2">Aperçu global du Design System</Heading>
        </template>

        <p>
          Testez ici les styles généraux, les couleurs, les typographies et les comportements RTL/dark des composants.
        </p>

        <ul>
          <li><strong>Thème :</strong> {{ isDark ? 'Sombre' : 'Clair' }}</li>
          <li><strong>Direction :</strong> {{ isRTL ? 'Droite à gauche' : 'Gauche à droite' }}</li>
        </ul>

        <template #footer>
          <small>Respect des normes WCAG 2.1 AA et W3C</small>
        </template>
      </Panel>

      <div style="margin-top: 2rem;">
        <Heading level="3">Exemples de titres</Heading>
        <Heading level="1">Titre principal</Heading>
        <Heading level="2">Sous-titre</Heading>
        <Heading level="3">Titre de section</Heading>
      </div>

      <div style="margin-top: 2rem; display: grid; gap: 1rem;">
        <Panel variant="default">
          <p>Panel par défaut</p>
        </Panel>
        <Panel variant="subtle">
          <p>Panel subtil</p>
        </Panel>
        <Panel variant="highlight">
          <p>Panel accentué</p>
        </Panel>
      </div>
    </div>
  `,
})

export const ThemeAndRTLToggler: StoryFn = () => ({
  render: () => ({
    components: { Button },
    setup() {
      const isDark = ref(false)
      const isRTL = ref(false)

      const themeClass = computed(() => (isDark.value ? 'dark' : 'light'))
      const dirAttr = computed(() => (isRTL.value ? 'rtl' : 'ltr'))

      const toggleDark = () => (isDark.value = !isDark.value)
      const toggleRTL = () => (isRTL.value = !isRTL.value)

      return { isDark, isRTL, themeClass, dirAttr, toggleDark, toggleRTL }
    },
    template: `
      <div :class="themeClass" :dir="dirAttr" class="min-h-screen transition-colors duration-300 p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div class="flex gap-4 mb-6">
          <Button @click="toggleDark">
            {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </Button>
          <Button @click="toggleRTL">
            {{ isRTL ? 'LTR' : 'RTL' }}
          </Button>
        </div>

        <p class="text-lg">
          Ceci est un aperçu global.  
          <br />Mode actuel : <strong>{{ themeClass }}</strong>  
          <br />Direction : <strong>{{ dirAttr }}</strong>
        </p>
      </div>
    `,
  }),
})
