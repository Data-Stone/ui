<script setup lang="ts">
/**
 * DsSecurityBadge — indicador de segurança SSL.
 * Baseado em billing-checkout SecurityVerified.vue (duplicado 2x).
 */

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ambiente 100% seguro',
  description: 'Pagamento seguro criptografado com SSL de 128 bits.',
})
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <div class="flex items-center gap-2.5">
      <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-green-600" />
      <h6 class="font-medium text-sm text-gray-800">{{ title }}</h6>
    </div>
    <p class="text-gray-500 text-sm text-center">
      {{ description }}
    </p>
  </div>
</template>
