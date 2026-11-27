import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import {
  HomeIcon,
  InboxIcon,
  FolderIcon,
  UsersIcon,
  ChartBarIcon,
  CreditCardIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'
import NavMenu from '../NavMenu.vue'
import type { NavMenuEntry } from '@/types'

const items: NavMenuEntry[] = [
  { label: 'Tableau de bord', value: 'dashboard', icon: HomeIcon },
  { label: 'Messages', value: 'inbox', icon: InboxIcon, badge: 4, badgeVariant: 'primary', badgeLabel: '4 messages non lus' },
  {
    type: 'group',
    label: 'Espace de travail',
    items: [
      {
        label: 'Projets',
        icon: FolderIcon,
        items: [
          { label: 'En cours', value: 'projects-active' },
          { label: 'Archivés', value: 'projects-archived' }
        ]
      },
      { label: 'Équipe', value: 'team', icon: UsersIcon },
      { label: 'Rapports', value: 'reports', icon: ChartBarIcon }
    ]
  },
  {
    type: 'group',
    label: 'Compte',
    items: [
      { label: 'Facturation', value: 'billing', icon: CreditCardIcon, disabled: true },
      { label: 'Réglages', value: 'settings', icon: Cog6ToothIcon }
    ]
  }
]

const meta: Meta<typeof NavMenu> = {
  title: 'Organisms/NavMenu',
  component: NavMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Navigation latérale d’une application : repère `<nav>` nommé, groupes titrés, icônes, compteurs, un niveau de sous-éléments dépliables (bouton `aria-expanded`). L’élément actif (`aria-current="page"`) vient de `active`, sinon du `v-model` (value), sinon de la route courante (Vue Router, Nuxt ; `match` : exact ou préfixe). `v-model:collapsed` : icônes seules, libellés en infobulle et toujours lus. Ce ne sont pas des menus d’actions (`role="menu"`) : Tab parcourt les liens.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Éléments (label, to / href, icon, badge, items…) et groupes ({ type: \'group\', label, items })' },
    modelValue: { control: 'text', description: 'Élément actif (value), pour une navigation gérée par l’application' },
    collapsed: { control: 'boolean', description: 'Icônes seules (barre latérale réduite)' },
    match: { control: { type: 'select' }, options: ['exact', 'prefix'], description: 'Comparaison avec la route courante' },
    label: { control: 'text', description: 'Nom de la navigation (défaut : « Navigation principale »)' },
    onSelect: { action: 'select', description: 'Élément choisi' }
  },
  args: { items }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { NavMenu },
    setup: () => ({ args, active: ref<string | number>('dashboard') }),
    template: `
      <div style="inline-size: 16rem;">
        <NavMenu v-bind="args" v-model="active" />
      </div>
    `
  })
}

export const Collapsed: Story = {
  name: 'Réduit (icônes seules)',
  render: (args) => ({
    components: { NavMenu },
    setup: () => ({ args, active: ref<string | number>('inbox'), collapsed: ref(true) }),
    template: `
      <div :style="{ inlineSize: collapsed ? '4rem' : '16rem' }">
        <NavMenu v-bind="args" v-model="active" v-model:collapsed="collapsed" />
      </div>
    `
  })
}
