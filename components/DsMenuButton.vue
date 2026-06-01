<script setup lang="ts">
/**
 * DsMenuButton — botão 3-dots com dropdown de ações.
 * Baseado em billing MenuButton.
 */
import { ref } from 'vue'

export interface MenuItem {
  label: string
  icon?: string
  disabled?: boolean
  danger?: boolean
  /** Separador visual antes deste item */
  separator?: boolean
  /** Submenu items */
  children?: MenuItem[]
}

interface Props {
  items: MenuItem[]
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  select: [item: MenuItem, index: number]
}>()

const open = ref(false)

function select(item: MenuItem, index: number) {
  if (item.disabled) return
  emit('select', item, index)
  open.value = false
}
</script>

<template>
  <div class="relative inline-block">
    <UButton
      color="neutral"
      variant="ghost"
      size="sm"
      :disabled="disabled || loading"
      title="Ações"
      @click="open = !open"
    >
      <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5" />
    </UButton>

    <Transition name="ds-menu">
      <div
        v-if="open"
        class="absolute right-0 top-full mt-1 z-50 min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg py-1"
      >
        <template v-for="(item, i) in items" :key="i">
          <div v-if="item.separator" class="border-t border-gray-100 my-1" />
          <button
            type="button"
            :disabled="item.disabled"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
              item.danger
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="select(item, i)"
          >
            <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4 flex-shrink-0" />
            {{ item.label }}
            <span v-if="item.children?.length" class="ml-auto text-gray-400 text-xs">›</span>
          </button>
        </template>
      </div>
    </Transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
  </div>
</template>

<style scoped>
.ds-menu-enter-active,
.ds-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.ds-menu-enter-from,
.ds-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}
</style>
