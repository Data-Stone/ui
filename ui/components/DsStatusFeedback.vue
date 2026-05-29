<script setup lang="ts">
/**
 * DsStatusFeedback — tela de feedback de status (sucesso/erro/processando).
 * Baseado em billing-checkout PaymentFeedback.vue.
 */

interface Props {
  status: 'success' | 'error' | 'processing'
  statusText: string
  headline: string
  description?: string
  primaryAction?: string
  secondaryAction?: string
}

const props = withDefaults(defineProps<Props>(), {
  primaryAction: '',
  secondaryAction: '',
})

const emit = defineEmits<{
  primary: []
  secondary: []
}>()

const statusConfig: Record<string, { bg: string; icon: string; iconColor: string }> = {
  success: { bg: 'bg-green-500', icon: 'i-lucide-check', iconColor: 'text-white' },
  error: { bg: 'bg-red-500', icon: 'i-lucide-circle-x', iconColor: 'text-white' },
  processing: { bg: 'bg-amber-500', icon: 'i-lucide-loader-circle', iconColor: 'text-white' },
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto animate-fade-in">
    <div class="flex flex-col gap-6">
      <!-- Ícone de status -->
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center"
        :class="statusConfig[status].bg"
      >
        <UIcon
          :name="statusConfig[status].icon"
          class="w-6 h-6"
          :class="[statusConfig[status].iconColor, status === 'processing' ? 'animate-spin' : '']"
        />
      </div>

      <!-- Textos -->
      <div class="flex flex-col gap-2">
        <h3 class="font-medium text-2xl md:text-3xl text-gray-900">
          {{ statusText }}
        </h3>
        <h4 class="font-medium text-xl md:text-2xl text-gray-700">
          {{ headline }}
        </h4>
        <p v-if="description || $slots.description" class="text-gray-500 text-base md:text-lg mt-1">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>

      <!-- Ações -->
      <div v-if="primaryAction || secondaryAction" class="flex items-center gap-3 mt-2">
        <UButton
          v-if="secondaryAction"
          color="neutral"
          variant="outline"
          @click="emit('secondary')"
        >
          {{ secondaryAction }}
        </UButton>
        <UButton
          v-if="primaryAction"
          color="primary"
          variant="solid"
          @click="emit('primary')"
        >
          {{ primaryAction }}
          <span class="ml-1">→</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
