import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../src/components/**/_stories/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: false
  },
  viteFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('../src', import.meta.url).pathname
    }

    // ✅ Définir le bon "base" selon le mode (local ou build)
    config.base = configType === 'PRODUCTION' ? '/surge.ui/storybook/' : '/'

    return config
  },
  // ✅ Ajouter la balise <base> uniquement en production
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return `
        ${head}
        <base href="/surge.ui/storybook/">
      `
    }
    return head
  }
}

export default config