import type { Meta, StoryObj } from '@storybook/vue3'
import DsSectionBadge from '../components/DsSectionBadge.vue'

const meta: Meta = {
  title: 'Fase 4/DsSectionBadge',
  component: DsSectionBadge as any,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
  args: { title: 'Funcionalidades' },
}
export default meta

export const Playground: StoryObj = {
  render: (args) => ({
    components: { DsSectionBadge },
    setup: () => ({ args }),
    template: `<DsSectionBadge v-bind="args" />`,
  }),
}

export const Exemplos: StoryObj = {
  render: () => ({
    components: { DsSectionBadge },
    template: `
      <div class="flex flex-col gap-6">
        <DsSectionBadge title="Funcionalidades" />
        <DsSectionBadge title="Planos" />
        <DsSectionBadge title="Depoimentos" />
      </div>
    `,
  }),
}
