<script setup lang="ts">
/**
 * DsSkeletonRow — skeleton genérico de linha.
 * Réplica fiel do nexus VisitorRowSkeleton.vue.
 */
interface Props {
  avatar?: boolean
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  avatar: true,
  columns: 2,
})
</script>

<template>
  <div class="flex items-center gap-4 p-4">
    <USkeleton v-if="avatar" class="h-14 w-14 rounded-full" />
    <div class="flex-1 grid gap-x-6" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="col in columns" :key="col" class="space-y-3">
        <USkeleton class="h-4" :class="col === 1 ? 'w-3/4' : 'w-full'" />
        <USkeleton class="h-3 w-1/2" />
        <USkeleton class="h-3" :class="col === 1 ? 'w-2/3' : 'w-3/4'" />
      </div>
    </div>
  </div>
</template>
