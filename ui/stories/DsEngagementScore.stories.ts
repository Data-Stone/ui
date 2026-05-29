import type { Meta, StoryObj } from '@storybook/vue3'
import DsEngagementScore from '../components/DsEngagementScore.vue'

const meta: Meta<typeof DsEngagementScore> = {
  title: 'Data/DsEngagementScore',
  component: DsEngagementScore,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badge de engajamento com páginas e duração.',
      },
    },
  },
  argTypes: {
    pages: { control: 'number', description: 'Número de páginas visitadas' },
    duration: { control: 'text', description: 'Duração da sessão formatada' },
  },
}

export default meta
type Story = StoryObj<typeof DsEngagementScore>

export const Default: Story = {
  args: {
    pages: 12,
    duration: '5m 23s',
  },
}

export const BaixoEngajamento: Story = {
  name: 'Baixo engajamento',
  args: {
    pages: 1,
    duration: '0m 15s',
  },
}

export const AltoEngajamento: Story = {
  name: 'Alto engajamento',
  args: {
    pages: 47,
    duration: '32m 10s',
  },
}
