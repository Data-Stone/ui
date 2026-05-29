<script setup lang="ts">
/**
 * DsFormCollapsible — step de formulário colapsável com indicador numérico.
 * Baseado em billing-checkout FormCollapsible.vue.
 */
import { computed } from 'vue'

interface Props {
  open: boolean
  label: string
  description?: string
  step?: number
  completed?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  completed: false,
})

const emit = defineEmits<{
  toggle: []
  submit: []
}>()

const leadingClass = computed(() => {
  if (props.completed) return 'bg-green-500 text-white'
  if (props.disabled) return 'bg-gray-200 text-gray-400'
  if (props.open) return 'bg-blue-600 text-white'
  return 'bg-gray-100 text-gray-600'
})

const labelClass = computed(() => {
  if (props.completed) return 'text-gray-500'
  if (props.disabled) return 'text-gray-400'
  return 'text-gray-900'
})
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <!-- Header clicável -->
    <div
      class="flex items-center justify-between py-6 cursor-pointer"
      :class="{ 'cursor-not-allowed opacity-60': disabled }"
      @click="!disabled && emit('toggle')"
    >
      <div class="flex items-center gap-4">
        <!-- Círculo numerado -->
        <slot name="leading">
          <div
            v-if="step"
            class="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-200"
            :class="leadingClass"
          >
            <UIcon v-if="completed" name="i-lucide-check" class="w-4 h-4" />
            <span v-else>{{ step }}</span>
          </div>
        </slot>

        <div class="flex flex-col">
          <h3 class="text-xl font-semibold" :class="labelClass">
            {{ label }}
          </h3>
          <p v-if="description" class="text-base text-gray-500 mt-0.5">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Link "Editar" se completo -->
      <p v-if="completed && !open" class="text-sm text-blue-600 font-medium">
        Editar
      </p>
    </div>

    <!-- Conteúdo colapsável -->
    <Transition name="ds-collapse">
      <div v-if="open" class="pb-6">
        <div class="flex flex-col gap-5 pl-12">
          <slot />
        </div>

        <!-- Footer com botão de ação -->
        <div v-if="$slots.actions" class="border-t border-gray-100 mt-6 pt-6 pl-12 flex items-center justify-end gap-3">
          <slot name="actions" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ds-collapse-enter-active,
.ds-collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.ds-collapse-enter-from,
.ds-collapse-leave-to {
  opacity: 0;
  max-height: 0;
  padding-bottom: 0;
}
</style>
