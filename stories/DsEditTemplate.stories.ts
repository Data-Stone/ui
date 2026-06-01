import type { Meta, StoryObj } from '@storybook/vue3'
import DsEditTemplate from '../components/DsEditTemplate.vue'
import { ref } from 'vue'

const meta: Meta<typeof DsEditTemplate> = {
  title: 'Layout/DsEditTemplate',
  component: DsEditTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Template de página de edição/detalhe.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título exibido no header' },
    editMode: { control: 'boolean', description: 'Ativa o modo de edição com botões salvar/cancelar' },
    loading: { control: 'boolean', description: 'Exibe skeleton de carregamento' },
    loadingSave: { control: 'boolean', description: 'Exibe overlay de salvamento' },
    showEditButton: { control: 'boolean', description: 'Exibe o botão Editar no modo visualização' },
    showSaveButton: { control: 'boolean', description: 'Exibe o botão Salvar no modo edição' },
    showCancelButton: { control: 'boolean', description: 'Exibe o botão Cancelar no modo edição' },
    showBackButton: { control: 'boolean', description: 'Exibe o botão Voltar no header' },
  },
}

export default meta
type Story = StoryObj<typeof DsEditTemplate>

export const Default: Story = {
  render: (args) => ({
    components: { DsEditTemplate },
    setup: () => ({ args }),
    template: `
      <DsEditTemplate v-bind="args" title="Editar cliente">
        <template #form>
          <div class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Nome</label>
              <input value="Maria Santos" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Email</label>
              <input value="maria@exemplo.com" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
            </div>
          </div>
        </template>
      </DsEditTemplate>
    `,
  }),
}

export const ModoEdicao: Story = {
  name: 'Modo edição',
  render: (args) => ({
    components: { DsEditTemplate },
    setup() {
      const editMode = ref(true)
      return { args, editMode }
    },
    template: `
      <DsEditTemplate v-bind="args" title="Editar cliente" :edit-mode="editMode">
        <template #form>
          <div class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Nome</label>
              <input value="Maria Santos" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Email</label>
              <input value="maria@exemplo.com" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900" />
            </div>
          </div>
        </template>
      </DsEditTemplate>
    `,
  }),
}

export const Loading: Story = {
  args: {
    title: 'Carregando...',
    loading: true,
  },
}
