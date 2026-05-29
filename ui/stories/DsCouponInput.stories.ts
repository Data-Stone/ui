import type { Meta, StoryObj } from '@storybook/vue3'
import DsCouponInput from '../components/DsCouponInput.vue'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Fase 4/DsCouponInput',
  component: DsCouponInput as any,
  tags: ['autodocs'],
}
export default meta

export const Playground: StoryObj = {
  render: () => ({
    components: { DsCouponInput },
    setup() {
      const coupon = ref('')
      const couponRef = ref<any>(null)

      function onApply(code: string) {
        // Simula validação
        setTimeout(() => {
          if (code === 'DATASTONE10') {
            couponRef.value?.setStatus('valid')
          } else {
            couponRef.value?.setStatus('invalid')
          }
        }, 1000)
      }

      return { coupon, couponRef, onApply }
    },
    template: `
      <div class="w-[400px]">
        <DsCouponInput
          ref="couponRef"
          v-model="coupon"
          @apply="onApply"
        />
        <p class="mt-2 text-xs text-gray-400">Dica: use "DATASTONE10" para testar cupom válido</p>
      </div>
    `,
  }),
}
