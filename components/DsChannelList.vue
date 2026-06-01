<script setup lang="ts">
/**
 * DsChannelList — lista de canais/filas/segmentos com status e contador.
 */
import type { Channel, ChannelStatus } from '../types'

interface Props {
  channels: Channel[]
  title?: string
  hideCount?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
})

const active = defineModel<string | null>({ default: null })

const emit = defineEmits<{
  select: [channel: Channel]
}>()

defineSlots<{
  item(props: { channel: Channel; active: boolean }): any
}>()

function pick(c: Channel) {
  if (c.disabled) return
  active.value = c.id
  emit('select', c)
}

const statusColor: Record<ChannelStatus, string> = {
  online: 'bg-green-500',
  busy:   'bg-amber-500',
  idle:   'bg-gray-400',
  error:  'bg-red-500',
}
</script>

<template>
  <div class="flex flex-col gap-0.5" role="listbox" :aria-label="title || 'Canais'">
    <div
      v-if="title"
      class="text-[11px] font-mono uppercase tracking-wider text-gray-400 px-2 pt-1 pb-2"
    >
      {{ title }}
    </div>

    <button
      v-for="c in channels"
      :key="c.id"
      type="button"
      role="option"
      :aria-selected="active === c.id"
      :disabled="c.disabled"
      class="flex items-center gap-2.5 rounded-lg text-left transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed active:scale-[0.98]"
      :class="[
        compact ? 'px-2 py-1.5 text-xs' : 'px-2.5 py-2 text-sm',
        active === c.id
          ? 'bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-200'
          : 'text-gray-700 hover:bg-gray-50',
      ]"
      @click="pick(c)"
    >
      <slot name="item" :channel="c" :active="active === c.id">
        <span
          :class="['w-2 h-2 rounded-full flex-shrink-0', statusColor[c.status || 'online']]"
          aria-hidden="true"
        />
        <UIcon v-if="c.icon && c.icon.startsWith('i-')" :name="c.icon" class="w-4 h-4" />
        <span v-else-if="c.icon" v-html="c.icon" />
        <span class="flex-1">{{ c.name }}</span>
        <span
          v-if="!hideCount && c.count !== undefined"
          class="font-mono text-xs px-2 py-0.5 rounded-full min-w-[24px] text-center"
          :class="active === c.id
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'"
        >
          {{ c.count }}
        </span>
      </slot>
    </button>
  </div>
</template>
