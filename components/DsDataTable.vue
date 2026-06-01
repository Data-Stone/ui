<script setup lang="ts" generic="T extends Record<string, any>">
/**
 * DsDataTable — tabela com busca, ordenação e paginação.
 * Baseado em billing DataTableServer.vue + nexus table patterns.
 */
import { ref, computed, watch } from 'vue'

export interface TableHeader {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
}

interface Props {
  headers: TableHeader[]
  items: T[]
  loading?: boolean
  itemsLength?: number
  itemsPerPage?: number
  searchable?: boolean
  searchPlaceholder?: string
  noDataText?: string
  /** Modo server-side: emite eventos ao invés de paginar localmente */
  serverSide?: boolean
  /** Mostrar seletor de itens por página */
  showPerPage?: boolean
  /** Opções de itens por página */
  perPageOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  searchable: false,
  searchPlaceholder: 'Buscar...',
  noDataText: 'Nenhum resultado encontrado',
  serverSide: false,
  showPerPage: false,
  perPageOptions: () => [10, 25, 50, 100],
})

const emit = defineEmits<{
  'update:options': [options: { page: number; itemsPerPage: number; sortBy?: string; sortDir?: 'asc' | 'desc'; search?: string }]
  'row-click': [item: T]
  'update:itemsPerPage': [value: number]
}>()

const search = ref('')
const currentPage = ref(1)
const sortBy = ref<string | null>(null)
const sortDir = ref<'asc' | 'desc'>('asc')
const internalPerPage = ref(props.itemsPerPage)

function changePerPage(value: number) {
  internalPerPage.value = value
  currentPage.value = 1
  emit('update:itemsPerPage', value)
  emitOptions()
}

const totalItems = computed(() => props.itemsLength ?? props.items.length)
const effectivePerPage = computed(() => internalPerPage.value)
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / effectivePerPage.value)))

function toggleSort(key: string) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDir.value = 'asc'
  }
  emitOptions()
}

function goToPage(page: number) {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  emitOptions()
}

function emitOptions() {
  emit('update:options', {
    page: currentPage.value,
    itemsPerPage: effectivePerPage.value,
    sortBy: sortBy.value ?? undefined,
    sortDir: sortDir.value,
    search: search.value || undefined,
  })
}

function getNestedValue(item: Record<string, any>, key: string): any {
  return key.split('.').reduce((acc, part) => acc?.[part], item)
}

const alignClass: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const displayItems = computed(() => {
  if (props.serverSide || props.itemsLength !== undefined) return props.items
  const start = (currentPage.value - 1) * effectivePerPage.value
  return props.items.slice(start, start + effectivePerPage.value)
})

watch(search, () => {
  currentPage.value = 1
  emitOptions()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="searchable || showPerPage" class="flex items-center justify-between gap-3">
      <div v-if="searchable" class="relative flex-1 max-w-sm">
        <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="search"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
      <div v-if="showPerPage" class="flex items-center gap-2 text-sm text-gray-500">
        <span>Exibir</span>
        <select
          :value="effectivePerPage"
          class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          @change="changePerPage(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <span>por página</span>
      </div>
    </div>

    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/80">
              <th
                v-for="h in headers"
                :key="h.key"
                :class="[
                  'px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider',
                  alignClass[h.align || 'left'],
                  h.sortable ? 'cursor-pointer select-none hover:text-gray-900 transition-colors' : '',
                ]"
                :style="h.width ? { width: h.width } : undefined"
                @click="h.sortable && toggleSort(h.key)"
              >
                <span class="inline-flex items-center gap-1">
                  {{ h.label }}
                  <span v-if="h.sortable && sortBy === h.key" class="text-blue-600">
                    {{ sortDir === 'asc' ? '▲' : '▼' }}
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in itemsPerPage" :key="n" class="border-b border-gray-100 last:border-0">
                <td v-for="h in headers" :key="h.key" class="px-4 py-3">
                  <div class="h-4 rounded bg-gray-100 animate-pulse" />
                </td>
              </tr>
            </template>
            <template v-else-if="displayItems.length === 0">
              <tr>
                <td :colspan="headers.length" class="px-4 py-12 text-center text-gray-400">
                  {{ noDataText }}
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(item, i) in displayItems"
                :key="i"
                class="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer"
                @click="emit('row-click', item)"
              >
                <td
                  v-for="h in headers"
                  :key="h.key"
                  :class="['px-4 py-3 text-gray-900', alignClass[h.align || 'left']]"
                >
                  <slot :name="`item.${h.key}`" :item="item">
                    {{ getNestedValue(item, h.key) ?? '—' }}
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/80 text-sm text-gray-500"
      >
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <div class="flex items-center gap-1">
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
          >
            Anterior
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Próxima
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
