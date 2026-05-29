import type { Meta, StoryObj } from '@storybook/vue3'
import DsKpiCard from '../components/DsKpiCard.vue'

const meta: Meta<typeof DsKpiCard> = {
  title: 'Data/DsKpiCard',
  component: DsKpiCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card de KPI com ícone, tooltip, badge, trend e skeleton loading. Baseado no MetricCard do Data Reveal.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    tooltipText: { control: 'text' },
    subtitle: { control: 'text' },
    loading: { control: 'boolean' },
    highlight: { control: 'boolean' },
    live: { control: 'boolean' },
    badge: { control: 'object' },
    trend: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof DsKpiCard>

export const Default: Story = {
  args: {
    title: 'Visitantes únicos',
    value: '1.247',
    icon: 'i-heroicons-chart-bar',
    tooltipText: 'Total de visitantes únicos nos últimos 30 dias',
  },
}

export const ComBadge: Story = {
  name: 'Com badge',
  args: {
    title: 'Visitantes únicos',
    value: '1.247',
    icon: 'i-heroicons-chart-bar',
    tooltipText: 'Total de visitantes únicos nos últimos 30 dias',
    badge: { text: 'HOT', color: 'red' as const },
  },
}

export const ComTrend: Story = {
  name: 'Com trend',
  args: {
    title: 'Visitantes únicos',
    value: '1.247',
    icon: 'i-heroicons-chart-bar',
    tooltipText: 'Total de visitantes únicos nos últimos 30 dias',
    trend: { value: '+12.5%', isPositive: true, label: 'vs mês anterior' },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    title: '',
    value: '',
  },
}
