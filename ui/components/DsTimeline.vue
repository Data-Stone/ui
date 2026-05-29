<script setup lang="ts">
/**
 * DsTimeline — feed cronológico de eventos com severity tags.
 */
import type { TimelineEvent, TimelineSeverity } from '../types'

interface Props {
  events: TimelineEvent[]
  live?: boolean
  title?: string
  maxItems?: number
  flat?: boolean
  loading?: boolean
}

const props = defineProps<Props>()

defineSlots<{
  item(props: { event: TimelineEvent }): any
  header(): any
}>()

const sevClass: Record<TimelineSeverity, string> = {
  neutral: 'bg-gray-100 text-gray-600',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  error:   'bg-red-50 text-red-700',
  info:    'bg-blue-50 text-blue-700',
  brand:   'bg-blue-50 text-blue-700',
}

function listStyle() {
  return props.maxItems
    ? { maxHeight: `${props.maxItems * 44}px`, overflowY: 'auto' as const }
    : undefined
}
</script>

<template>
  <component :is="flat ? 'div' : 'UCard'">
    <div
      v-if="title || live || $slots.header"
      class="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-200"
    >
      <span v-if="title" class="font-semibold text-gray-900">{{ title }}</span>
      <slot name="header" />
      <span
        v-if="live"
        class="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Ao vivo
      </span>
    </div>

    <!-- Skeleton loading -->
    <div v-if="loading" class="flex flex-col">
      <div
        v-for="n in (maxItems || 5)"
        :key="n"
        class="grid items-center gap-3 px-5 py-2.5 border-b border-gray-100 last:border-0"
        :style="{ gridTemplateColumns: '80px 1fr auto' }"
      >
        <USkeleton class="h-3 w-14" />
        <USkeleton class="h-3 w-full max-w-[240px]" />
        <USkeleton class="h-5 w-16 rounded-full" />
      </div>
    </div>

    <!-- Content -->
    <div v-else :style="listStyle()" class="flex flex-col ds-scrollbar">
      <div
        v-for="ev in events"
        :key="ev.id"
        class="grid items-center gap-3 px-5 py-2.5 border-b border-gray-100 last:border-0 text-sm text-gray-900 hover:bg-gray-50/80 transition-colors duration-150"
        :style="{ gridTemplateColumns: '80px 1fr auto' }"
      >
        <slot name="item" :event="ev">
          <span class="font-mono text-xs text-gray-400">{{ ev.time }}</span>
          <span class="leading-relaxed" v-html="ev.text" />
          <span
            v-if="ev.category"
            :class="[
              'text-[11px] font-mono uppercase tracking-wide font-semibold px-2.5 py-0.5 rounded-full',
              sevClass[ev.severity || 'neutral'],
            ]"
          >
            {{ ev.category }}
          </span>
        </slot>
      </div>
    </div>
  </component>
</template>
