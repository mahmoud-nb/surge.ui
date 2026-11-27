import type { Meta, StoryObj } from '@storybook/vue3'
import { BanknotesIcon, UsersIcon, ClockIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import Stat from '../Stat.vue'

// Mini-courbe de démonstration (SVG décoratif)
const sparkline = `
  <svg viewBox="0 0 100 32" preserveAspectRatio="none" style="display: block; inline-size: 100%; block-size: 2.5rem;" aria-hidden="true">
    <polyline fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"
      points="0,26 12,22 24,24 36,16 48,18 60,10 72,12 84,6 100,4" />
  </svg>
`

const meta: Meta<typeof Stat> = {
  title: 'Molecules/Stat',
  component: Stat,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Carte d’indicateur : libellé, valeur formatée dans la langue courante, variation colorée et lue (« En hausse »), contexte, mini-graphique (slot `chart`) et lien facultatif (la carte entière). `delta` numérique est un ratio : 0.125 → « +12,5 % ». `invertTrend` inverse les couleurs quand une baisse est une bonne nouvelle.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Libellé' },
    value: { control: 'text', description: 'Valeur (nombre formaté, ou texte)' },
    format: { control: 'object', description: 'Format du nombre (Intl.NumberFormat)' },
    delta: { control: 'number', description: 'Variation : ratio (0.125 → +12,5 %) ou texte' },
    deltaFormat: { control: 'object', description: 'Format de la variation' },
    trend: { control: { type: 'select' }, options: [undefined, 'up', 'down', 'neutral'], description: 'Sens (défaut : signe de delta)' },
    invertTrend: { control: 'boolean', description: 'Une baisse est une bonne nouvelle' },
    deltaLabel: { control: 'text', description: 'Contexte de la variation' },
    href: { control: 'text', description: 'Lien (carte entière)' },
    loading: { control: 'boolean', description: 'Valeur en cours de chargement' }
  },
  args: {
    label: 'Chiffre d’affaires',
    value: 48250,
    format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
    delta: 0.124,
    deltaLabel: 'vs mois dernier'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Stat },
    setup: () => ({ args, BanknotesIcon }),
    template: `<div style="max-inline-size: 22rem;"><Stat v-bind="args" :icon="BanknotesIcon" /></div>`
  })
}

export const Dashboard: Story = {
  name: 'Tableau de bord',
  render: () => ({
    components: { Stat },
    setup: () => ({ BanknotesIcon, UsersIcon, ClockIcon, ArrowPathIcon, sparkline }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 1rem;">
        <Stat label="Chiffre d’affaires" :value="48250" :format="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }" :delta="0.124" delta-label="vs mois dernier" :icon="BanknotesIcon">
          <template #chart><span v-html="sparkline" /></template>
        </Stat>
        <Stat label="Clients actifs" :value="1284" :delta="-0.032" delta-label="vs mois dernier" :icon="UsersIcon" href="#" />
        <Stat label="Délai de réponse" value="2 h 14" delta="−18 min" invert-trend delta-label="vs semaine dernière" :icon="ClockIcon" />
        <Stat label="Taux de renouvellement" :value="0.91" :format="{ style: 'percent' }" :delta="0" :icon="ArrowPathIcon" />
      </div>
    `
  })
}

export const Loading: Story = {
  name: 'Chargement',
  args: { loading: true }
}
