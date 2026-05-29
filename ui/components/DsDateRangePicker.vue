<script setup lang="ts">
/**
 * DsDateRangePicker — seletor de período com presets pt-BR.
 * Baseado em nexus DateRangePicker.vue.
 */
import { ref, computed, watch } from 'vue'

export interface DateRange {
  start: string
  end: string
}

export interface DatePreset {
  key: string
  label: string
}

interface Props {
  presets?: DatePreset[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecione um período',
})

const range = defineModel<DateRange>({ required: true })
const showDropdown = ref(false)

const defaultPresets: DatePreset[] = [
  { key: 'today', label: 'Hoje' },
  { key: 'yesterday', label: 'Ontem' },
  { key: 'last-7-days', label: 'Últimos 7 dias' },
  { key: 'last-30-days', label: 'Últimos 30 dias' },
  { key: 'this-month', label: 'Este Mês' },
  { key: 'last-month', label: 'Mês Passado' },
  { key: 'last-90-days', label: 'Últimos 90 dias' },
]

const activePresets = computed(() => props.presets || defaultPresets)

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function displayLabel(): string {
  if (range.value?.start && range.value?.end) {
    const s = range.value.start.split('-').reverse().join('/')
    const e = range.value.end.split('-').reverse().join('/')
    return `${s} - ${e}`
  }
  return props.placeholder
}

function selectPreset(key: string) {
  const now = new Date()
  const today = formatDate(now)
  const dayMs = 86400000
  const yesterday = formatDate(new Date(now.getTime() - dayMs))

  switch (key) {
    case 'today':
      range.value = { start: today, end: today }
      break
    case 'yesterday':
      range.value = { start: yesterday, end: yesterday }
      break
    case 'last-7-days':
      range.value = { start: formatDate(new Date(now.getTime() - 6 * dayMs)), end: today }
      break
    case 'last-30-days':
      range.value = { start: formatDate(new Date(now.getTime() - 29 * dayMs)), end: today }
      break
    case 'last-90-days':
      range.value = { start: formatDate(new Date(now.getTime() - 89 * dayMs)), end: today }
      break
    case 'this-month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      range.value = { start: formatDate(start), end: formatDate(end) }
      break
    }
    case 'last-month': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      range.value = { start: formatDate(start), end: formatDate(end) }
      break
    }
  }
  showDropdown.value = false
}
</script>

<template>
  <div class="relative inline-block">
    <UButton
      color="neutral"
      variant="outline"
      class="w-[280px] justify-start"
      :class="range?.start ? '' : 'text-gray-500'"
      @click="showDropdown = !showDropdown"
    >
      <UIcon name="i-lucide-calendar" class="w-4 h-4 text-gray-400 flex-shrink-0" />
      <span>{{ displayLabel() }}</span>
    </UButton>

    <Transition name="ds-dropdown">
      <div
        v-if="showDropdown"
        class="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[280px]"
      >
        <div class="flex gap-3 mb-3">
          <div class="flex-1">
            <label class="text-[11px] text-gray-400 font-mono uppercase mb-1 block">De</label>
            <input
              type="date"
              :value="range?.start"
              class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @input="range = { ...range, start: ($event.target as HTMLInputElement).value }"
            />
          </div>
          <div class="flex-1">
            <label class="text-[11px] text-gray-400 font-mono uppercase mb-1 block">Até</label>
            <input
              type="date"
              :value="range?.end"
              class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @input="range = { ...range, end: ($event.target as HTMLInputElement).value }"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <button
            v-for="preset in activePresets"
            :key="preset.key"
            type="button"
            class="text-left px-3 py-1.5 text-xs rounded-lg hover:bg-gray-50 text-gray-700 transition-all duration-150"
            @click="selectPreset(preset.key)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </Transition>

    <div
      v-if="showDropdown"
      class="fixed inset-0 z-40"
      @click="showDropdown = false"
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
