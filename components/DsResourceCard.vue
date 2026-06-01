<script setup lang="ts">
/**
 * DsResourceCard — card com ícone + título + descrição.
 * Réplica fiel do checkout ResourceCard.vue.
 */
interface Props {
  title: string
  description: string
  icon?: string
  image?: { src: string; alt?: string }
}

defineProps<Props>()
</script>

<template>
  <div class="w-full p-6 flex flex-col gap-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <img
      v-if="image?.src"
      :src="image.src"
      :alt="image.alt || title"
      class="w-8 h-8 object-contain"
    />
    <UIcon v-else-if="icon" :name="icon" class="w-8 h-8 text-blue-500" />

    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-medium text-blue-800">{{ title }}</h3>
      <p class="text-xl text-gray-800">{{ description }}</p>
    </div>

    <slot />
  </div>
</template>
