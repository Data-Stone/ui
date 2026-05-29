<script setup lang="ts">
/**
 * DsInfoRow — linha compacta de info com tooltip.
 * Réplica fiel do nexus InfoRow.vue.
 */
interface Props {
  icon: string
  text?: string
  tooltip?: string
  italic?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-600 transition-colors">
    <UTooltip :text="tooltip">
      <UIcon :name="icon" class="h-3.5 w-3.5 flex-shrink-0" />
    </UTooltip>
    <span :class="{ italic: italic, truncate: true }">{{ text || '—' }}</span>
  </div>
</template>
