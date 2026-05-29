<script setup lang="ts">
/**
 * DsProgressTable — tabela com barras de progresso, busca e paginação.
 * Unifica 3 tabelas duplicadas do nexus-frontend
 * (MarketingPerformanceTable, WebsitePerformanceTable, UserTechnologyTable).
 */
import { ref, computed } from 'vue'

export interface ProgressColumn {
  key: string
  label: string
  sortable?: boolean
  format?: 'number' | 'time' | 'percent' | 'compact'
}

interface Props {
  data: Record<string, any>[]
  columns: ProgressColumn[]
  labelKey?: string
  valueKey?: string
  summary?: boolean
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'value',
  summary: false,
  itemsPerPage: 10,
})

const searchQuery = ref('')
const currentPage = ref(1)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' } | null>(null)

const filteredItems = computed(() => {
  let items = [...props.data]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    items = items.filter((item) =>
      String(item[props.labelKey] || '').toLowerCase().includes(q)
    )
  }

  if (sortBy.value) {
    const { key, order } = sortBy.value
    items.sort((a, b) => {
      const va = a[key] ?? 0
      const vb = b[key] ?? 0
      return order === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
    })
  }

  return items
})

const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / props.itemsPerPage)
)

const paginatedItems = computed(() => {
  if (props.summary) return filteredItems.value.slice(0, 5)
  const start = (currentPage.value - 1) * props.itemsPerPage
  return filteredItems.value.slice(start, start + props.itemsPerPage)
})

const maxValue = computed(() => {
  if (!props.data.length) return 1
  return Math.max(...props.data.map((item) => Number(item[props.valueKey]) || 0), 1)
})

function toggleSort(key: string) {
  if (sortBy.value?.key === key) {
    sortBy.value = sortBy.value.order === 'asc' ? { key, order: 'desc' } : null
  } else {
    sortBy.value = { key, order: 'asc' }
  }
}

function formatValue(value: any, format?: string): string {
  const num = Number(value) || 0
  switch (format) {
    case 'time': {
      const h = Math.floor(num / 3600)
      const m = Math.floor((num % 3600) / 60)
      const s = Math.floor(num % 60)
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }
    case 'percent':
      return `${num.toFixed(1)}%`
    case 'compact':
      if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
      if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
      return String(num)
    default:
      return num.toLocaleString('pt-BR')
  }
}

function getProgressPercent(item: Record<string, any>): number {
  return ((Number(item[props.valueKey]) || 0) / maxValue.value) * 100
}
</script>

<template>
  <div class="space-y-4">
    <!-- Busca e paginação -->
    <div v-if="!summary" class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="relative w-full sm:w-64">
        <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar..."
          class="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
      <div v-if="totalPages > 1" class="flex items-center gap-1">
        <UButton
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="currentPage <= 1"
          @click="currentPage--"
        >‹</UButton>
        <span class="text-xs text-gray-500 px-2">{{ currentPage }} / {{ totalPages }}</span>
        <UButton
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
        >›</UButton>
      </div>
    </div>

    <!-- Cabeçalho -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-2">
      <template v-for="(col, idx) in columns" :key="col.key">
        <button
          v-if="col.sortable && !summary"
          type="button"
          class="text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
          :class="idx === 0 ? 'flex-1 text-left' : 'w-24 text-right justify-end'"
          @click="toggleSort(col.key)"
        >
          {{ col.label }}
          <span v-if="sortBy?.key === col.key" class="text-blue-600">
            {{ sortBy.order === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
        <span
          v-else
          class="text-xs font-medium uppercase tracking-wider text-gray-500"
          :class="idx === 0 ? 'flex-1 text-left' : 'w-24 text-right'"
        >
          {{ col.label }}
        </span>
      </template>
    </div>

    <!-- Linhas -->
    <div class="space-y-1">
      <div
        v-for="(item, i) in paginatedItems"
        :key="i"
        class="flex items-center gap-3 py-2 hover:bg-gray-50/80 rounded-lg px-2 transition-colors duration-150"
      >
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-900 truncate">{{ item[labelKey] }}</p>
          <div class="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${getProgressPercent(item)}%` }"
            />
          </div>
        </div>
        <template v-for="(col, idx) in columns.slice(1)" :key="col.key">
          <span class="w-24 text-right text-sm font-medium text-gray-700 tabular-nums">
            {{ formatValue(item[col.key], col.format) }}
          </span>
        </template>
      </div>

      <p
        v-if="paginatedItems.length === 0"
        class="text-center text-sm text-gray-400 py-8"
      >
        Nenhum resultado encontrado.
      </p>
    </div>
  </div>
</template>
