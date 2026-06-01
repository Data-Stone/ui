import type { Meta, StoryObj } from '@storybook/vue3'
import DsMenuButton from '../components/DsMenuButton.vue'

const meta: Meta<typeof DsMenuButton> = {
  title: 'Navigation/DsMenuButton',
  component: DsMenuButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botão 3-dots com dropdown de ações.',
      },
    },
  },
  argTypes: {
    items: { control: 'object', description: 'Lista de itens do menu (label, icon, disabled, danger)' },
    disabled: { control: 'boolean', description: 'Desabilita o botão de menu' },
    loading: { control: 'boolean', description: 'Exibe estado de carregamento' },
  },
}

export default meta
type Story = StoryObj<typeof DsMenuButton>

export const Default: Story = {
  args: {
    items: [
      { label: 'Editar', icon: 'i-heroicons-chart-bar' },
      { label: 'Duplicar' },
      { label: 'Excluir', danger: true },
    ],
  },
}
