import type { Meta, StoryObj } from '@storybook/vue3'
import DsNumberInput from '../components/DsNumberInput.vue'
import { ref } from 'vue'

const meta: Meta<typeof DsNumberInput> = {
  title: 'Form/DsNumberInput',
  component: DsNumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input numérico com botões spin.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label exibida acima do input' },
    placeholder: { control: 'text', description: 'Placeholder do input' },
    min: { control: 'number', description: 'Valor mínimo permitido' },
    max: { control: 'number', description: 'Valor máximo permitido' },
    step: { control: 'number', description: 'Incremento dos botões spin' },
    hideSpinButtons: { control: 'boolean', description: 'Oculta os botões de incremento/decremento' },
    disabled: { control: 'boolean', description: 'Desabilita o input' },
  },
}

export default meta
type Story = StoryObj<typeof DsNumberInput>

export const Default: Story = {
  render: (args) => ({
    components: { DsNumberInput },
    setup() {
      const value = ref(0)
      return { args, value }
    },
    template: `
      <div class="w-52">
        <DsNumberInput v-bind="args" v-model="value" label="Quantidade" />
        <p class="mt-2 text-xs text-gray-500">Valor: {{ value }}</p>
      </div>
    `,
  }),
}

export const ComLimites: Story = {
  name: 'Com limites',
  render: (args) => ({
    components: { DsNumberInput },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-52">
        <DsNumberInput v-bind="args" v-model="value" label="Quantidade" :min="0" :max="100" :step="5" />
        <p class="mt-2 text-xs text-gray-500">Valor: {{ value }}</p>
      </div>
    `,
  }),
}
