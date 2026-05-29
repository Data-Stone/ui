import type { Meta, StoryObj } from '@storybook/vue3'
import DsFormStep from '../components/DsFormStep.vue'

const meta: Meta<typeof DsFormStep> = {
  title: 'Form/DsFormStep',
  component: DsFormStep,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Wrapper de step de formulário com header e botões de navegação.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título do step' },
    description: { control: 'text', description: 'Descrição exibida abaixo do título' },
    currentStep: { control: 'number', description: 'Número do step atual' },
    totalSteps: { control: 'number', description: 'Total de steps no formulário' },
    loading: { control: 'boolean', description: 'Exibe spinner no botão de avançar' },
    showBack: { control: 'boolean', description: 'Exibe o botão Voltar' },
    showNext: { control: 'boolean', description: 'Exibe o botão Continuar' },
    nextLabel: { control: 'text', description: 'Label do botão de avançar' },
    backLabel: { control: 'text', description: 'Label do botão de voltar' },
  },
}

export default meta
type Story = StoryObj<typeof DsFormStep>

export const Default: Story = {
  render: (args) => ({
    components: { DsFormStep },
    setup: () => ({ args }),
    template: `
      <div class="max-w-lg">
        <DsFormStep
          v-bind="args"
          title="Dados pessoais"
          description="Preencha suas informações"
          :current-step="1"
          :total-steps="4"
        >
          <div class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Nome completo</label>
              <input placeholder="Digite seu nome" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Email</label>
              <input placeholder="Digite seu email" type="email" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-gray-900">Telefone</label>
              <input placeholder="(00) 00000-0000" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400" />
            </div>
          </div>
        </DsFormStep>
      </div>
    `,
  }),
}

export const PrimeiroStep: Story = {
  name: 'Primeiro step (sem voltar)',
  args: {
    title: 'Bem-vindo!',
    description: 'Vamos começar o cadastro.',
    showBack: false,
    currentStep: 1,
    totalSteps: 4,
  },
}
