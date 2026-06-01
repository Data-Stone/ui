<script setup lang="ts">
/**
 * DsNumberInput — input numérico formatado com botões spin.
 * Baseado em billing NumberInput.vue.
 */
import { computed } from 'vue'

interface Props {
  label?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  hideSpinButtons?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  hideSpinButtons: false,
  disabled: false,
})

const modelValue = defineModel<number>({ default: 0 })

const formattedValue = computed({
  get: () => modelValue.value.toLocaleString('pt-BR'),
  set: (value: string) => {
    const numbers = value.replace(/\D/g, '')
    modelValue.value = numbers ? parseInt(numbers) : 0
  },
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const numbers = target.value.replace(/\D/g, '')
  modelValue.value = numbers ? parseInt(numbers) : 0
}

function increment() {
  const next = modelValue.value + props.step
  if (props.max === undefined || next <= props.max) {
    modelValue.value = next
  }
}

function decrement() {
  const next = modelValue.value - props.step
  if (props.min === undefined || next >= props.min) {
    modelValue.value = next
  }
}

function onKeypress(event: KeyboardEvent) {
  if (event.key < '0' || event.key > '9') {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-gray-900">{{ label }}</label>
    <div class="relative flex">
      <input
        type="text"
        :value="formattedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :class="!hideSpinButtons ? 'pr-10' : ''"
        inputmode="numeric"
        @input="onInput"
        @keypress="onKeypress"
      />
      <div
        v-if="!hideSpinButtons"
        class="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col"
      >
        <button
          type="button"
          :disabled="disabled || (max !== undefined && modelValue >= max)"
          class="px-1 py-0 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors leading-none"
          aria-label="Incrementar"
          @click="increment"
        >
          ▲
        </button>
        <button
          type="button"
          :disabled="disabled || (min !== undefined && modelValue <= min)"
          class="px-1 py-0 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors leading-none"
          aria-label="Decrementar"
          @click="decrement"
        >
          ▼
        </button>
      </div>
    </div>
  </div>
</template>
