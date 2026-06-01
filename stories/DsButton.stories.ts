import type { Meta, StoryObj } from '@storybook/vue3'
import { UButton } from '../.storybook/nuxt-ui-stubs'

const meta: Meta = {
  title: 'Primitivos/DsButton',
  component: UButton as any,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'info', 'neutral', 'red'],
      description: 'Cor do botão',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Variante visual',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de loading',
    },
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
  },
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Botão',
  },
}

export default meta

// ── Playground ────────────────────────────────────────

export const Playground: StoryObj = {
  render: (args) => ({
    components: { UButton },
    setup: () => ({ args }),
    template: `<UButton :color="args.color" :variant="args.variant" :size="args.size" :disabled="args.disabled" :loading="args.loading">{{ args.label }}</UButton>`,
  }),
}

// ── Cores ─────────────────────────────────────────────

export const Cores: StoryObj = {
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <UButton color="primary">Primary</UButton>
        <UButton color="info">Info</UButton>
        <UButton color="neutral">Neutral</UButton>
        <UButton color="red">Danger</UButton>
      </div>
    `,
  }),
}

// ── Variantes ─────────────────────────────────────────

export const Variantes: StoryObj = {
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Solid</p>
          <div class="flex flex-wrap items-center gap-3">
            <UButton color="primary" variant="solid">Primary</UButton>
            <UButton color="info" variant="solid">Info</UButton>
            <UButton color="neutral" variant="solid">Neutral</UButton>
            <UButton color="red" variant="solid">Danger</UButton>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Outline</p>
          <div class="flex flex-wrap items-center gap-3">
            <UButton color="primary" variant="outline">Primary</UButton>
            <UButton color="info" variant="outline">Info</UButton>
            <UButton color="neutral" variant="outline">Neutral</UButton>
            <UButton color="red" variant="outline">Danger</UButton>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Ghost</p>
          <div class="flex flex-wrap items-center gap-3">
            <UButton color="primary" variant="ghost">Primary</UButton>
            <UButton color="info" variant="ghost">Info</UButton>
            <UButton color="neutral" variant="ghost">Neutral</UButton>
            <UButton color="red" variant="ghost">Danger</UButton>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Link</p>
          <div class="flex flex-wrap items-center gap-3">
            <UButton color="primary" variant="link">Primary</UButton>
            <UButton color="info" variant="link">Info</UButton>
            <UButton color="neutral" variant="link">Neutral</UButton>
            <UButton color="red" variant="link">Danger</UButton>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Tamanhos ──────────────────────────────────────────

export const Tamanhos: StoryObj = {
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-wrap items-end gap-3">
        <UButton size="xs">Extra Small</UButton>
        <UButton size="sm">Small</UButton>
        <UButton size="md">Medium</UButton>
        <UButton size="lg">Large</UButton>
      </div>
    `,
  }),
}

// ── Com Ícone ─────────────────────────────────────────

export const ComIcone: StoryObj = {
  name: 'Com Ícone',
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <UButton color="primary"><span class="mr-1">+</span> Adicionar</UButton>
        <UButton color="neutral" variant="outline"><span class="mr-1">⌕</span> Buscar</UButton>
        <UButton color="red" variant="ghost"><span class="mr-1">✕</span> Remover</UButton>
        <UButton color="primary" variant="ghost" size="sm"><span>←</span></UButton>
        <UButton color="primary" variant="ghost" size="sm"><span>→</span></UButton>
      </div>
    `,
  }),
}

// ── Estados ───────────────────────────────────────────

export const Estados: StoryObj = {
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Normal</p>
          <UButton>Salvar</UButton>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Disabled</p>
          <UButton :disabled="true">Salvar</UButton>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Loading</p>
          <UButton :loading="true">
            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
            Salvando...
          </UButton>
        </div>
      </div>
    `,
  }),
}

// ── Grupo de Ações ────────────────────────────────────

export const GrupoDeAcoes: StoryObj = {
  name: 'Grupo de Ações',
  render: () => ({
    components: { UButton },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Formulário</p>
          <div class="flex items-center gap-3">
            <UButton color="neutral" variant="outline">Cancelar</UButton>
            <UButton color="primary" variant="solid">Salvar</UButton>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Confirmação destrutiva</p>
          <div class="flex items-center gap-3">
            <UButton color="neutral" variant="ghost">Cancelar</UButton>
            <UButton color="red" variant="solid">Excluir</UButton>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">Wizard / Steps</p>
          <div class="flex items-center gap-3">
            <UButton color="neutral" variant="outline">← Voltar</UButton>
            <UButton color="primary" variant="solid">Continuar →</UButton>
          </div>
        </div>
      </div>
    `,
  }),
}
