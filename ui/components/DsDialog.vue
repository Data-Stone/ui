<script setup lang="ts">
/**
 * DsDialog — dialog base com slots.
 * Baseado em billing Dialog.vue + nexus modal patterns.
 */
interface Props {
  title: string
  icon?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '500px',
})

const open = defineModel<boolean>({ default: false })
</script>

<template>
  <Teleport to="body">
    <Transition name="ds-dialog">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div class="absolute inset-0 bg-gray-900/70" @click="open = false" />
        <div
          class="relative bg-white border border-gray-200 rounded-xl shadow-2xl mx-4 w-full animate-scale-in"
          :style="{ maxWidth }"
        >
          <!-- Header -->
          <div class="flex items-center gap-2 px-5 py-4">
            <UIcon v-if="icon" :name="icon" class="w-5 h-5 text-blue-600 flex-shrink-0" />
            <h3 class="text-lg font-semibold text-gray-900 flex-1">{{ title }}</h3>
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Fechar"
              @click="open = false"
            >
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
            </UButton>
          </div>

          <hr class="border-gray-100" />

          <!-- Content -->
          <div class="px-5 py-4">
            <slot name="content" />
            <slot />
          </div>

          <!-- Footer -->
          <template v-if="$slots.footer">
            <hr class="border-gray-100" />
            <div class="flex items-center justify-end gap-3 px-5 py-3">
              <slot name="footer" />
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-dialog-enter-active,
.ds-dialog-leave-active {
  transition: opacity 0.2s ease;
}
.ds-dialog-enter-from,
.ds-dialog-leave-to {
  opacity: 0;
}
</style>
