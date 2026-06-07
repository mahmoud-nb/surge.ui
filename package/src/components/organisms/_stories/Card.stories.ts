import type { Meta, StoryObj } from '@storybook/vue3'
import Card from '../Card.vue'
import Badge from '../../atoms/Badge.vue'
import Button from '../../atoms/Button.vue'

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
const DEMO_IMAGE_2 = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop'
const DEMO_IMAGE_PORTRAIT = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop'

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Carte universelle flexible et responsive. Supporte images, titres, contenu, actions, liens, et plusieurs variantes visuelles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'filled'],
      description: 'Variante visuelle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille (padding, typographie)',
    },
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Direction du layout',
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Rayon des coins',
    },
    clickable: {
      control: 'boolean',
      description: 'Rend la carte cliquable avec hover/focus states',
    },
    href: {
      control: 'text',
      description: 'Lien href — rend la carte navigable',
    },
    image: {
      control: 'text',
      description: 'URL de l\'image d\'en-tete',
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text de l\'image',
    },
    imageRatio: {
      control: { type: 'select' },
      options: ['16/9', '4/3', '1/1', '21/9', 'auto'],
      description: 'Ratio de l\'image',
    },
    imageFit: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill'],
      description: 'Ajustement de l\'image',
    },
    imagePosition: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: 'Position de l\'image',
    },
    title: {
      control: 'text',
      description: 'Titre de la carte',
    },
    subtitle: {
      control: 'text',
      description: 'Sous-titre ou description',
    },
    titleLevel: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Niveau de heading (h1-h6)',
    },
    disabled: {
      control: 'boolean',
      description: 'Etat desactive',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Pleine largeur',
    },
    maxWidth: {
      control: 'text',
      description: 'Largeur max personnalisee',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ========================================
// Stories
// ========================================

export const Default: Story = {
  args: {
    title: 'Titre de la carte',
    subtitle: 'Une description courte pour illustrer le contenu.',
    image: DEMO_IMAGE,
    imageAlt: 'Paysage de montagne',
    maxWidth: '360px',
  },
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <p>Contenu principal de la carte avec du texte libre.</p>
      </Card>
    `,
  }),
}

export const Variants: Story = {
  name: 'Variantes',
  render: () => ({
    components: { Card },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 280px); gap: 1rem;">
        <Card variant="default" title="Default" subtitle="Bordure standard">
          <p>Contenu de la carte.</p>
        </Card>
        <Card variant="outlined" title="Outlined" subtitle="Bordure prononcee">
          <p>Contenu de la carte.</p>
        </Card>
        <Card variant="elevated" title="Elevated" subtitle="Ombre portee">
          <p>Contenu de la carte.</p>
        </Card>
        <Card variant="filled" title="Filled" subtitle="Fond colore">
          <p>Contenu de la carte.</p>
        </Card>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'Tailles',
  render: () => ({
    components: { Card },
    template: `
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <Card size="sm" title="Small" subtitle="Compact" maxWidth="220px">
          <p>Contenu sm.</p>
        </Card>
        <Card size="md" title="Medium" subtitle="Standard" maxWidth="280px">
          <p>Contenu md.</p>
        </Card>
        <Card size="lg" title="Large" subtitle="Spacieux" maxWidth="340px">
          <p>Contenu lg.</p>
        </Card>
      </div>
    `,
  }),
}

export const WithImage: Story = {
  name: 'Avec image',
  render: () => ({
    components: { Card },
    template: `
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <Card
          :image="'${DEMO_IMAGE}'"
          imageAlt="Montagne"
          imageRatio="16/9"
          title="Paysage alpin"
          subtitle="Decouvrez les montagnes"
          maxWidth="320px"
        >
          <p>Une vue imprenable sur les sommets enneiges.</p>
        </Card>
        <Card
          :image="'${DEMO_IMAGE_2}'"
          imageAlt="Lac"
          imageRatio="4/3"
          title="Lac de montagne"
          subtitle="Serenite naturelle"
          maxWidth="320px"
        >
          <p>Un lac paisible entoure de forets.</p>
        </Card>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  name: 'Direction horizontale',
  render: () => ({
    components: { Card },
    template: `
      <Card
        direction="horizontal"
        :image="'${DEMO_IMAGE}'"
        imageAlt="Montagne"
        title="Carte horizontale"
        subtitle="Image a gauche, contenu a droite"
        maxWidth="600px"
      >
        <p>Ce layout est ideal pour les listes d'articles, les resultats de recherche, ou les aperçus de produits.</p>
      </Card>
    `,
  }),
}

export const Clickable: Story = {
  name: 'Cliquable',
  render: () => ({
    components: { Card },
    template: `
      <div style="display: flex; gap: 1rem;">
        <Card
          :clickable="true"
          :image="'${DEMO_IMAGE}'"
          imageAlt="Montagne"
          title="Carte cliquable"
          subtitle="Hover et focus states"
          maxWidth="300px"
          @click="() => alert('Click!')"
        >
          <p>Cliquez sur cette carte.</p>
        </Card>
        <Card
          href="https://example.com"
          target="_blank"
          :image="'${DEMO_IMAGE_2}'"
          imageAlt="Lac"
          title="Carte lien"
          subtitle="Rendu en tant que <a>"
          maxWidth="300px"
        >
          <p>Cette carte est un lien.</p>
        </Card>
      </div>
    `,
  }),
}

export const WithOverlay: Story = {
  name: 'Avec overlay image',
  render: () => ({
    components: { Card, Badge },
    template: `
      <Card
        :image="'${DEMO_IMAGE}'"
        imageAlt="Montagne"
        title="Article populaire"
        subtitle="Publie le 7 juin 2026"
        maxWidth="340px"
      >
        <template #image-overlay>
          <Badge variant="primary" size="sm">Populaire</Badge>
        </template>
        <p>Un article avec un badge overlay sur l'image.</p>
      </Card>
    `,
  }),
}

export const WithFooter: Story = {
  name: 'Avec footer',
  render: () => ({
    components: { Card, Button },
    template: `
      <Card
        :image="'${DEMO_IMAGE}'"
        imageAlt="Montagne"
        title="Destination de reve"
        subtitle="A partir de 299 EUR par personne"
        maxWidth="340px"
      >
        <p>Decouvrez cette destination exceptionnelle avec nos offres exclusives.</p>
        <template #footer>
          <Button variant="primary" size="sm">Reserver</Button>
          <Button variant="ghost" size="sm">En savoir plus</Button>
        </template>
      </Card>
    `,
  }),
}

export const ProductCard: Story = {
  name: 'Carte produit',
  render: () => ({
    components: { Card, Badge, Button },
    template: `
      <Card
        :image="'${DEMO_IMAGE}'"
        imageAlt="Produit"
        variant="elevated"
        title="Sac de randonnee"
        maxWidth="300px"
        :clickable="true"
      >
        <template #image-overlay>
          <Badge variant="error" size="sm">-30%</Badge>
        </template>
        <template #subtitle>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 700; color: var(--su-state-error);">69,99 EUR</span>
            <span style="text-decoration: line-through; color: var(--su-text-tertiary); font-size: 0.875rem;">99,99 EUR</span>
          </div>
        </template>
        <template #footer>
          <Button variant="primary" size="sm" block>Ajouter au panier</Button>
        </template>
      </Card>
    `,
  }),
}

export const BlogPostCard: Story = {
  name: 'Carte article de blog',
  render: () => ({
    components: { Card, Badge },
    template: `
      <Card
        direction="horizontal"
        :image="'${DEMO_IMAGE_2}'"
        imageAlt="Article"
        title="Les meilleures pratiques Vue.js en 2026"
        maxWidth="700px"
        :clickable="true"
      >
        <template #header>
          <div style="display: flex; gap: 0.5rem;">
            <Badge variant="primary" size="sm">Vue.js</Badge>
            <Badge variant="default" size="sm">Tutorial</Badge>
          </div>
        </template>
        <p>Decouvrez les dernieres pratiques recommandees pour developper avec Vue.js 3 et la Composition API.</p>
        <template #footer>
          <span style="font-size: 0.75rem; color: var(--su-text-tertiary);">7 juin 2026 · 5 min de lecture</span>
        </template>
      </Card>
    `,
  }),
}

export const ProfileCard: Story = {
  name: 'Carte profil',
  render: () => ({
    components: { Card, Button },
    template: `
      <Card
        variant="elevated"
        title="Marie Dupont"
        subtitle="Developpeur Frontend Senior"
        maxWidth="300px"
        radius="lg"
      >
        <template #image>
          <div style="display: flex; justify-content: center; padding: 1.5rem 1.5rem 0;">
            <img
              src="${DEMO_IMAGE_PORTRAIT}"
              alt="Marie Dupont"
              style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;"
            />
          </div>
        </template>
        <p style="text-align: center;">Passionnee par le design system et l'accessibilite web.</p>
        <template #footer>
          <div style="display: flex; gap: 0.5rem; width: 100%; justify-content: center;">
            <Button variant="primary" size="sm">Suivre</Button>
            <Button variant="outline" size="sm">Message</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Desactivee',
  args: {
    title: 'Carte desactivee',
    subtitle: 'Cette carte est inactive',
    image: DEMO_IMAGE,
    imageAlt: 'Montagne',
    disabled: true,
    clickable: true,
    maxWidth: '300px',
  },
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <p>Contenu d'une carte desactivee.</p>
      </Card>
    `,
  }),
}

export const ImageBottom: Story = {
  name: 'Image en bas',
  render: () => ({
    components: { Card },
    template: `
      <Card
        :image="'${DEMO_IMAGE}'"
        imageAlt="Montagne"
        imagePosition="bottom"
        title="Image en bas"
        subtitle="Le contenu apparait avant l'image"
        maxWidth="320px"
      >
        <p>Cette disposition est utile pour les cartes avec un CTA visible immediatement.</p>
      </Card>
    `,
  }),
}

export const NoImage: Story = {
  name: 'Sans image',
  render: () => ({
    components: { Card, Button },
    template: `
      <div style="display: flex; gap: 1rem;">
        <Card title="Carte simple" subtitle="Sans image ni footer" maxWidth="280px">
          <p>Contenu textuel uniquement.</p>
        </Card>
        <Card variant="filled" title="Avec actions" maxWidth="280px">
          <p>Carte avec un footer d'actions.</p>
          <template #footer>
            <Button variant="primary" size="sm">Action</Button>
          </template>
        </Card>
      </div>
    `,
  }),
}
