import type { Meta, StoryObj } from '@storybook/vue3'
import DsCurrencyInput from '../components/DsCurrencyInput.vue'
import { ref } from 'vue'

const meta: Meta<typeof DsCurrencyInput> = {
  title: 'Form/DsCurrencyInput',
  component: DsCurrencyInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input monetário formatado em pt-BR.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label exibida acima do input' },
    prefix: { control: 'text', description: 'Prefixo monetário (padrão: R$)' },
    decimals: { control: { type: 'number', min: 0, max: 6 }, description: 'Número de casas decimais' },
    placeholder: { control: 'text', description: 'Placeholder do input' },
  },
}

export default meta
type Story = StoryObj<typeof DsCurrencyInput>

export const Default: Story = {
  render: (args) => ({
    components: { DsCurrencyInput },
    setup() {
      const value = ref<number | null>(null)
      return { args, value }
    },
    template: `
      <div class="w-72">
        <DsCurrencyInput v-bind="args" v-model="value" label="Valor" />
        <p class="mt-2 text-xs text-gray-500">Valor numérico: {{ value }}</p>
      </div>
    `,
  }),
}

export const ComValor: Story = {
  name: 'Com valor inicial',
  render: (args) => ({
    components: { DsCurrencyInput },
    setup() {
      const value = ref<number | null>(1500.50)
      return { args, value }
    },
    template: `
      <div class="w-72">
        <DsCurrencyInput v-bind="args" v-model="value" label="Preço" />
        <p class="mt-2 text-xs text-gray-500">Valor numérico: {{ value }}</p>
      </div>
    `,
  }),
}
