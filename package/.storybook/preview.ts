import type { Preview } from '@storybook/vue3'
import '../src/styles/storybook.scss'
import SurgeUpDS from '../src/index'
import { computed } from 'vue'

// Import de la police Nunito Sans depuis Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

// Application de la police globalement
const style = document.createElement('style')
style.textContent = `
  body, .sb-show-main {
    font-family: 'Nunito Sans', 'system-ui', 'tahoma', sans-serif !important;
  }
  
  .docs-story, .sbdocs-content {
    font-family: 'Nunito Sans', 'system-ui', 'tahoma', sans-serif !important;
  }
`
document.head.appendChild(style)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true,
      source: {
        language: 'vue',
        format: true
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#1f2937'
        },
        {
          name: 'gray',
          value: '#f3f4f6'
        }
      ]
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['default', 'sunset', 'ocean', 'forest'], // Valeurs de thème personnalisées ('dawn', 'dusk', 'midnight', etc.)
        dynamicTitle: true
      }
    },
    thememode: {
      description: 'Global theme mode (light/dark)',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme Mode',
        icon: 'contrast',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    },
    direction: {
      name: 'Direction',
      description: 'Sens de lecture',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
      },
    }
  },
  decorators: [
    (story, context) => {
      return {
        components: { story },
        template: `
          <div class="su-preview-wrapper" :data-theme="theme" :data-theme-mode="themeMode" :dir="dir">
            <story />
          </div>
        `,
        setup() {
          const theme = computed(() => context.globals.theme)
          const themeMode = computed(() => context.globals.thememode)
          const dir = computed(() => context.globals.direction)
          return { theme, themeMode, dir }
        },
      }
    },
  ]
}

export const setup = (app) => {
  // Installer le plugin globalement pour Storybook
  app.use(SurgeUpDS)
}

export default preview