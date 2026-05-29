<script setup lang="ts">
/**
 * DsBaseTemplate — template de página de lista.
 * Baseado em billing BaseTemplate.vue.
 */
interface Props {
  title: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <UIcon v-if="icon" :name="icon" class="w-7 h-7 text-gray-500" />
        <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <slot name="actions" />
      </div>
    </div>

    <hr class="border-gray-100" />

    <slot name="filters" />

    <div v-if="$slots.table" class="border border-gray-200 rounded-xl bg-white">
      <slot name="tabs" />
      <slot name="table" />
    </div>

    <slot />
  </div>
</template>
