import type { Preview } from '@storybook/vue3'
import '../src/styles/storybook.scss'
import SurgeUpDS from '../src/index'

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
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
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
      const theme = context.globals.theme
      const dir = context.globals.direction
      return {
        components: { story },
        template: `
          <div :class="theme" :dir="dir">
            <story />
          </div>
        `,
        setup() {
          return { theme, dir }
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