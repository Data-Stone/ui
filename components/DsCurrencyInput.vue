<script setup lang="ts">
/**
 * DsCurrencyInput — input monetário pt-BR.
 * Baseado em billing CurrencyInput.vue.
 */
import { computed } from 'vue'

interface Props {
  label?: string
  prefix?: string
  decimals?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'R$ ',
  decimals: 2,
  placeholder: 'Digite um valor',
})

const modelValue = defineModel<number | null>({ default: null })

const formattedValue = computed({
  get: () => {
    if (modelValue.value === null || modelValue.value === undefined) return ''
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: props.decimals,
      maximumFractionDigits: props.decimals,
    }).format(modelValue.value)
  },
  set: (value: string) => {
    if (value === '') {
      modelValue.value = null
      return
    }
    const numbers = value.replace(/\D/g, '')
    const divisor = Math.pow(10, props.decimals)
    modelValue.value = numbers ? parseFloat(numbers) / divisor : null
  },
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')
  formattedValue.value = value
}

function onKeypress(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode
  if ((charCode > 31 && charCode < 48) || charCode > 57) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-gray-900">{{ label }}</label>
    <div class="relative">
      <span
        v-if="prefix && modelValue !== null"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none"
      >
        {{ prefix }}
      </span>
      <input
        type="text"
        :value="formattedValue"
        :placeholder="placeholder"
        class="w-full py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :class="prefix && modelValue !== null ? 'pl-10 pr-3' : 'px-3'"
        inputmode="numeric"
        @input="onInput"
        @keypress="onKeypress"
      />
    </div>
  </div>
</template>
