import type { Meta, StoryObj } from '@storybook/vue3'
import { ChatBubbleLeftIcon, CheckIcon, PlusIcon, ExclamationTriangleIcon, UserPlusIcon } from '@heroicons/vue/24/outline'
import Timeline from '../Timeline.vue'
import type { TimelineItem } from '@/types'

const now = new Date()
const at = (daysAgo: number, hours: number, minutes = 0) => {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hours, minutes, 0, 0)
  return date
}

const items: TimelineItem[] = [
  { id: 1, title: 'Commentaire sur « Maquettes v2 »', author: 'Camille Martin', date: at(0, 10, 42), icon: ChatBubbleLeftIcon, description: 'Les marges du pied de page sont à revoir sur mobile.' },
  { id: 2, title: 'Tâche terminée : intégration du paiement', author: 'Léo Dubois', date: at(0, 9, 5), icon: CheckIcon, variant: 'success' },
  { id: 3, title: 'Échec du déploiement de préproduction', date: at(1, 18, 20), icon: ExclamationTriangleIcon, variant: 'error', description: 'Le test de bout en bout « commande » a échoué.' },
  { id: 4, title: 'Inès Morel a rejoint le projet', date: at(1, 11, 0), icon: UserPlusIcon, variant: 'primary' },
  { id: 5, title: 'Projet créé', author: 'Camille Martin', date: at(6, 8, 30), icon: PlusIcon }
]

const meta: Meta<typeof Timeline> = {
  title: 'Organisms/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Fil d’activité : événements datés (titre, auteur, heure, description, icône, variante), regroupés par jour sous un titre (« Aujourd’hui », « Hier », puis la date complète). Listes ordonnées, dates en `<time datetime>`, libellés dans la langue courante. L’ordre est celui de `items`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Événements : title, date, author, description, icon, variant' },
    groupByDay: { control: 'boolean', description: 'Regroupe par jour, sous un titre' },
    headingLevel: { control: { type: 'select' }, options: [2, 3, 4, 5, 6], description: 'Niveau des titres de jour' },
    now: { control: 'date', description: 'Date de référence (« aujourd’hui », « hier »)' }
  },
  args: { items }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Timeline },
    setup: () => ({ args }),
    template: `<div style="max-inline-size: 36rem;"><Timeline v-bind="args" /></div>`
  })
}

export const Ungrouped: Story = {
  name: 'Sans regroupement',
  args: { groupByDay: false }
}
