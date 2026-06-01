import type { Meta, StoryObj } from '@storybook/vue3'
import DsBaseTemplate from '../components/DsBaseTemplate.vue'

const meta: Meta<typeof DsBaseTemplate> = {
  title: 'Layout/DsBaseTemplate',
  component: DsBaseTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Template de página de lista com header, filtros e tabela.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título exibido no header da página' },
    icon: { control: 'text', description: 'Nome do ícone exibido ao lado do título' },
  },
}

export default meta
type Story = StoryObj<typeof DsBaseTemplate>

export const Default: Story = {
  render: (args) => ({
    components: { DsBaseTemplate },
    setup: () => ({ args }),
    template: `
      <DsBaseTemplate v-bind="args" title="Clientes" icon="i-heroicons-chart-bar">
        <template #actions>
          <UButton color="primary" label="Novo cliente" />
        </template>
        <template #table>
          <table class="w-full text-sm text-gray-700">
            <thead>
              <tr class="border-b border-gray-200 text-left text-gray-500">
                <th class="px-4 py-3 font-medium">Nome</th>
                <th class="px-4 py-3 font-medium">Email</th>
                <th class="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100">
                <td class="px-4 py-3">Maria Santos</td>
                <td class="px-4 py-3 text-gray-500">maria@exemplo.com</td>
                <td class="px-4 py-3"><span class="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">Ativo</span></td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="px-4 py-3">João Silva</td>
                <td class="px-4 py-3 text-gray-500">joao@exemplo.com</td>
                <td class="px-4 py-3"><span class="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded text-xs font-medium">Pendente</span></td>
              </tr>
              <tr>
                <td class="px-4 py-3">Ana Costa</td>
                <td class="px-4 py-3 text-gray-500">ana@exemplo.com</td>
                <td class="px-4 py-3"><span class="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">Ativo</span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </DsBaseTemplate>
    `,
  }),
}
