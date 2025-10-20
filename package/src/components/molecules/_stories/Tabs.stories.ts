import type { Meta, StoryObj } from '@storybook/vue3'
import { UserIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import Tabs from '../Tabs.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant d’onglets accessible et flexible, permettant un rendu par défaut ou personnalisé via slots.'
      }
    }
  }
}
export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    tabs: [
      { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
      { label: 'Profil', content: 'Ici vous pouvez modifier vos informations.' },
      { label: 'Paramètres', content: 'Réglez vos préférences ici.' }
    ]
  }
}

export const WithIconsAndBadges: Story = {
  args: {
    tabs: [
      { label: 'Profil', icon: UserIcon, badge: 3, content: 'Contenu du profil' },
      { label: 'Paramètres', icon: Cog6ToothIcon, badge: 1, content: 'Contenu des paramètres' }
    ]
  },
  render: (args) => ({
    components: { Tabs, UserIcon, Cog6ToothIcon },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #tab="{ tab }">
          <div style="display: flex; align-items: center; gap: 6px;">
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.label }}</span>
            <span v-if="tab.badge" class="badge">{{ tab.badge }}</span>
          </div>
        </template>
      </Tabs>
    `
  })
}
