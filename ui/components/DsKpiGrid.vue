<script setup lang="ts">
/**
 * DsKpiGrid — grid responsiva de DsKpiCard.
 */
import DsKpiCard from './DsKpiCard.vue'
import type { KpiItem } from '../types'

interface Props {
  items: KpiItem[]
  columns?: 2 | 3 | 4 | 5 | 6
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
  gap: 6,
})

const colsClass: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}
const gapClass: Record<number, string> = {
  2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 8: 'gap-8',
}
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2"
    :class="[colsClass[columns] || 'lg:grid-cols-4', gapClass[gap] || 'gap-6']"
  >
    <DsKpiCard
      v-for="(k, i) in items"
      :key="k.id ?? i"
      :title="k.title"
      :value="k.value"
      :icon="k.icon"
      :tooltip-text="k.tooltipText"
      :subtitle="k.subtitle"
      :loading="k.loading"
      :badge="k.badge"
      :trend="k.trend"
      :highlight="k.highlight"
      :live="k.live"
    />
  </div>
</template>
