import type { Meta, StoryObj } from '@storybook/vue3'
import DsSection from '../components/DsSection.vue'

const meta: Meta = {
  title: 'Fase 4/DsSection',
  component: DsSection as any,
  tags: ['autodocs'],
}
export default meta

export const Completa: StoryObj = {
  render: () => ({
    components: { DsSection },
    template: `
      <DsSection
        title="Funcionalidades"
        headline="Tudo que você precisa em um só lugar"
        description="Conheça as principais features da plataforma Data Stone."
      >
        <div class="p-8 text-center text-gray-400">Conteúdo da seção aqui...</div>
      </DsSection>
    `,
  }),
}

export const SemBackground: StoryObj = {
  name: 'Sem Background',
  render: () => ({
    components: { DsSection },
    template: `
      <DsSection
        title="Planos"
        headline="Escolha o melhor plano"
        :no-background="true"
      >
        <div class="p-8 text-center text-gray-400">Cards de planos aqui...</div>
      </DsSection>
    `,
  }),
}
