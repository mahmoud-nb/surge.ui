import type { StorybookConfig } from '@storybook/vue3-vite'
import { loadEnv } from 'vite'
import pkg from '../../package.json'

// Charger les variables d'environnement
const mode = process.env.NODE_ENV || 'development'
const env = loadEnv(mode, process.cwd(), 'VITE_')

// Variable d'environnement avec fallback
const BASE_URL = env.VITE_APP_BASE_URL || pkg.config.baseUrl
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

    // Définir le bon "base" selon le mode (local ou build)
    config.base = configType === 'PRODUCTION' ? `${BASE_URL}storybook/` : '/'

    // Exposer les variables aux stories
    config.define = {
      ...config.define,
      __BASE_URL__: JSON.stringify(BASE_URL)
    }

    return config
  },
  // Ajouter la balise <base> uniquement en production
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return `
        ${head}
        <base href="${BASE_URL}storybook/">
      `
    }
    return head
  }
}

export default config