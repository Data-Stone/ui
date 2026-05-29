<script setup lang="ts">
/**
 * DsSection — seção de página com badge, headline e fundo decorativo.
 * Baseado em billing-checkout CustomSection.vue.
 */

interface Props {
  title?: string
  headline: string
  description?: string
  noBackground?: boolean
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  noBackground: false,
  fullWidth: false,
})
</script>

<template>
  <section>
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 pb-14 pt-24 lg:pt-14">
      <div class="flex flex-col gap-6">
        <DsSectionBadge v-if="title" :title="title" />
        <div class="flex flex-col gap-2 items-center">
          <slot name="headline">
            <h1 class="text-3xl font-medium text-gray-900 text-center md:text-4xl">
              {{ headline }}
            </h1>
          </slot>
          <h4 v-if="description" class="text-xl font-normal text-center text-gray-400 mx-auto max-w-xl">
            {{ description }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Corpo -->
    <div class="mb-0 lg:mb-12" :class="{ 'ds-section-bg': !noBackground }">
      <div
        class="divide-y divide-gray-100 bg-white"
        :class="[
          !noBackground ? 'border border-gray-100' : '',
          !fullWidth ? 'max-w-7xl mx-auto px-4' : '',
        ]"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ds-section-bg {
  background-image: repeating-linear-gradient(
    -45deg,
    rgb(243 244 246) 0px,
    rgb(243 244 246) 2px,
    transparent 2px,
    transparent 10px
  );
}
</style>
