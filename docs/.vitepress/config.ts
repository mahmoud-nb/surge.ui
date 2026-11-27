import { defineConfig, loadEnv } from 'vitepress'
import pkg from '../../package.json'
import { NEW_BADGE, getNavItems } from './nav'

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

// Version publiée (mise à jour par standard-version) et notes de version
const REPO_URL = 'https://github.com/mahmoud-nb/surge.ui'
const versionNav = (changelog: string) => ({
  text: `v${pkg.version}`,
  items: [
    { text: changelog, link: `${REPO_URL}/blob/main/CHANGELOG.md` },
    { text: 'npm', link: 'https://www.npmjs.com/package/@surgeui/vue' }
  ]
})


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
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' },
          versionNav('Notes de version')
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Démarrage rapide', link: '/guide/get-started' },
              { text: 'Installation', link: '/guide/installation' },
              { text: 'Migration vers la 4.0', link: '/guide/migration', badge: NEW_BADGE },
              { text: 'Assistants IA', link: '/guide/ai', badge: NEW_BADGE },
              { text: 'Nuxt', link: '/guide/nuxt', badge: NEW_BADGE },
              { text: 'RTL (droite à gauche)', link: '/guide/rtl', badge: NEW_BADGE }
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
              },
              {
                text: '# Mise en page',
                items: getNavItems('layouts', 'fr')
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
          { text: 'Storybook', link: `${ROOT_URL}storybook/`, target: '_blank' },
          versionNav('Changelog')
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/en/guide/get-started' },
              { text: 'Installation', link: '/en/guide/installation' },
              { text: 'Migrating to 4.0', link: '/en/guide/migration', badge: NEW_BADGE },
              { text: 'AI assistants', link: '/en/guide/ai', badge: NEW_BADGE },
              { text: 'Nuxt', link: '/en/guide/nuxt', badge: NEW_BADGE },
              { text: 'RTL (right to left)', link: '/en/guide/rtl', badge: NEW_BADGE }
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
              },
              {
                text: '# Layouts',
                items: getNavItems('layouts', 'en')
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
      include: ['@heroicons/vue/24/outline', '@surgeui/vue']
    },
    define: {
      // Exposer les variables aux composants Vue côté client
      __ROOT_URL__: JSON.stringify(ROOT_URL),
      // Version publiée (pastille de l'accueil)
      __SURGEUI_VERSION__: JSON.stringify(pkg.version),
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