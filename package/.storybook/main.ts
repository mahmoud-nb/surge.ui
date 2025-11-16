import type { StorybookConfig } from '@storybook/vue3-vite'

const base = {
  head: '<base href="/surge.ui/storybook/">'
}

// ${process.env.NODE_ENV === 'production' ? '<base href="/surge.ui/storybook/">' : ''}

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
  managerHead: (head) => `
    ${head}
    ${base.head}
  `,
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
  }
}

export default config