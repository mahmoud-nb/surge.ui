import { defineConfig, loadEnv } from 'vitepress'
import pkg from '../../package.json'

// Charger les variables d'environnement
// Mode sera 'development' ou 'production'
const mode = typeof process !== 'undefined' && process.env?.NODE_ENV || 'development'
const env = loadEnv(mode, process.cwd(), 'VITE_')

// Utiliser les variables d'environnement avec fallback
const ROOT_URL = env.VITE_APP_ROOT_URL || pkg.config.rootUrl
const BASE_URL = env.VITE_APP_BASE_URL || pkg.config.baseUrl

const getNavItems = (section: string = 'display', lang: string = 'fr') => {

  const langPrefix = lang === 'fr' ? '' : '/en'

  const componentsItems = {
    display:[
      { text: 'Heading', link: `${langPrefix}/components/heading` },
      { text: 'Panel', link: `${langPrefix}/components/panel` },
      { text: 'Image', link: `${langPrefix}/components/image` },
      { text: 'Avatar', link: `${langPrefix}/components/avatar` },
      { text: 'AvatarGroup', link: `${langPrefix}/components/avatargroup` },
      { text: 'Badge', link: `${langPrefix}/components/badge` },
      { text: 'Dialog', link: `${langPrefix}/components/dialog` },
      { text: 'Alert', link: `${langPrefix}/components/alert`},
      { text: 'Tabs', link: `${langPrefix}/components/tabs` },
      { text: 'Accordion', link: `${langPrefix}/components/accordion` },
      { text: 'Progress', link: `${langPrefix}/components/progress` },
      { text: 'Spinner', link: `${langPrefix}/components/spinner`}
    ],
    actions:[
      { text: 'Button', link: `${langPrefix}/components/button` },
      { text: 'ButtonGroup', link: `${langPrefix}/components/buttongroup` },
      { text: 'Link', link: `${langPrefix}/components/link` },
      { text: 'LinkGroup', link: `${langPrefix}/components/linkgroup` },           
      { text: 'FloatButton', link: `${langPrefix}/components/floatbutton` },
      { text: 'Dropdown', link: `${langPrefix}/components/dropdown` }
    ],
    forms:[
      { text: 'InputField', link: `${langPrefix}/components/inputfield` },
      { text: 'SelectBoxField', link: `${langPrefix}/components/selectboxfield` },
      { text: 'RadioGroupField', link: `${langPrefix}/components/radiogroupfield` },
      { text: 'CheckboxGroupField', link: `${langPrefix}/components/checkboxgroupfield` },
      { text: 'TextareaField', link: `${langPrefix}/components/textareafield` },
      { text: 'FileUploadField', link: `${langPrefix}/components/fileuploadfield` },
      { text: 'SliderField', link: `${langPrefix}/components/sliderfield` },
      { text: 'SwitchField', link: `${langPrefix}/components/switchfield` },
      { text: 'Password', link: `${langPrefix}/components/password` },
      { text: 'FormFields', link: `${langPrefix}/components/formfields` },
    ]
  }

  return section ? (componentsItems?.[section as keyof typeof componentsItems] || []) : []
}

export default defineConfig({
  base: BASE_URL,
  
  title: '⚡SurgeUI Design System',
  description: 'Bibliothèque de composants Vue.js 3 moderne',
  
  locales: {
    root: {
      label: 'Français',
      lang: 'fr',
      title: '⚡SurgeUI Design System',
      description: 'Bibliothèque de composants Vue.js 3 moderne',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/' },
          { text: 'Composants', link: '/components/' },
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'Installation', link: '/guide/installation' }
            ]
          },
          {
            text: 'Composants',
            items: [
              { 
                text: '# Affichage', 
                items: getNavItems('display', 'fr')
              },
              {
                text: '# Actions',
                items: getNavItems('actions', 'fr')
              },
              {
                text: '# Formulaires', 
                items: getNavItems('forms', 'fr')
              }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      title: '⚡SurgeUI Design System',
      description: 'Modern Vue.js 3 component library',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Components', link: '/en/components/' },
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/en/' },
              { text: 'Installation', link: '/en/guide/installation' }
            ]
          },
          {
            text: 'Components',
            items: [
              { 
                text: '# Display', 
                items:getNavItems('display', 'en')
              },
                            {
                text: '# Actions',
                items: getNavItems('actions', 'en')
              },
              {
                text: '# Forms', 
                items: getNavItems('forms', 'en')
              }
            ]
          }
        ]
      }
    }
  },
  
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Rechercher',
                buttonAriaLabel: 'Rechercher dans la documentation'
              },
              modal: {
                displayDetails: 'Afficher les détails',
                resetButtonTitle: 'Réinitialiser la recherche',
                backButtonTitle: 'Fermer la recherche',
                noResultsText: 'Aucun résultat trouvé pour',
                footer: {
                  selectText: 'pour sélectionner',
                  selectKeyAriaLabel: 'entrer',
                  navigateText: 'pour naviguer',
                  navigateUpKeyAriaLabel: 'flèche haut',
                  navigateDownKeyAriaLabel: 'flèche bas',
                  closeText: 'pour fermer',
                  closeKeyAriaLabel: 'échap'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                displayDetails: 'Display details',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                noResultsText: 'No results for',
                footer: {
                  selectText: 'to select',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'to navigate',
                  navigateUpKeyAriaLabel: 'up arrow',
                  navigateDownKeyAriaLabel: 'down arrow',
                  closeText: 'to close',
                  closeKeyAriaLabel: 'escape'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mahmoud-nb/surge.ui' }
    ],

    footer: {
      message: 'Publié sous licence MIT.',
      copyright: 'Copyright © 2025 SurgeUI'
    }
  },

  ignoreDeadLinks: true,

  vite: {
    optimizeDeps: {
      include: ['@heroicons/vue/24/outline', '@surgeui/ds-vue']
    },
    define: {
      // Exposer les variables aux composants Vue côté client
      __ROOT_URL__: JSON.stringify(ROOT_URL),
      __BASE_URL__: JSON.stringify(BASE_URL)
    }
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('su-')
      }
    }
  }
})