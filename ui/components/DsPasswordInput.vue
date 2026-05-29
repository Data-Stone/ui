<script setup lang="ts">
/**
 * DsPasswordInput — input de senha com barra de força.
 * Baseado em checkout CustomPasswordInput.vue.
 */
import { ref, computed } from 'vue'

interface Props {
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Senha',
  placeholder: '********',
})

const password = defineModel<string>({ default: '' })
const show = ref(false)
const showRequirements = ref(false)

const requirements = [
  { regex: /.{12,}/, text: 'Pelo menos 12 caracteres' },
  { regex: /[a-z]/, text: 'Pelo menos uma letra minúscula' },
  { regex: /[A-Z]/, text: 'Pelo menos uma letra maiúscula' },
  { regex: /\d/, text: 'Pelo menos 1 número' },
  { regex: /[^a-zA-Z0-9]/, text: 'Pelo menos um símbolo' },
]

const strength = computed(() =>
  requirements.map(req => ({ met: req.regex.test(password.value), text: req.text }))
)

const score = computed(() => strength.value.filter(r => r.met).length)

const strengthLabel = computed(() => {
  if (score.value === 0) return 'Insira uma senha'
  if (score.value <= 2) return 'Senha fraca'
  if (score.value <= 4) return 'Senha média'
  return 'Senha forte'
})

const barColor = computed(() => {
  if (score.value <= 2) return 'bg-red-500'
  if (score.value <= 4) return 'bg-amber-500'
  return 'bg-green-500'
})

const barWidth = computed(() => `${(score.value / 5) * 100}%`)

defineExpose({ score })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-900">{{ label }}</label>
    <div class="relative">
      <input
        :type="show ? 'text' : 'password'"
        :value="password"
        :placeholder="placeholder"
        class="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :aria-invalid="score < 5"
        @input="password = ($event.target as HTMLInputElement).value"
        @blur="showRequirements = true"
      />
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        class="absolute right-1 top-1/2 -translate-y-1/2"
        :aria-label="show ? 'Ocultar senha' : 'Mostrar senha'"
        @click="show = !show"
      >
        <UIcon :name="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="w-4 h-4" />
      </UButton>
    </div>

    <template v-if="showRequirements && password && score < 5">
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          :class="['h-full rounded-full transition-all duration-500 ease-out', barColor]"
          :style="{ width: barWidth }"
        />
      </div>

      <p class="text-sm font-medium text-gray-900">
        {{ strengthLabel }}. A senha deve conter:
      </p>

      <ul class="space-y-1" aria-label="Requisitos de senha">
        <li
          v-for="(req, i) in strength"
          :key="i"
          class="flex items-center gap-1.5 transition-colors duration-200"
          :class="req.met ? 'text-green-600' : 'text-gray-400'"
        >
          <UIcon
            :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
            class="w-4 h-4 flex-shrink-0"
          />
          <span class="text-xs">{{ req.text }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
