import type { Meta, StoryObj } from '@storybook/vue3'
import DsChannelList from '../components/DsChannelList.vue'
import { ref } from 'vue'
import type { Channel } from '../types'

const meta: Meta<typeof DsChannelList> = {
  title: 'Navigation/DsChannelList',
  component: DsChannelList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Lista de canais com status colorido e contagem.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    hideCount: { control: 'boolean' },
    compact: { control: 'boolean' },
    channels: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof DsChannelList>

const channels: Channel[] = [
  { id: 'chat', name: 'Chat Online', status: 'online', count: 12 },
  { id: 'whatsapp', name: 'WhatsApp', status: 'busy', count: 8 },
  { id: 'email', name: 'Email', status: 'idle', count: 3 },
  { id: 'telefone', name: 'Telefone', status: 'error', count: 0 },
]

export const Default: Story = {
  render: (args) => ({
    components: { DsChannelList },
    setup: () => ({ args, active: ref<string | null>(null) }),
    template: `
      <div class="w-64">
        <DsChannelList v-bind="args" v-model="active" />
      </div>
    `,
  }),
  args: {
    title: 'Canais',
    channels,
  },
}

export const Compacto: Story = {
  name: 'Compacto',
  render: (args) => ({
    components: { DsChannelList },
    setup: () => ({ args, active: ref<string | null>(null) }),
    template: `
      <div class="w-52">
        <DsChannelList v-bind="args" v-model="active" />
      </div>
    `,
  }),
  args: {
    title: 'Canais',
    channels,
    compact: true,
  },
}
