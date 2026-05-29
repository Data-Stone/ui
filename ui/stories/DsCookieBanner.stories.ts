import type { Meta, StoryObj } from '@storybook/vue3'
import DsCookieBanner from '../components/DsCookieBanner.vue'
import { ref } from 'vue'

const meta: Meta<typeof DsCookieBanner> = {
  title: 'Feedback/DsCookieBanner',
  component: DsCookieBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Banner LGPD para consentimento de cookies.',
      },
    },
  },
  argTypes: {
    policyUrl: { control: 'text', description: 'URL da política de cookies' },
  },
}

export default meta
type Story = StoryObj<typeof DsCookieBanner>

export const Default: Story = {
  render: (args) => ({
    components: { DsCookieBanner },
    setup() {
      const show = ref(true)
      return { args, show }
    },
    template: `
      <div class="h-96 flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <p class="text-sm text-gray-500 mb-3">Banner visível: {{ show }}</p>
          <button
            v-if="!show"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            @click="show = true"
          >
            Mostrar novamente
          </button>
        </div>
        <DsCookieBanner v-model="show" />
      </div>
    `,
  }),
}
