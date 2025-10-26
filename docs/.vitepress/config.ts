import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/surge.ui/',
  
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
          // Le lien Storybook doit aussi être corrigé une fois déployé
          { text: 'Storybook', link: 'https://mahmoud-nb.github.io/surge.ui/storybook/', target: '_blank' }
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
                items: [
                  { text: 'Image', link: '/components/image' },
                  { text: 'Avatar', link: '/components/avatar' },
                  { text: 'AvatarGroup', link: '/components/avatargroup' },
                  { text: 'Badge', link: '/components/badge' },
                  { text: 'Dialog', link: '/components/dialog' },
                  { text: 'Tabs', link: '/components/tabs' },
                  { text: 'Progress', link: '/components/progress' }
                ]
              },
              {
                text: '# Formulaires', 
                items: [
                  { text: 'InputField', link: '/components/inputfield' },
                  { text: 'SelectBoxField', link: '/components/selectboxfield' },
                  { text: 'RadioGroupField', link: '/components/radiogroupfield' },
                  { text: 'CheckboxGroupField', link: '/components/checkboxgroupfield' },
                  { text: 'TextareaField', link: '/components/textareafield' },
                  { text: 'FileUploadField', link: '/components/fileuploadfield' },
                  { text: 'SliderField', link: '/components/sliderfield' },
                  { text: 'SwitchField', link: '/components/switchfield' },
                  { text: 'Password', link: '/components/password' },
                  { text: 'FormFields', link: '/components/formfields' },
                ]
              },
              {
                text: '# Actions',
                items: [
                  { text: 'Button', link: '/components/button' },
                  { text: 'ButtonGroup', link: '/components/buttongroup' },
                  { text: 'Link', link: '/components/link' },
                  { text: 'LinkGroup', link: '/components/linkgroup' },           
                  { text: 'FloatButton', link: '/components/floatbutton' },
                  { text: 'Dropdown', link: '/components/dropdown' }
                ]
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
          { text: 'Storybook', link: 'https://mahmoud-nb.github.io/surge.ui/storybook/', target: '_blank' }
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
                items: [
                  { text: 'Image', link: '/en/components/image' },
                  { text: 'Avatar', link: '/en/components/avatar' },
                  { text: 'AvatarGroup', link: '/en/components/avatargroup' },
                  { text: 'Badge', link: '/en/components/badge' },
                  { text: 'Dialog', link: '/en/components/dialog' },
                  { text: 'Tabs', link: '/en/components/tabs' },
                  { text: 'Progress', link: '/en/components/progress'}
                ]
              },
              {
                text: '# Forms', 
                items: [
                  { text: 'InputField', link: '/en/components/inputfield' },
                  { text: 'SelectBoxField', link: '/en/components/selectboxfield' },
                  { text: 'RadioGroupField', link: '/en/components/radiogroupfield' },
                  { text: 'CheckboxGroupField', link: '/en/components/checkboxgroupfield' },
                  { text: 'TextareaField', link: '/en/components/textareafield' },
                  { text: 'FileUploadField', link: '/en/components/fileuploadfield' },
                  { text: 'SliderField', link: '/en/components/sliderfield' },
                  { text: 'SwitchField', link: '/en/components/switchfield' },
                  { text: 'Password', link: '/en/components/password' },
                  { text: 'FormFields', link: '/en/components/formfields' },
                ]
              },
              {
                text: '# Actions',
                items: [
                  { text: 'Button', link: '/en/components/button' },
                  { text: 'ButtonGroup', link: '/en/components/buttongroup' },
                  { text: 'Link', link: '/en/components/link' },
                  { text: 'LinkGroup', link: '/en/components/linkgroup' },           
                  { text: 'FloatButton', link: '/en/components/floatbutton' },
                  { text: 'Dropdown', link: '/en/components/dropdown' }
                ]
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
      copyright: 'Copyright © 2024 SurgeUp'
    }
  },

  ignoreDeadLinks: true,

  vite: {
    optimizeDeps: {
      include: ['@heroicons/vue/24/outline', '@surgeui/ds-vue']
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
