import type { Meta, StoryObj } from '@storybook/vue3'
import DsResourceCard from '../components/DsResourceCard.vue'

const meta: Meta<typeof DsResourceCard> = {
  title: 'Data/DsResourceCard',
  component: DsResourceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card com ícone + título + descrição.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título do card' },
    description: { control: 'text', description: 'Descrição exibida abaixo do título' },
    icon: { control: 'text', description: 'Nome do ícone (alternativa à imagem)' },
    image: { control: 'object', description: 'Objeto com src e alt da imagem' },
  },
}

export default meta
type Story = StoryObj<typeof DsResourceCard>

export const Default: Story = {
  args: {
    title: 'Data Reveal',
    description: 'Identifique visitantes anônimos do seu site em tempo real.',
    icon: 'i-heroicons-chart-bar',
  },
}

export const ComImagem: Story = {
  name: 'Com imagem',
  args: {
    title: 'Data Reveal',
    description: 'Identifique visitantes anônimos do seu site em tempo real.',
    image: {
      src: 'https://placehold.co/32x32/436fbe/ffffff?text=DS',
      alt: 'Data Stone',
    },
  },
}
