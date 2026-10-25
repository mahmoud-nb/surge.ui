import type { Meta, StoryObj } from '@storybook/vue3'
import { UserIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import Tabs from '../Tabs.vue'
import Badge from '../../atoms/Badge.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'left-aligned',
    docs: {
      description: {
        component: 'Composant d’onglets accessible et flexible, permettant un rendu par défaut ou personnalisé via slots.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['underline', 'pills', 'contained'],
      description: 'underline : filet et indicateur animé ; pills : contrôle segmenté ; contained : onglets attachés au panneau'
    },
    modelValue: {
      control: { type: 'number', min: 0 },
      description: 'Index de l’onglet actif (v-model)'
    }
  }
}
export default meta
type Story = StoryObj<typeof meta>

const basicTabs = [
  { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
  { label: 'Profil', content: 'Ici vous pouvez modifier vos informations.' },
  { label: 'Paramètres', content: 'Réglez vos préférences ici.' }
]

export const Basic: Story = {
  args: {
    variant: 'underline',
    tabs: basicTabs
  }
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les variantes underline et pills ont un indicateur qui glisse jusqu’à l’onglet actif.'
      }
    }
  },
  render: () => ({
    components: { Tabs },
    setup() {
      return { basicTabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 32rem;">
        <Tabs variant="underline" :tabs="basicTabs" />
        <Tabs variant="pills" :tabs="basicTabs" />
        <Tabs variant="contained" :tabs="basicTabs" />
      </div>
    `
  })
}

export const WithIconsAndBadges: Story = {
  args: {
    tabs: [
      { label: 'Profil', icon: UserIcon, badge: 3, content: 'Contenu du profil' },
      { label: 'Paramètres', icon: Cog6ToothIcon, badge: 1, content: 'Contenu des paramètres' }
    ]
  },
  render: (args) => ({
    components: { Tabs, Badge, UserIcon, Cog6ToothIcon },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #tab="{ tab }">
          <span style="display: inline-flex; align-items: center; gap: 0.375rem;">
            <component
              :is="tab.icon"
              style="width: 1rem; height: 1rem; flex-shrink: 0; opacity: 0.8;"
              aria-hidden="true"
            />
            <span>{{ tab.label }}</span>
            <Badge v-if="tab.badge" variant="secondary" size="sm" radius="full">{{ tab.badge }}</Badge>
          </span>
        </template>
      </Tabs>
    `
  })
}
