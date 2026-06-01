import type { Meta, StoryObj } from '@storybook/vue3'
import DsSecurityBadge from '../components/DsSecurityBadge.vue'

const meta: Meta = {
  title: 'Fase 4/DsSecurityBadge',
  component: DsSecurityBadge as any,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}
export default meta

export const Padrao: StoryObj = {
  render: () => ({
    components: { DsSecurityBadge },
    template: `<DsSecurityBadge />`,
  }),
}

export const Customizado: StoryObj = {
  render: () => ({
    components: { DsSecurityBadge },
    template: `
      <DsSecurityBadge
        title="Dados protegidos"
        description="Seus dados são armazenados com criptografia AES-256."
      />
    `,
  }),
}
