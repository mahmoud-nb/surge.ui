import { defineConfig, loadEnv } from 'vitepress'
import pkg from '../../package.json'

// Charger les variables d'environnement
// Mode sera 'development' ou 'production'

const mode = typeof process !== 'undefined' && process.env?.NODE_ENV || 'development'
const env = loadEnv(mode, process.cwd(), 'VITE_')

// TODO : use import.meta.env
// const mode = import.meta.env.DEV ? 'development' : 'production'
// const env = loadEnv(mode, import.meta.url, 'VITE_')

// Utiliser les variables d'environnement avec fallback
const ROOT_URL = env.VITE_APP_ROOT_URL || pkg.config.rootUrl
const BASE_URL = env.VITE_APP_BASE_URL || pkg.config.baseUrl

const getNavItems = (section: string = 'display', lang: string = 'fr') => {

  const langPrefix = lang === 'fr' ? '' : '/en'

  const NEW_BADGE = { text: 'New', type: 'tip' as const }

  const componentsItems = {
    display:[
      { text: 'Heading', link: `${langPrefix}/components/heading` },
      { text: 'Panel', link: `${langPrefix}/components/panel` },
      { text: 'Icon', link: `${langPrefix}/components/icon` },
      { text: 'Image', link: `${langPrefix}/components/image` },
      { text: 'Avatar', link: `${langPrefix}/components/avatar` },
      { text: 'AvatarGroup', link: `${langPrefix}/components/avatargroup` },
      { text: 'Badge', link: `${langPrefix}/components/badge` },
      { text: 'Dialog', link: `${langPrefix}/components/dialog` },
      { text: 'Popover', link: `${langPrefix}/components/popover` },
      { text: 'Alert', link: `${langPrefix}/components/alert`},
      { text: 'Tabs', link: `${langPrefix}/components/tabs` },
      { text: 'Accordion', link: `${langPrefix}/components/accordion` },
      { text: 'Collapse', link: `${langPrefix}/components/collapse` },
      { text: 'Progress', link: `${langPrefix}/components/progress` },
      { text: 'Spinner', link: `${langPrefix}/components/spinner`},
      { text: 'Price', link: `${langPrefix}/components/price`, badge: NEW_BADGE }
    ],
    actions:[
      { text: 'Button', link: `${langPrefix}/components/button` },
      { text: 'ButtonGroup', link: `${langPrefix}/components/buttongroup` },
      { text: 'Link', link: `${langPrefix}/components/link` },
      { text: 'LinkGroup', link: `${langPrefix}/components/linkgroup` },
      { text: 'Toggle', link: `${langPrefix}/components/toggle`, badge: NEW_BADGE },
      { text: 'ToggleGroup', link: `${langPrefix}/components/togglegroup`, badge: NEW_BADGE },
      { text: 'FloatButton', link: `${langPrefix}/components/floatbutton` },
      { text: 'Dropdown', link: `${langPrefix}/components/dropdown` }
    ],
    forms:[
      { text: 'Input', link: `${langPrefix}/components/input` },
      { text: 'Textarea', link: `${langPrefix}/components/textarea` },
      { text: 'FileUpload', link: `${langPrefix}/components/fileupload` },
      { text: 'SelectBox', link: `${langPrefix}/components/selectbox` },
      { text: 'RadioGroup', link: `${langPrefix}/components/radio-group` },
      { text: 'CheckboxGroup', link: `${langPrefix}/components/checkbox-group` },
      { text: 'Switch', link: `${langPrefix}/components/switch` },
      { text: 'Slider', link: `${langPrefix}/components/slider` },
      //{ text: 'InputField', link: `${langPrefix}/components/inputfield` },
      //{ text: 'TextareaField', link: `${langPrefix}/components/textareafield` },
      //{ text: 'SelectBoxField', link: `${langPrefix}/components/selectboxfield` },
      //{ text: 'RadioGroupField', link: `${langPrefix}/components/radiogroupfield` },
      //{ text: 'CheckboxGroupField', link: `${langPrefix}/components/checkboxgroupfield` },
      //{ text: 'FileUploadField', link: `${langPrefix}/components/fileuploadfield` },
      //{ text: 'SliderField', link: `${langPrefix}/components/sliderfield` },
      //{ text: 'SwitchField', link: `${langPrefix}/components/switchfield` },
      { text: 'Password', link: `${langPrefix}/components/password` },
      { text: 'FormField', link: `${langPrefix}/components/formfield` },
      { text: 'FormFieldGroup', link: `${langPrefix}/components/formfieldgroup` },
    ],
    composables:[
      { text: 'useTheme', link: `${langPrefix}/composables/usetheme` },
      { text: 'useCustomTheme', link: `${langPrefix}/composables/usecustomtheme` },
      { text: 'useBreakpoint', link: `${langPrefix}/composables/usebreakpoint`, badge: NEW_BADGE },
      { text: 'usePrice', link: `${langPrefix}/composables/useprice`, badge: NEW_BADGE },
    ]
  }

  return section ? (componentsItems?.[section as keyof typeof componentsItems] || []) : []
}

export default defineConfig({
  base: BASE_URL,
  
  title: '⚡SurgeUI Design System',
  description: 'Bibliothèque de composants Vue.js 3 moderne',

  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JRLT7HL8T0' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JRLT7HL8T0');`
    ]
  ],
  
  locales: {
    root: {
      label: 'Français',
      lang: 'fr',
      title: '⚡SurgeUI Design System',
      description: 'Bibliothèque de composants Vue.js 3 moderne',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/' },
          { text: 'Démarrage', link: '/guide/get-started' },
          { text: 'Composants', link: '/components/' },
          { text: 'Composables', link: '/composables/usetheme' },
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Démarrage rapide', link: '/guide/get-started' },
              { text: 'Installation', link: '/guide/installation' }
            ]
          },
          {
            text: 'Thèmes',
            items: [
              { text: 'Introduction', link: '/theme/' },
              { text: 'Guide des Couleurs', link: '/theme/colors' },
              { text: 'Tokens sémantiques', link: '/theme/tokens' },
              { text: 'Accessibilité', link: '/theme/accessibility' },
              { text: 'Exemples complets', link: '/theme/examples' }
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
          },
          {
            text: 'Composables',
            items: getNavItems('composables', 'fr')
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
          { text: 'Get Started', link: '/en/guide/get-started' },
          { text: 'Components', link: '/en/components/' },
          { text: 'Composables', link: '/en/composables/usetheme' },
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/en/guide/get-started' },
              { text: 'Installation', link: '/en/guide/installation' }
            ]
          },
          {
            text: 'Themes',
            items: [
              { text: 'Introduction', link: '/en/theme/' },
              { text: 'Color Guide', link: '/en/theme/colors' },
              { text: 'Semantic Tokens', link: '/en/theme/tokens' },
              { text: 'Accessibility', link: '/en/theme/accessibility' },
              { text: 'Full Examples', link: '/en/theme/examples' }
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
          },
          {
            text: 'Composables',
            items: getNavItems('composables', 'en')
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