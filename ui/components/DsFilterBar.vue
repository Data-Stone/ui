<script setup lang="ts">
/**
 * DsFilterBar — painel colapsável de filtros.
 * Baseado em billing FilterBarTemplate.vue.
 */
import { ref, watch } from 'vue'

interface Props {
  title?: string
  defaultOpen?: boolean
  /** Contagem de filtros ativos (exibe badge) */
  activeCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Filtros',
  defaultOpen: false,
  activeCount: 0,
})

const open = defineModel<boolean>('open', { default: undefined })
const internalOpen = ref(props.defaultOpen)

// Sync: se v-model:open for usado, ele prevalece
const isOpen = ref(open.value ?? internalOpen.value)

watch(open, (v) => { if (v !== undefined) isOpen.value = v })
watch(isOpen, (v) => { open.value = v; internalOpen.value = v })

function toggle() {
  isOpen.value = !isOpen.value
}

const emit = defineEmits<{
  clear: []
}>()

defineExpose({ isOpen, toggle })
</script>

<template>
  <div class="border border-gray-200 rounded-xl bg-white">
    <UButton
      color="neutral"
      variant="ghost"
      class="w-full justify-start gap-2 !rounded-xl !px-4 !py-3 !text-gray-900 !font-semibold"
      @click="toggle"
    >
      <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-blue-600" />
      {{ title }}
      <UBadge v-if="activeCount > 0" color="primary" variant="solid" size="xs" class="ml-1">
        {{ activeCount }}
      </UBadge>
      <span
        class="ml-auto text-gray-400 transition-transform duration-300"
        :class="isOpen ? 'rotate-180' : ''"
      >
        ▾
      </span>
    </UButton>

    <Transition name="ds-filter">
      <div v-if="isOpen" class="px-4 pb-4 border-t border-gray-100 pt-4">
        <slot />
        <div v-if="activeCount > 0" class="mt-3 pt-3 border-t border-gray-100 flex justify-end">
          <UButton color="neutral" variant="ghost" size="xs" @click="emit('clear')">
            Limpar filtros
          </UButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ds-filter-enter-active,
.ds-filter-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.ds-filter-enter-from,
.ds-filter-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
