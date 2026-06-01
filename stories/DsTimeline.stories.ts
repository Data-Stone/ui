import type { Meta, StoryObj } from '@storybook/vue3'
import DsTimeline from '../components/DsTimeline.vue'
import type { TimelineEvent } from '../types'

const meta: Meta<typeof DsTimeline> = {
  title: 'Data/DsTimeline',
  component: DsTimeline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Feed cronológico de eventos com severity tags.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    live: { control: 'boolean' },
    loading: { control: 'boolean' },
    maxItems: { control: { type: 'number', min: 0, max: 50 } },
    flat: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DsTimeline>

const events: TimelineEvent[] = [
  {
    id: 1,
    time: '14:32:41',
    text: '<strong>Maria R.</strong> finalizou atendimento #4821',
    category: 'Atendimento',
    severity: 'success',
  },
  {
    id: 2,
    time: '14:31:18',
    text: 'Latência elevada em <strong>analytics-rollup</strong>',
    category: 'Atenção',
    severity: 'warning',
  },
  {
    id: 3,
    time: '14:30:55',
    text: 'Falha no pipeline <strong>finance-snapshot</strong>',
    category: 'Falha',
    severity: 'error',
  },
  {
    id: 4,
    time: '14:29:33',
    text: 'Sincronização de dados iniciada',
    category: 'Sistema',
    severity: 'info',
  },
  {
    id: 5,
    time: '14:28:10',
    text: '<strong>Carlos L.</strong> entrou na fila de Vendas',
    category: 'Vendas',
    severity: 'neutral',
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { DsTimeline },
    setup: () => ({ args }),
    template: '<DsTimeline v-bind="args" />',
  }),
  args: {
    title: 'Atividade recente',
    events,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Atividade recente',
  },
}

export const AoVivo: Story = {
  name: 'Ao vivo',
  render: (args) => ({
    components: { DsTimeline },
    setup: () => ({ args }),
    template: '<DsTimeline v-bind="args" />',
  }),
  args: {
    title: 'Atividade recente',
    events,
    live: true,
  },
}
