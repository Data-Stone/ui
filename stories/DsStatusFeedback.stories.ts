import type { Meta, StoryObj } from '@storybook/vue3'
import DsStatusFeedback from '../components/DsStatusFeedback.vue'

const meta: Meta = {
  title: 'Fase 4/DsStatusFeedback',
  component: DsStatusFeedback as any,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'error', 'processing'] },
  },
}
export default meta

export const Sucesso: StoryObj = {
  render: () => ({
    components: { DsStatusFeedback },
    template: `
      <DsStatusFeedback
        status="success"
        status-text="Pagamento confirmado!"
        headline="Seu pedido foi processado"
        description="Você receberá um e-mail com os detalhes do seu pedido."
        primary-action="Acessar plataforma"
        secondary-action="Ver meu plano"
      />
    `,
  }),
}

export const Erro: StoryObj = {
  render: () => ({
    components: { DsStatusFeedback },
    template: `
      <DsStatusFeedback
        status="error"
        status-text="Falha no pagamento"
        headline="Não foi possível processar"
        description="Verifique os dados do cartão e tente novamente."
        primary-action="Fale conosco"
        secondary-action="Usar outra forma de pagamento"
      />
    `,
  }),
}

export const Processando: StoryObj = {
  render: () => ({
    components: { DsStatusFeedback },
    template: `
      <DsStatusFeedback
        status="processing"
        status-text="Processando pagamento"
        headline="Aguarde um momento"
        description="Estamos processando seu pagamento. Isso pode levar alguns instantes."
      />
    `,
  }),
}
