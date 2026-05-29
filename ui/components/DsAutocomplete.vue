<script setup lang="ts">
/**
 * DsAutocomplete — input com busca assíncrona e debounce.
 * Baseado em billing-frontend BaseAutocomplete.vue.
 */
import { ref, watch } from 'vue'

interface Props {
  placeholder?: string
  noDataText?: string
  labelKey?: string
  debounceTime?: number
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pesquisar...',
  noDataText: 'Nenhum item encontrado',
  labelKey: 'label',
  debounceTime: 300,
  loading: false,
  disabled: false,
})

const modelValue = defineModel<any>({ default: null })
const searchQuery = ref('')
const items = defineModel<any[]>('items', { default: () => [] })
const isOpen = ref(false)
const internalLoading = ref(false)

const emit = defineEmits<{
  search: [term: string]
  select: [item: any]
}>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(value: string) {
  searchQuery.value = value

  if (debounceTimer) clearTimeout(debounceTimer)

  if (!value) {
    isOpen.value = false
    return
  }

  internalLoading.value = true
  debounceTimer = setTimeout(() => {
    emit('search', value)
    isOpen.value = true
    internalLoading.value = false
  }, props.debounceTime)
}

function selectItem(item: any) {
  modelValue.value = item
  searchQuery.value = typeof item === 'string' ? item : (item[props.labelKey] || '')
  isOpen.value = false
  emit('select', item)
}

function clearSelection() {
  modelValue.value = null
  searchQuery.value = ''
  isOpen.value = false
}

function getLabel(item: any): string {
  if (typeof item === 'string') return item
  return item[props.labelKey] || String(item)
}

defineExpose({ searchQuery, isOpen, clearSelection })
</script>

<template>
  <div class="relative">
    <div class="relative">
      <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        :value="searchQuery"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        @input="onInput(($event.target as HTMLInputElement).value)"
        @focus="searchQuery && items.length ? (isOpen = true) : undefined"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        @click="clearSelection"
      >
        <span class="text-sm">✕</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="(loading || internalLoading) && searchQuery" class="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
      <p class="text-sm text-gray-400 animate-pulse">Carregando...</p>
    </div>

    <!-- Dropdown -->
    <Transition name="ds-dropdown">
      <div
        v-if="isOpen && !loading && !internalLoading && items.length > 0"
        class="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
      >
        <button
          v-for="(item, i) in items"
          :key="i"
          type="button"
          class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          :class="i === 0 ? 'rounded-t-xl' : i === items.length - 1 ? 'rounded-b-xl' : ''"
          @click="selectItem(item)"
        >
          <slot name="item" :item="item">
            {{ getLabel(item) }}
          </slot>
        </button>
      </div>
    </Transition>

    <!-- Sem resultados -->
    <div
      v-if="isOpen && !loading && !internalLoading && items.length === 0 && searchQuery"
      class="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3"
    >
      <p class="text-sm text-gray-400">{{ noDataText }}</p>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    />
  </div>
</template>

<style scoped>
.ds-dropdown-enter-active,
.ds-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.ds-dropdown-enter-from,
.ds-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}
</style>
