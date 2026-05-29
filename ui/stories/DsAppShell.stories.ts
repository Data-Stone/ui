import type { Meta, StoryObj } from '@storybook/vue3'
import DsAppShell from '../components/DsAppShell.vue'

const meta: Meta<typeof DsAppShell> = {
  title: 'Layout/DsAppShell',
  component: DsAppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Shell de layout com aside + main + header.',
      },
    },
  },
  argTypes: {
    asideWidth: { control: 'text' },
    density: {
      control: { type: 'select' },
      options: ['compact', 'comfortable'],
    },
    gradient: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DsAppShell>

export const Default: Story = {
  render: (args) => ({
    components: { DsAppShell },
    setup: () => ({ args }),
    template: `
      <DsAppShell v-bind="args" style="height: 600px;">
        <template #header>
          <div class="flex items-center justify-between px-6 py-3 bg-white">
            <span class="text-base font-bold text-gray-900">Data Stone</span>
            <nav class="flex items-center gap-6">
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Relatórios</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Configurações</a>
            </nav>
          </div>
        </template>

        <template #aside>
          <nav class="flex flex-col gap-1">
            <span class="text-xs font-mono uppercase tracking-wider text-gray-500 px-2 pb-2">Navegação</span>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 font-semibold">Visão geral</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Visitantes</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Empresas</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Eventos</a>
          </nav>
        </template>

        <template #main>
          <div class="flex flex-col gap-6">
            <h1 class="text-xl font-bold text-gray-900">Visão geral</h1>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg border border-gray-200 bg-white p-4">
                <p class="text-sm text-gray-500">Visitantes hoje</p>
                <p class="text-2xl font-semibold text-gray-800">1.247</p>
              </div>
              <div class="rounded-lg border border-gray-200 bg-white p-4">
                <p class="text-sm text-gray-500">Empresas identificadas</p>
                <p class="text-2xl font-semibold text-gray-800">342</p>
              </div>
            </div>
          </div>
        </template>
      </DsAppShell>
    `,
  }),
}

export const ComGradiente: Story = {
  name: 'Com gradiente',
  render: (args) => ({
    components: { DsAppShell },
    setup: () => ({ args }),
    template: `
      <DsAppShell v-bind="args" style="height: 600px;">
        <template #header>
          <div class="flex items-center justify-between px-6 py-3 bg-white">
            <span class="text-base font-bold text-gray-900">Data Stone</span>
            <nav class="flex items-center gap-6">
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Relatórios</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Configurações</a>
            </nav>
          </div>
        </template>

        <template #aside>
          <nav class="flex flex-col gap-1">
            <span class="text-xs font-mono uppercase tracking-wider text-gray-500 px-2 pb-2">Navegação</span>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 font-semibold">Visão geral</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Visitantes</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Empresas</a>
            <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">Eventos</a>
          </nav>
        </template>

        <template #main>
          <div class="flex flex-col gap-6">
            <h1 class="text-xl font-bold text-gray-900">Visão geral</h1>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg border border-gray-200 bg-white p-4">
                <p class="text-sm text-gray-500">Visitantes hoje</p>
                <p class="text-2xl font-semibold text-gray-800">1.247</p>
              </div>
              <div class="rounded-lg border border-gray-200 bg-white p-4">
                <p class="text-sm text-gray-500">Empresas identificadas</p>
                <p class="text-2xl font-semibold text-gray-800">342</p>
              </div>
            </div>
          </div>
        </template>
      </DsAppShell>
    `,
  }),
  args: {
    gradient: true,
  },
}
