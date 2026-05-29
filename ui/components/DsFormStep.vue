<script setup lang="ts">
/**
 * DsFormStep — wrapper de step de formulário.
 * Baseado em checkout FormStep.vue.
 */
interface Props {
  title: string
  description?: string
  currentStep?: number
  totalSteps?: number
  loading?: boolean
  showBack?: boolean
  showNext?: boolean
  nextLabel?: string
  backLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true,
  showNext: true,
  nextLabel: 'Continuar',
  backLabel: 'Voltar',
})

const emit = defineEmits<{
  next: []
  back: []
  submit: []
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div>
      <div v-if="currentStep && totalSteps" class="text-xs text-gray-400 font-mono mb-1">
        Etapa {{ currentStep }} de {{ totalSteps }}
      </div>
      <h2 class="text-2xl font-medium text-blue-600">{{ title }}</h2>
      <p v-if="description" class="mt-1 text-base text-gray-400">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- Form content -->
    <div class="flex-1 flex flex-col gap-5">
      <slot />
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
      <UButton
        v-if="showBack"
        color="neutral"
        variant="outline"
        class="px-6 py-2"
        @click="emit('back')"
      >
        {{ backLabel }}
      </UButton>

      <UButton
        v-if="showNext"
        color="info"
        :disabled="loading"
        class="px-6 py-2"
        @click="emit('next')"
      >
        <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {{ nextLabel }}
      </UButton>
    </div>
  </div>
</template>
