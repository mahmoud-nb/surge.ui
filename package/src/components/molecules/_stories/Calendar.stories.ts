import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Calendar from '../Calendar.vue'

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Grille d’un mois (`role="grid"`) : un seul arrêt de tabulation, jours nommés par la date complète, aujourd’hui en `aria-current="date"`. Flèches ±1 jour / semaine, Début / Fin, Page préc. / suiv. ±1 mois (Maj : ±1 an), Entrée / Espace pour choisir. Le mois et l’année du titre ouvrent la grille des 12 mois ou une page de 12 années (choisir une année mène aux mois, Échap revient aux jours). Premier jour de la semaine selon la langue. Utilisé par SuDatePicker.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'date', description: 'Jour choisi (v-model)' },
    min: { control: 'date', description: 'Premier jour sélectionnable' },
    max: { control: 'date', description: 'Dernier jour sélectionnable' },
    locale: { control: { type: 'select' }, options: [undefined, 'fr', 'en-US', 'en-GB', 'de', 'ar'], description: 'Langue (défaut : locale des composants)' },
    weekStartsOn: { control: { type: 'number', min: 0, max: 6 }, description: 'Premier jour de la semaine (0 = dimanche)' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: `
      <Calendar v-bind="args" v-model="date" />
      <p style="margin: 0.75rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">{{ date ? date.toLocaleDateString('fr-FR', { dateStyle: 'full' }) : '—' }}</p>
    `
  })
}

export const Constraints: Story = {
  name: 'Bornes et jours exclus',
  render: () => ({
    components: { Calendar },
    setup() {
      const today = new Date()
      const min = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)
      const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6
      return { min, max, isWeekend, date: ref<Date | null>(null) }
    },
    template: '<Calendar v-model="date" :min="min" :max="max" :is-date-disabled="isWeekend" />'
  })
}

export const YearPicker: Story = {
  name: 'Choix de l’année (date de naissance)',
  parameters: {
    docs: {
      description: {
        story: 'Cliquer sur l’année du titre ouvre une page de 12 années ; choisir une année mène aux mois, puis aux jours.'
      }
    }
  },
  render: () => ({
    components: { Calendar },
    setup() {
      return { date: ref<Date | null>(new Date(1990, 4, 17)), min: new Date(1900, 0, 1), max: new Date() }
    },
    template: '<Calendar v-model="date" :min="min" :max="max" />'
  })
}

export const English: Story = {
  name: 'Anglais (US) : semaine du dimanche',
  args: { locale: 'en-US' },
  render: Default.render
}

