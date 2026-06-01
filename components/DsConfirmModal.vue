<script setup lang="ts">
/**
 * DsConfirmModal — modal de confirmação genérico.
 * Baseado em billing ConfirmDialog + nexus patterns.
 */
import { computed } from 'vue'

interface Props {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  icon?: string
  loading?: boolean
  variant?: 'danger' | 'primary' | 'warning'
  /** Preset rápido para deleção */
  preset?: 'delete' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '',
  cancelText: 'Cancelar',
  variant: 'danger',
  preset: 'none',
})

const resolvedTitle = computed(() =>
  props.title || (props.preset === 'delete' ? 'Confirmar exclusão' : 'Confirmar')
)
const resolvedMessage = computed(() =>
  props.message || (props.preset === 'delete' ? 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.' : '')
)
const resolvedConfirmText = computed(() =>
  props.confirmText || (props.preset === 'delete' ? 'Excluir' : 'Confirmar')
)
const resolvedIcon = computed(() =>
  props.icon || (props.preset === 'delete' ? 'i-heroicons-x-mark' : '')
)
const resolvedVariant = computed(() =>
  props.preset === 'delete' ? 'danger' : props.variant
)

const open = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function handleCancel() {
  open.value = false
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="ds-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div class="absolute inset-0 bg-gray-900/70" @click="handleCancel" />
        <div class="relative bg-white border border-gray-200 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scale-in">
          <div class="flex items-start gap-4">
            <div
              v-if="resolvedIcon"
              :class="[
                'flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full',
                resolvedVariant === 'danger' ? 'bg-red-50' : resolvedVariant === 'warning' ? 'bg-amber-50' : 'bg-blue-50',
              ]"
            >
              <UIcon
                :name="resolvedIcon"
                :class="[
                  'w-5 h-5',
                  resolvedVariant === 'danger' ? 'text-red-600' : resolvedVariant === 'warning' ? 'text-amber-600' : 'text-blue-600',
                ]"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ resolvedTitle }}</h3>
              <p class="mt-2 text-sm text-gray-500 leading-relaxed">{{ resolvedMessage }}</p>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton
              color="neutral"
              variant="ghost"
              @click="handleCancel"
            >
              {{ cancelText }}
            </UButton>
            <UButton
              :color="resolvedVariant === 'danger' ? 'red' : resolvedVariant === 'warning' ? 'primary' : 'primary'"
              variant="solid"
              :disabled="loading"
              @click="emit('confirm')"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {{ resolvedConfirmText }}
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-modal-enter-active,
.ds-modal-leave-active {
  transition: opacity 0.2s ease;
}
.ds-modal-enter-from,
.ds-modal-leave-to {
  opacity: 0;
}
</style>
