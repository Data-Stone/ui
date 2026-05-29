<script setup lang="ts">
/**
 * DsEmptyState — estado vazio genérico. Baseado em nexus EmptyState.vue.
 */
interface Props {
  icon: string
  title: string
  description: string
  actionLabel?: string
}

defineProps<Props>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="text-center py-16 animate-fade-in">
    <UIcon :name="icon" class="w-12 h-12 mx-auto text-gray-300" />
    <h3 class="mt-3 text-lg font-semibold text-gray-900">{{ title }}</h3>
    <p class="mt-1 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">{{ description }}</p>
    <div v-if="actionLabel" class="mt-6">
      <UButton @click="emit('action')">{{ actionLabel }}</UButton>
    </div>
  </div>
</template>
