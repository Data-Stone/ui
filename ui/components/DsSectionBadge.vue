<script setup lang="ts">
/**
 * DsSectionBadge — badge de título de seção com linhas decorativas.
 * Baseado em billing-checkout SectionBadgeTitle.vue.
 */

interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="mx-auto w-max flex items-center gap-4">
    <!-- Linha decorativa esquerda -->
    <div class="flex items-center">
      <div class="w-14 h-0.5 bg-gradient-to-r from-transparent to-blue-200" />
      <div class="w-3 h-3 bg-blue-200 rounded-full" />
    </div>

    <!-- Badge central -->
    <span class="bg-blue-500/10 px-3 py-1 rounded-md">
      <p class="text-blue-600 text-lg font-medium">{{ title }}</p>
    </span>

    <!-- Linha decorativa direita -->
    <div class="flex flex-row-reverse items-center">
      <div class="w-14 h-0.5 bg-gradient-to-l from-transparent to-blue-200" />
      <div class="w-3 h-3 bg-blue-200 rounded-full" />
    </div>
  </div>
</template>
