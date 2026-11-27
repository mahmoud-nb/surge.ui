import type { Meta, StoryObj } from '@storybook/vue3'
import HeroLayout from '../HeroLayout.vue'
import Button from '../../atoms/Button.vue'
import Badge from '../../atoms/Badge.vue'
import { DemoBox } from './layoutDemo'

const meta: Meta<typeof HeroLayout> = {
  title: 'Templates/HeroLayout',
  component: HeroLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page d\'atterrissage (lancement de produit, inscription) : une accroche — slots `eyebrow`, `title`, `description`, `actions`, `media` — suivie des sections de la page (slot `default`). Le titre a une taille fluide selon la largeur du conteneur ; le visuel passe à côté du texte dès 1024px avec `mediaPosition="end"`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['center', 'start'],
      description: 'Alignement du texte de l\'accroche',
      table: { defaultValue: { summary: 'center' } }
    },
    mediaPosition: {
      control: { type: 'radio' },
      options: ['bottom', 'end'],
      description: 'Visuel sous le texte, ou à côté dès un conteneur de 1024px',
      table: { defaultValue: { summary: 'bottom' } }
    },
    fullHeight: {
      control: 'boolean',
      description: 'L\'accroche occupe au moins la hauteur de l\'écran',
      table: { defaultValue: { summary: 'false' } }
    },
    titleTag: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3'],
      description: 'Niveau du titre',
      table: { defaultValue: { summary: 'h1' } }
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre l\'accroche et les sections',
      table: { defaultValue: { summary: 'xl' } }
    }
  },
  args: {
    align: 'center',
    mediaPosition: 'bottom',
    fullHeight: false,
    titleTag: 'h1',
    gap: 'xl'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const render: Story['render'] = (args) => ({
  components: { HeroLayout, DemoBox, Button, Badge },
  setup: () => ({ args }),
  template: `
    <HeroLayout v-bind="args" style="padding-inline: 1.5rem; padding-block-end: 3rem;">
      <template #eyebrow><Badge variant="secondary">Nouveau · version 3</Badge></template>
      <template #title>Lancez votre produit plus vite</template>
      <template #description>
        <p>Une accroche claire, un appel à l'action unique et un visuel : le parcours de la page reste simple.</p>
      </template>
      <template #actions>
        <Button variant="primary">Commencer gratuitement</Button>
        <Button variant="outline">Voir la démo</Button>
      </template>
      <template #media>
        <DemoBox label="Capture du produit" height="280px" tone="accent" />
      </template>

      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
        <DemoBox label="Fonctionnalité 1" height="140px" />
        <DemoBox label="Fonctionnalité 2" height="140px" />
        <DemoBox label="Fonctionnalité 3" height="140px" />
      </section>
    </HeroLayout>
  `
})

export const Default: Story = {
  name: 'Accroche centrée',
  render
}

export const MediaEnd: Story = {
  name: 'Visuel à côté',
  args: { mediaPosition: 'end', align: 'start' },
  render
}

export const FullHeight: Story = {
  name: 'Plein écran',
  args: { fullHeight: true },
  render
}
