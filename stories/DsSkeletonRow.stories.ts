import type { Meta, StoryObj } from '@storybook/vue3'
import DsSkeletonRow from '../components/DsSkeletonRow.vue'

const meta: Meta<typeof DsSkeletonRow> = {
  title: 'Feedback/DsSkeletonRow',
  component: DsSkeletonRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Skeleton genérico de linha para listas.',
      },
    },
  },
  argTypes: {
    avatar: { control: 'boolean', description: 'Exibe o skeleton circular de avatar' },
    columns: { control: { type: 'number', min: 1, max: 4 }, description: 'Número de colunas de skeleton' },
  },
}

export default meta
type Story = StoryObj<typeof DsSkeletonRow>

export const Default: Story = {
  render: (args) => ({
    components: { DsSkeletonRow },
    setup: () => ({ args }),
    template: `
      <div class="max-w-xl border border-gray-200 rounded-lg divide-y divide-gray-200">
        <DsSkeletonRow v-bind="args" />
        <DsSkeletonRow v-bind="args" />
        <DsSkeletonRow v-bind="args" />
      </div>
    `,
  }),
}

export const SemAvatar: Story = {
  name: 'Sem avatar',
  args: {
    avatar: false,
  },
}

export const TresColunas: Story = {
  name: '3 colunas',
  args: {
    columns: 3,
  },
}
