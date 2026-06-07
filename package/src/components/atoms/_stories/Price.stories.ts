import type { Meta, StoryObj } from '@storybook/vue3'
import Price from '../Price.vue'
import Badge from '../Badge.vue'

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant d\'affichage de prix avec support multi-devises, variantes promotionnelles, et accessibilité.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: { type: 'number' },
      description: 'Montant numérique à afficher',
    },
    originalAmount: {
      control: { type: 'number' },
      description: 'Montant original (prix barré pour promotion)',
    },
    currency: {
      control: 'text',
      description: 'Code devise ISO 4217 (EUR, USD, GBP...)',
    },
    locale: {
      control: 'text',
      description: 'Locale BCP 47 (fr-FR, en-US...)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'highlight', 'muted'],
      description: 'Variante visuelle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du prix',
    },
    integerOnly: {
      control: 'boolean',
      description: 'Afficher uniquement la partie entière',
    },
    showOriginal: {
      control: 'boolean',
      description: 'Afficher le prix original barré',
    },
    superscriptDecimals: {
      control: 'boolean',
      description: 'Décimales en exposant (style e-commerce)',
    },
    currencyDisplay: {
      control: { type: 'select' },
      options: ['symbol', 'narrowSymbol', 'code', 'name'],
      description: 'Format d\'affichage de la devise',
    },
    currencyPosition: {
      control: { type: 'select' },
      options: ['auto', 'prefix', 'suffix'],
      description: 'Position du symbole de devise',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible personnalisé',
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
    amount: 29.99,
    currency: 'EUR',
    locale: 'fr-FR',
  },
}

export const Sizes: Story = {
  name: 'Tailles',
  render: () => ({
    components: { Price },
    template: `
      <div style="display: flex; align-items: baseline; gap: 2rem;">
        <div style="text-align: center;">
          <Price :amount="29.99" size="sm" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">sm</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="29.99" size="md" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">md</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="29.99" size="lg" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">lg</div>
        </div>
      </div>
    `,
  }),
}

export const Variants: Story = {
  name: 'Variantes',
  render: () => ({
    components: { Price },
    template: `
      <div style="display: flex; align-items: baseline; gap: 2rem;">
        <div style="text-align: center;">
          <Price :amount="29.99" variant="default" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">default</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="29.99" variant="highlight" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">highlight</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="29.99" variant="muted" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">muted</div>
        </div>
      </div>
    `,
  }),
}

export const IntegerOnly: Story = {
  name: 'Entier uniquement',
  args: {
    amount: 1299.99,
    integerOnly: true,
    size: 'lg',
  },
}

export const WithOriginalPrice: Story = {
  name: 'Prix barré',
  args: {
    amount: 29.99,
    originalAmount: 49.99,
    showOriginal: true,
    size: 'lg',
  },
}

export const PromotionalPricing: Story = {
  name: 'Prix promotionnel',
  render: () => ({
    components: { Price, Badge },
    template: `
      <Price
        :amount="29.99"
        :originalAmount="49.99"
        :showOriginal="true"
        variant="highlight"
        size="lg"
      >
        <template #prefix>
          <span>Dès</span>
        </template>
        <template #suffix>
          <Badge variant="error" size="sm">-40%</Badge>
        </template>
      </Price>
    `,
  }),
}

export const CurrencyPositions: Story = {
  name: 'Positions devises',
  render: () => ({
    components: { Price },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 80px; font-size: 0.875rem; color: #666;">EUR (fr-FR)</span>
          <Price :amount="1299.99" currency="EUR" locale="fr-FR" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 80px; font-size: 0.875rem; color: #666;">USD (en-US)</span>
          <Price :amount="1299.99" currency="USD" locale="en-US" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 80px; font-size: 0.875rem; color: #666;">GBP (en-GB)</span>
          <Price :amount="1299.99" currency="GBP" locale="en-GB" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 80px; font-size: 0.875rem; color: #666;">JPY (ja-JP)</span>
          <Price :amount="1299" currency="JPY" locale="ja-JP" />
        </div>
      </div>
    `,
  }),
}

export const MultipleLocales: Story = {
  name: 'Même montant, locales différentes',
  render: () => ({
    components: { Price },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 60px; font-size: 0.875rem; color: #666;">fr-FR</span>
          <Price :amount="1299.99" currency="EUR" locale="fr-FR" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 60px; font-size: 0.875rem; color: #666;">de-DE</span>
          <Price :amount="1299.99" currency="EUR" locale="de-DE" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 60px; font-size: 0.875rem; color: #666;">en-US</span>
          <Price :amount="1299.99" currency="EUR" locale="en-US" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 60px; font-size: 0.875rem; color: #666;">ja-JP</span>
          <Price :amount="1299.99" currency="EUR" locale="ja-JP" />
        </div>
      </div>
    `,
  }),
}

export const SuperscriptDecimals: Story = {
  name: 'Décimales en exposant',
  render: () => ({
    components: { Price },
    template: `
      <div style="display: flex; align-items: baseline; gap: 2rem;">
        <div style="text-align: center;">
          <Price :amount="29.99" :superscriptDecimals="true" size="md" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">md</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="29.99" :superscriptDecimals="true" size="lg" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">lg</div>
        </div>
        <div style="text-align: center;">
          <Price :amount="1299.99" :superscriptDecimals="true" size="lg" variant="highlight" />
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">lg highlight</div>
        </div>
      </div>
    `,
  }),
}

export const CustomFormat: Story = {
  name: 'Format personnalisé',
  render: () => ({
    components: { Price },
    setup() {
      const freeFormat = (amount: number) => amount === 0 ? 'Gratuit' : `${amount} €`
      return { freeFormat }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 120px; font-size: 0.875rem; color: #666;">Montant = 0</span>
          <Price :amount="0" :formatValue="freeFormat" size="lg" />
        </div>
        <div style="display: flex; align-items: baseline; gap: 1rem;">
          <span style="min-width: 120px; font-size: 0.875rem; color: #666;">Montant = 29.99</span>
          <Price :amount="29.99" :formatValue="freeFormat" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const WithSlots: Story = {
  name: 'Avec slots',
  render: () => ({
    components: { Price, Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.5rem;">Avec préfixe</div>
          <Price :amount="9.99" size="lg">
            <template #prefix>
              <span>À partir de</span>
            </template>
          </Price>
        </div>

        <div>
          <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.5rem;">Avec suffixe</div>
          <Price :amount="9.99" size="lg">
            <template #suffix>
              <span>/mois</span>
            </template>
          </Price>
        </div>

        <div>
          <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.5rem;">Prix promotionnel complet</div>
          <Price
            :amount="29.99"
            :originalAmount="49.99"
            :showOriginal="true"
            variant="highlight"
            size="lg"
          >
            <template #prefix>
              <span>Dès</span>
            </template>
            <template #suffix>
              <Badge variant="error" size="sm">-40%</Badge>
            </template>
          </Price>
        </div>
      </div>
    `,
  }),
}
