import type { Meta, StoryObj } from '@storybook/vue3'
import DsAvatar from '../components/DsAvatar.vue'

const meta: Meta = {
  title: 'Fase 4/DsAvatar',
  component: DsAvatar as any,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    src: { control: 'text' },
    name: { control: 'text' },
    masked: { control: 'boolean' },
  },
  args: { size: 'md', name: 'João Silva' },
}
export default meta

export const Playground: StoryObj = {
  render: (args) => ({
    components: { DsAvatar },
    setup: () => ({ args }),
    template: `<DsAvatar v-bind="args" />`,
  }),
}

export const Tamanhos: StoryObj = {
  render: () => ({
    components: { DsAvatar },
    template: `
      <div class="flex items-end gap-4">
        <DsAvatar size="xs" name="XS" />
        <DsAvatar size="sm" name="SM" />
        <DsAvatar size="md" name="MD" />
        <DsAvatar size="lg" name="LG" />
        <DsAvatar size="xl" name="XL" />
      </div>
    `,
  }),
}

export const Iniciais: StoryObj = {
  render: () => ({
    components: { DsAvatar },
    template: `
      <div class="flex items-center gap-4">
        <DsAvatar name="João Silva" size="lg" />
        <DsAvatar name="Maria Santos" size="lg" />
        <DsAvatar name="Data Stone" size="lg" />
      </div>
    `,
  }),
}

export const SemNome: StoryObj = {
  name: 'Sem Nome (ícone fallback)',
  render: () => ({
    components: { DsAvatar },
    template: `
      <div class="flex items-center gap-4">
        <DsAvatar size="md" />
        <DsAvatar size="lg" />
        <DsAvatar size="xl" />
      </div>
    `,
  }),
}

export const Mascarado: StoryObj = {
  render: () => ({
    components: { DsAvatar },
    template: `
      <div class="flex items-center gap-4">
        <DsAvatar name="João Silva" size="lg" :masked="true" />
        <DsAvatar size="lg" :masked="true" />
      </div>
    `,
  }),
}
