import type { Meta, StoryObj } from '@storybook/vue3'
import DsFilterBar from '../components/DsFilterBar.vue'

const meta: Meta<typeof DsFilterBar> = {
  title: 'Form/DsFilterBar',
  component: DsFilterBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Painel colapsável de filtros.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título exibido no cabeçalho do painel' },
    defaultOpen: { control: 'boolean', description: 'Se o painel inicia aberto' },
  },
}

export default meta
type Story = StoryObj<typeof DsFilterBar>

export const Default: Story = {
  render: (args) => ({
    components: { DsFilterBar },
    setup: () => ({ args }),
    template: `
      <DsFilterBar v-bind="args">
        <div class="grid grid-cols-2 gap-3">
          <input placeholder="Nome" class="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400" />
          <input placeholder="Email" class="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400" />
        </div>
      </DsFilterBar>
    `,
  }),
}

export const Aberto: Story = {
  render: (args) => ({
    components: { DsFilterBar },
    setup: () => ({ args }),
    template: `
      <DsFilterBar v-bind="args" default-open>
        <div class="grid grid-cols-2 gap-3">
          <input placeholder="De" type="date" class="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
          <input placeholder="Até" type="date" class="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
        </div>
      </DsFilterBar>
    `,
  }),
}
