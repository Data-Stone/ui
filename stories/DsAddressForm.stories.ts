import type { Meta, StoryObj } from '@storybook/vue3'
import DsAddressForm from '../components/DsAddressForm.vue'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Fase 4/DsAddressForm',
  component: DsAddressForm as any,
  tags: ['autodocs'],
}
export default meta

export const Padrao: StoryObj = {
  name: 'Padrão',
  render: () => ({
    components: { DsAddressForm },
    setup() {
      const address = ref({
        postalCode: '',
        address: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        country: 'Brasil',
      })
      return { address }
    },
    template: `
      <div class="w-[700px]">
        <DsAddressForm v-model="address" />
        <pre class="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">{{ JSON.stringify(address, null, 2) }}</pre>
      </div>
    `,
  }),
}

export const Preenchido: StoryObj = {
  render: () => ({
    components: { DsAddressForm },
    setup() {
      const address = ref({
        postalCode: '01310-100',
        address: 'Avenida Paulista',
        number: '1000',
        complement: 'Sala 1010',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
      })
      return { address }
    },
    template: `<div class="w-[700px]"><DsAddressForm v-model="address" /></div>`,
  }),
}

export const Desabilitado: StoryObj = {
  render: () => ({
    components: { DsAddressForm },
    setup() {
      const address = ref({
        postalCode: '01310-100',
        address: 'Avenida Paulista',
        number: '1000',
        complement: '',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
      })
      return { address }
    },
    template: `<div class="w-[700px]"><DsAddressForm v-model="address" :disabled="true" /></div>`,
  }),
}
