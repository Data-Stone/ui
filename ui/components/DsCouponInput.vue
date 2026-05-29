<script setup lang="ts">
/**
 * DsCouponInput — input de cupom com validação inline.
 * Baseado em billing-checkout WrapperCoupon.vue.
 */
import { ref, computed } from 'vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Possui cupom de desconto?',
})

const modelValue = defineModel<string>({ default: '' })
const coupon = ref('')
const status = ref<'idle' | 'valid' | 'invalid'>('idle')
const loading = ref(false)

const emit = defineEmits<{
  apply: [coupon: string]
  remove: []
}>()

const isApplied = computed(() => status.value === 'valid')

function apply() {
  if (!coupon.value.trim()) return
  loading.value = true
  modelValue.value = coupon.value.toUpperCase()
  emit('apply', coupon.value.toUpperCase())
  // O pai deve chamar setStatus após validação
}

function remove() {
  coupon.value = ''
  modelValue.value = ''
  status.value = 'idle'
  emit('remove')
}

function setStatus(newStatus: 'valid' | 'invalid') {
  status.value = newStatus
  loading.value = false
}

defineExpose({ setStatus, status })
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏷️</span>
        <input
          v-model="coupon"
          type="text"
          :placeholder="placeholder"
          :disabled="isApplied"
          class="w-full pl-10 pr-3 py-2.5 text-sm font-medium uppercase border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-60 disabled:bg-gray-50"
        />
      </div>
      <UButton
        v-if="!isApplied"
        color="primary"
        variant="solid"
        :disabled="!coupon.trim() || loading"
        @click="apply"
      >
        <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span v-else>Aplicar</span>
      </UButton>
      <UButton
        v-else
        color="red"
        variant="ghost"
        @click="remove"
      >
        Remover
      </UButton>
    </div>

    <!-- Feedback -->
    <div v-if="status === 'invalid'" class="flex items-center gap-2">
      <UIcon name="i-lucide-circle-x" class="w-4 h-4 text-red-500 flex-shrink-0" />
      <p class="text-sm text-red-500">Este cupom não é válido ou expirou.</p>
    </div>
    <div v-else-if="status === 'valid'" class="flex items-center gap-2">
      <UIcon name="i-lucide-circle-check" class="w-4 h-4 text-green-500 flex-shrink-0" />
      <p class="text-sm text-green-500">Cupom aplicado com sucesso!</p>
    </div>
  </div>
</template>
