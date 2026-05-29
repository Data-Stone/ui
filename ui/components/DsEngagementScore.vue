<script setup lang="ts">
/**
 * DsEngagementScore — badge de engajamento.
 * Réplica fiel do nexus EngagementScore.vue.
 */
interface Props {
  pages: number
  duration: string
}

defineProps<Props>()
</script>

<template>
  <UBadge color="primary" variant="soft" size="sm">
    <UIcon name="i-lucide-bar-chart-2" class="w-3 h-3" />
    {{ pages }} páginas · {{ duration }}
  </UBadge>
</template>
