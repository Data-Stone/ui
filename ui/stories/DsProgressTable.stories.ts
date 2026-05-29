import type { Meta, StoryObj } from '@storybook/vue3'
import DsProgressTable from '../components/DsProgressTable.vue'

const sampleData = [
  { name: 'Google Orgânico', visitors: 4520, sessions: 6230 },
  { name: 'Google Ads', visitors: 2180, sessions: 3100 },
  { name: 'Facebook', visitors: 1890, sessions: 2400 },
  { name: 'Instagram', visitors: 1340, sessions: 1800 },
  { name: 'LinkedIn', visitors: 920, sessions: 1200 },
  { name: 'Twitter/X', visitors: 450, sessions: 600 },
  { name: 'Direto', visitors: 3200, sessions: 4500 },
  { name: 'E-mail', visitors: 780, sessions: 1100 },
  { name: 'Referência', visitors: 560, sessions: 750 },
  { name: 'YouTube', visitors: 340, sessions: 480 },
  { name: 'TikTok', visitors: 210, sessions: 280 },
  { name: 'Bing', visitors: 180, sessions: 240 },
]

const columns = [
  { key: 'name', label: 'Fonte', sortable: true },
  { key: 'visitors', label: 'Visitantes', sortable: true, format: 'compact' as const },
  { key: 'sessions', label: 'Sessões', sortable: true, format: 'compact' as const },
]

const meta: Meta = {
  title: 'Fase 4/DsProgressTable',
  component: DsProgressTable as any,
  tags: ['autodocs'],
}
export default meta

export const Completa: StoryObj = {
  render: () => ({
    components: { DsProgressTable },
    setup: () => ({ sampleData, columns }),
    template: `<div class="w-[600px]"><DsProgressTable :data="sampleData" :columns="columns" label-key="name" value-key="visitors" :items-per-page="5" /></div>`,
  }),
}

export const Resumo: StoryObj = {
  name: 'Modo Resumo (top 5)',
  render: () => ({
    components: { DsProgressTable },
    setup: () => ({ sampleData, columns }),
    template: `<div class="w-[500px]"><DsProgressTable :data="sampleData" :columns="columns" label-key="name" value-key="visitors" :summary="true" /></div>`,
  }),
}
