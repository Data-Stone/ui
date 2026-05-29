import type { Meta, StoryObj } from '@storybook/vue3'
import DsFormCollapsible from '../components/DsFormCollapsible.vue'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Fase 4/DsFormCollapsible',
  component: DsFormCollapsible as any,
  tags: ['autodocs'],
}
export default meta

export const MultiplosSteps: StoryObj = {
  name: 'Múltiplos Steps',
  render: () => ({
    components: { DsFormCollapsible },
    setup() {
      const activeStep = ref(1)
      return { activeStep }
    },
    template: `
      <div class="w-[600px] divide-y divide-gray-100">
        <DsFormCollapsible
          :open="activeStep === 0"
          label="Dados pessoais"
          description="Nome, e-mail e telefone"
          :step="1"
          :completed="activeStep > 0"
          @toggle="activeStep = 0"
        >
          <div class="flex flex-col gap-3">
            <input type="text" placeholder="Nome completo" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
            <input type="email" placeholder="E-mail" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
          </div>
          <template #actions>
            <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg" @click="activeStep = 1">Continuar</button>
          </template>
        </DsFormCollapsible>

        <DsFormCollapsible
          :open="activeStep === 1"
          label="Endereço"
          description="CEP, rua, número"
          :step="2"
          :completed="activeStep > 1"
          @toggle="activeStep = 1"
        >
          <div class="flex flex-col gap-3">
            <input type="text" placeholder="CEP" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
            <input type="text" placeholder="Endereço" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
          </div>
          <template #actions>
            <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg" @click="activeStep = 2">Continuar</button>
          </template>
        </DsFormCollapsible>

        <DsFormCollapsible
          :open="activeStep === 2"
          label="Pagamento"
          :step="3"
          :disabled="activeStep < 2"
          @toggle="activeStep = 2"
        >
          <div class="flex flex-col gap-3">
            <input type="text" placeholder="Número do cartão" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
          </div>
          <template #actions>
            <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">Finalizar pedido</button>
          </template>
        </DsFormCollapsible>
      </div>
    `,
  }),
}
