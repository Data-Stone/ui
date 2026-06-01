import type { Meta, StoryObj } from '@storybook/vue3'
import DsKpiGrid from '../components/DsKpiGrid.vue'
import type { KpiItem } from '../types'

const meta: Meta<typeof DsKpiGrid> = {
  title: 'Data/DsKpiGrid',
  component: DsKpiGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Grid responsiva de KPI cards.',
      },
    },
  },
  argTypes: {
    columns: { control: { type: 'inline-radio' }, options: [2, 3, 4, 5, 6] },
    gap: { control: { type: 'inline-radio' }, options: [2, 3, 4, 5, 6, 8] },
    items: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof DsKpiGrid>

const defaultItems: KpiItem[] = [
  {
    title: 'Visitantes únicos',
    value: '14.2k',
    icon: 'i-heroicons-users',
    tooltipText: 'Total de visitantes únicos no período',
  },
  {
    title: 'Empresas identificadas',
    value: '3.2k',
    icon: 'i-heroicons-building-office',
    tooltipText: 'Empresas identificadas via IP e formulários',
  },
  {
    title: 'Pageviews',
    value: '48.7k',
    icon: 'i-heroicons-eye',
    tooltipText: 'Total de visualizações de página',
  },
  {
    title: 'Duração média',
    value: '2m 34s',
    icon: 'i-heroicons-clock',
    tooltipText: 'Tempo médio de permanência por sessão',
  },
]

const threeItems: KpiItem[] = [
  {
    title: 'Visitantes únicos',
    value: '14.2k',
    icon: 'i-heroicons-users',
    tooltipText: 'Total de visitantes únicos no período',
  },
  {
    title: 'Empresas identificadas',
    value: '3.2k',
    icon: 'i-heroicons-building-office',
    tooltipText: 'Empresas identificadas via IP e formulários',
  },
  {
    title: 'Pageviews',
    value: '48.7k',
    icon: 'i-heroicons-eye',
    tooltipText: 'Total de visualizações de página',
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { DsKpiGrid },
    setup: () => ({ args }),
    template: '<DsKpiGrid v-bind="args" />',
  }),
  args: {
    items: defaultItems,
    columns: 4,
  },
}

export const TresKpis: Story = {
  name: '3 colunas',
  render: (args) => ({
    components: { DsKpiGrid },
    setup: () => ({ args }),
    template: '<DsKpiGrid v-bind="args" />',
  }),
  args: {
    items: threeItems,
    columns: 3,
  },
}
