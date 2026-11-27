import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import {
  HomeIcon,
  InboxIcon,
  FolderIcon,
  UsersIcon,
  Cog6ToothIcon,
  PlusIcon,
  BoltIcon
} from '@heroicons/vue/24/outline'
import AppShell from '../AppShell.vue'
import NavMenu from '../../organisms/NavMenu.vue'
import PageHeader from '../../molecules/PageHeader.vue'
import ThemeToggle from '../../molecules/ThemeToggle.vue'
import Button from '../../atoms/Button.vue'
import Avatar from '../../atoms/Avatar.vue'
import type { NavMenuEntry } from '@/types'
import { DemoBox } from './layoutDemo'

const items: NavMenuEntry[] = [
  { label: 'Tableau de bord', value: 'dashboard', icon: HomeIcon },
  { label: 'Messages', value: 'inbox', icon: InboxIcon, badge: 4, badgeVariant: 'primary', badgeLabel: '4 messages non lus' },
  {
    type: 'group',
    label: 'Espace de travail',
    items: [
      { label: 'Projets', value: 'projects', icon: FolderIcon },
      { label: 'Équipe', value: 'team', icon: UsersIcon },
      { label: 'Réglages', value: 'settings', icon: Cog6ToothIcon }
    ]
  }
]

const meta: Meta<typeof AppShell> = {
  title: 'Templates/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Coquille d’application : barre latérale, barre du haut, contenu principal, pied de page et lien d’évitement intégré. Dès le point de rupture de l’écran (`breakpoint`), la barre latérale est fixe et réductible en icônes (`collapsible`, `v-model:collapsed`). En dessous, elle s’ouvre dans un tiroir modal depuis le bouton menu (`v-model:open`) ; un lien suivi le ferme. Repères : `<header>`, `<main>`, `<footer>` ; la navigation vient de `SuNavMenu`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    breakpoint: { control: { type: 'select' }, options: ['md', 'lg', 'xl'], description: 'En dessous, la barre latérale devient un tiroir' },
    sidebarWidth: { control: 'text', description: 'Largeur de la barre latérale' },
    collapsedWidth: { control: 'text', description: 'Largeur réduite (icônes seules)' },
    collapsible: { control: 'boolean', description: 'Bouton qui réduit la barre latérale' },
    stickyHeader: { control: 'boolean', description: 'Barre du haut collante' },
    skipLink: { control: 'boolean', description: 'Lien d’évitement vers le contenu principal' },
    skipLinkLabel: { control: 'text', description: 'Texte du lien d’évitement' },
    menuLabel: { control: 'text', description: 'Nom du bouton menu (défaut : « Ouvrir le menu »)' },
    drawerLabel: { control: 'text', description: 'Nom du tiroir (défaut : « Menu »)' },
    collapseLabel: { control: 'text', description: 'Nom du bouton de réduction (défaut : « Réduire le menu »)' }
  },
  args: { collapsible: true }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { AppShell, NavMenu, PageHeader, ThemeToggle, Button, Avatar, DemoBox },
    setup: () => ({ args, items, active: ref<string | number>('dashboard'), collapsed: ref(false), PlusIcon, BoltIcon }),
    template: `
      <AppShell v-bind="args" v-model:collapsed="collapsed">
        <template #brand="{ collapsed: isCollapsed }">
          <span style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--su-text-primary);">
            <BoltIcon style="inline-size: 1.25rem; block-size: 1.25rem; color: var(--su-primary-default);" aria-hidden="true" />
            <span v-if="!isCollapsed">Surge</span>
          </span>
        </template>
        <template #header>
          <ThemeToggle size="sm" />
          <Avatar name="Camille Martin" size="sm" />
        </template>
        <template #sidebar="{ collapsed: isCollapsed }">
          <NavMenu :items="items" v-model="active" :collapsed="isCollapsed" @update:collapsed="collapsed = $event" />
        </template>
        <PageHeader
          title="Tableau de bord"
          description="Activité de l’équipe sur les 30 derniers jours."
          :breadcrumb="[{ label: 'Accueil', href: '#' }, { label: 'Tableau de bord' }]"
        >
          <template #actions>
            <Button :icon="PlusIcon">Nouveau projet</Button>
          </template>
        </PageHeader>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem; margin-block-start: 1.5rem;">
          <DemoBox label="Indicateur" height="7rem" />
          <DemoBox label="Indicateur" height="7rem" />
          <DemoBox label="Indicateur" height="7rem" />
          <DemoBox label="Graphique" height="16rem" tone="accent" />
        </div>
        <template #footer>© 2026 Surge</template>
      </AppShell>
    `
  })
}
