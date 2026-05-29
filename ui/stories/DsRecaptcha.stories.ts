import type { Meta, StoryObj } from '@storybook/vue3'
import DsRecaptcha from '../components/DsRecaptcha.vue'

const meta: Meta = {
  title: 'Fase 4/DsRecaptcha',
  component: DsRecaptcha as any,
  tags: ['autodocs'],
}
export default meta

export const Preview: StoryObj = {
  render: () => ({
    components: { DsRecaptcha },
    template: `
      <div class="flex flex-col gap-4">
        <p class="text-sm text-gray-500">O reCAPTCHA requer uma siteKey válida e o script do Google para funcionar.</p>
        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 border-2 border-gray-300 rounded" />
            <span class="text-sm text-gray-600">Não sou um robô</span>
            <div class="ml-auto flex flex-col items-center gap-1">
              <span class="text-[10px] text-gray-400">reCAPTCHA</span>
              <span class="text-[8px] text-gray-400">Privacy - Terms</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-gray-400">Componente mockado — em produção renderiza o widget real do Google.</p>
      </div>
    `,
  }),
}
