<script setup lang="ts">
/**
 * DsMetricCard — card de métrica com ícone, skeleton e badge.
 * Réplica fiel do nexus MetricCard.vue.
 */
import type { KpiBadge } from '../types'

interface Props {
  icon: string
  title: string
  value: string | number
  tooltipText: string
  loading?: boolean
  badge?: KpiBadge
}

defineProps<Props>()
</script>

<template>
  <UCard class="flex-1 h-28 hover:shadow-md hover:-translate-y-0.5">
    <!-- Skeleton -->
    <div v-if="loading" class="flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <USkeleton class="w-9 h-9 rounded-md" />
          <USkeleton class="w-5 h-5 rounded-full" />
        </div>
        <USkeleton class="w-16 h-6 rounded-full" />
      </div>
      <div class="mt-2 ml-2">
        <USkeleton class="h-8 w-20 mb-2" />
        <USkeleton class="h-3 w-32" />
      </div>
    </div>

    <!-- Content -->
    <div v-else class="flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <div class="flex items-center justify-center w-9 h-9 rounded-md bg-blue-50">
            <UIcon :name="icon" class="w-5 h-5 text-blue-800" />
          </div>
          <UTooltip :text="tooltipText">
            <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </UTooltip>
        </div>

        <template v-if="badge?.text">
          <UBadge
            v-if="badge.color === 'red'"
            color="error"
            variant="solid"
            size="xs"
            class="font-bold uppercase tracking-wider px-3 py-1"
          >
            <span class="w-2 h-2 bg-white/60 rounded-full animate-pulse mr-1" />
            <span>{{ badge.text }}</span>
          </UBadge>
          <UBadge
            v-else
            :color="badge.color || 'green'"
            variant="soft"
            size="xs"
            class="font-bold uppercase tracking-wider px-3 py-1"
          >
            {{ badge.text }}
          </UBadge>
        </template>
      </div>

      <div class="mt-1 ml-2">
        <div class="text-2xl font-semibold text-gray-800 leading-tight">
          {{ value }}
        </div>
        <div class="text-[11px] font-normal text-gray-500 tracking-wider mt-1">
          {{ title }}
        </div>
      </div>

      <slot />
    </div>
  </UCard>
</template>
