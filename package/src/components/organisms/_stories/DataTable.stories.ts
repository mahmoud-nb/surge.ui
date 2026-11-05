import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DataTable from '../DataTable.vue'
import Tag from '../../atoms/Tag.vue'
import Button from '../../atoms/Button.vue'
import type { DataTableColumn, DataTableSort } from '@/types'

const statuses = ['Actif', 'En pause', 'Résilié'] as const
const cities = ['Paris', 'Lyon', 'Marseille', 'Nantes', 'Lille', 'Bordeaux', 'Évreux']
const firstNames = ['Émile', 'Adèle', 'Bruno', 'Chloé', 'Damien', 'Inès', 'Léa', 'Marc', 'Nora', 'Octave', 'Paul', 'Rose']

const customers = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  name: `${firstNames[index % firstNames.length]} ${String.fromCharCode(65 + (index * 7) % 26)}.`,
  city: cities[(index * 3) % cities.length],
  orders: (index * 37) % 140,
  revenue: ((index * 7919) % 50000) / 10,
  status: statuses[index % 3],
  since: new Date(2020 + (index % 6), (index * 5) % 12, 1 + (index % 27))
}))

const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const shortDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' })

const columns: DataTableColumn[] = [
  { key: 'name', label: 'Client', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
  { key: 'orders', label: 'Commandes', sortable: true, align: 'end' },
  { key: 'revenue', label: 'Chiffre d’affaires', sortable: true, align: 'end', format: (value: number) => euro.format(value) },
  { key: 'since', label: 'Client depuis', sortable: true, format: (value: Date) => shortDate.format(value) },
  { key: 'status', label: 'Statut' },
  { key: 'actions', label: 'Actions', hideLabel: true, align: 'end' }
]

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tableau de données sur un vrai `<table>` : titre (`caption`), en-têtes de colonnes et de lignes, tri annoncé (`aria-sort`), sélection par cases à cocher (état mixte), pagination locale ou serveur (`manual`), chargement (`aria-busy`) et état vide. Slots `cell-{clé}` et `header-{clé}`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object', description: 'Colonnes : key, label, sortable, align, width, format, sortFn, hideLabel' },
    rows: { control: 'object', description: 'Lignes' },
    rowKey: { control: 'text', description: 'Identifiant d’une ligne (propriété ou fonction)' },
    caption: { control: 'text', description: 'Titre du tableau (nom accessible)' },
    captionHidden: { control: 'boolean', description: 'Titre lu mais masqué' },
    selectable: { control: 'boolean', description: 'Cases à cocher de sélection (v-model:selected)' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Lignes par page' },
    manual: { control: 'boolean', description: 'Tri et pagination faits par le serveur' },
    total: { control: 'number', description: 'Total de lignes (mode manual)' },
    loading: { control: 'boolean', description: 'Chargement (squelettes, aria-busy)' },
    emptyText: { control: 'text', description: 'Texte de l’état vide' },
    striped: { control: 'boolean', description: 'Lignes alternées' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Densité' },
    stickyHeader: { control: 'boolean', description: 'En-tête collant' },
    maxHeight: { control: 'text', description: 'Hauteur maximale (défilement)' }
  },
  args: { columns, rows: customers, caption: 'Clients', pageSize: 8, selectable: true }
}

export default meta
type Story = StoryObj<typeof meta>

const statusVariant = (status: string) => (status === 'Actif' ? 'success' : status === 'En pause' ? 'warning' : 'default')

export const Default: Story = {
  render: (args) => ({
    components: { DataTable, Tag, Button },
    setup() {
      const sort = ref<DataTableSort | null>(null)
      const page = ref(1)
      const selected = ref<(string | number)[]>([])
      return { args, sort, page, selected, statusVariant }
    },
    template: `
      <DataTable v-bind="args" v-model:sort="sort" v-model:page="page" v-model:selected="selected">
        <template #cell-status="{ value }">
          <Tag :label="value" :variant="statusVariant(value)" size="sm" />
        </template>
        <template #cell-actions="{ row }">
          <Button variant="ghost" size="sm" :aria-label="'Modifier ' + row.name">Modifier</Button>
        </template>
      </DataTable>
      <p style="margin: 0.75rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">
        Sélection : {{ selected.length ? selected.join(', ') : 'aucune' }} · tri : {{ sort ? sort.key + ' ' + sort.direction : 'aucun' }}
      </p>
    `
  })
}

export const StickyHeader: Story = {
  name: 'En-tête collant',
  args: { pageSize: undefined, maxHeight: '20rem', stickyHeader: true, striped: true, selectable: false, size: 'sm' },
  render: Default.render
}

export const Loading: Story = {
  name: 'Chargement',
  args: { loading: true }
}

export const Empty: Story = {
  name: 'Vide',
  args: { rows: [], selectable: false, emptyText: 'Aucun client ne correspond aux filtres.' }
}

export const Server: Story = {
  name: 'Tri et pagination serveur',
  render: () => ({
    components: { DataTable },
    setup() {
      const sort = ref<DataTableSort | null>(null)
      const page = ref(1)
      const loading = ref(false)
      const pageRows = ref(customers.slice(0, 6))
      const fetchPage = () => {
        loading.value = true
        setTimeout(() => {
          const sorted = [...customers]
          if (sort.value) {
            const { key, direction } = sort.value
            sorted.sort((a, b) => {
              const x = a[key as keyof typeof a]
              const y = b[key as keyof typeof b]
              return (x < y ? -1 : x > y ? 1 : 0) * (direction === 'asc' ? 1 : -1)
            })
          }
          pageRows.value = sorted.slice((page.value - 1) * 6, page.value * 6)
          loading.value = false
        }, 600)
      }
      const columnsServer = columns.slice(0, 4)
      return { sort, page, loading, pageRows, fetchPage, columnsServer, total: customers.length }
    },
    template: `
      <DataTable
        :columns="columnsServer"
        :rows="pageRows"
        caption="Clients (serveur)"
        manual
        :total="total"
        :page-size="6"
        :loading="loading"
        v-model:sort="sort"
        v-model:page="page"
        @update:sort="fetchPage"
        @update:page="fetchPage"
      />
    `
  })
}
