import type { Meta, StoryObj } from '@storybook/vue3'
import DsDialog from '../components/DsDialog.vue'
import { ref } from 'vue'

const meta: Meta<typeof DsDialog> = {
  title: 'Overlay/DsDialog',
  component: DsDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dialog base com slots para content e footer.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título exibido no header do dialog' },
    icon: { control: 'text', description: 'Ícone exibido ao lado do título' },
    maxWidth: { control: 'text', description: 'Largura máxima do dialog (CSS)' },
  },
}

export default meta
type Story = StoryObj<typeof DsDialog>

export const Default: Story = {
  render: (args) => ({
    components: { DsDialog },
    setup() {
      const open = ref(true)
      return { args, open }
    },
    template: `
      <div>
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          @click="open = true"
        >
          Abrir dialog
        </button>
        <DsDialog v-model="open" title="Detalhes do cliente">
          <template #content>
            <p class="text-sm text-gray-500">
              Aqui você pode visualizar e editar as informações do cliente selecionado.
            </p>
          </template>
          <template #footer>
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              @click="open = false"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              @click="open = false"
            >
              Confirmar
            </button>
          </template>
        </DsDialog>
      </div>
    `,
  }),
}
