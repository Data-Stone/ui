<script setup lang="ts">
/**
 * DsDetailItem — linha de detalhe com ícone + label + slot.
 * Réplica fiel do nexus DetailItem.vue.
 */
interface Props {
  icon: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-start gap-3 group">
    <UIcon :name="icon" class="h-4.5 w-4.5 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-gray-500 transition-colors" />
    <div class="flex-1 text-sm">
      <span class="font-medium text-gray-900">{{ label }} - </span>
      <span class="text-gray-500">
        <slot>—</slot>
      </span>
    </div>
  </div>
</template>
