import type { Meta, StoryObj } from '@storybook/vue3'
import DsAutocomplete from '../components/DsAutocomplete.vue'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Fase 4/DsAutocomplete',
  component: DsAutocomplete as any,
  tags: ['autodocs'],
}
export default meta

export const Playground: StoryObj = {
  render: () => ({
    components: { DsAutocomplete },
    setup() {
      const selected = ref(null)
      const items = ref<any[]>([])

      function onSearch(term: string) {
        const all = [
          { label: 'Data Stone LTDA', cpf_cnpj: '12.345.678/0001-90' },
          { label: 'João da Silva', cpf_cnpj: '123.456.789-00' },
          { label: 'Maria Santos', cpf_cnpj: '987.654.321-00' },
          { label: 'Tech Solutions', cpf_cnpj: '98.765.432/0001-10' },
          { label: 'Web Services', cpf_cnpj: '11.222.333/0001-44' },
        ]
        items.value = all.filter(i =>
          i.label.toLowerCase().includes(term.toLowerCase()) ||
          i.cpf_cnpj.includes(term)
        )
      }

      return { selected, items, onSearch }
    },
    template: `
      <div class="w-[400px]">
        <DsAutocomplete
          v-model="selected"
          v-model:items="items"
          placeholder="Buscar por nome ou CPF/CNPJ..."
          label-key="label"
          @search="onSearch"
        />
        <p v-if="selected" class="mt-3 text-sm text-gray-500">Selecionado: {{ selected.label }}</p>
      </div>
    `,
  }),
}
