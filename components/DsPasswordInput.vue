<script setup lang="ts">
/**
 * DsPasswordInput — input de senha com barra de força e regras configuráveis.
 *
 * Regras padrão (checkout): 12 chars, minúscula, maiúscula, número, símbolo.
 * Passe `rules` para sobrescrever (ex.: billing-portal usa 8 chars e 4 regras).
 */
import { ref, computed } from 'vue'
import type { PasswordRule } from '../types'

interface Props {
  label?: string
  placeholder?: string
  /** Regras personalizadas; quando omitido, usa as 5 regras padrão. */
  rules?: PasswordRule[]
  /** Exibe a barra de força e o rótulo (fraca/média/forte). */
  showStrengthBar?: boolean
}

const DEFAULT_RULES: PasswordRule[] = [
  { regex: /.{12,}/, text: 'Pelo menos 12 caracteres' },
  { regex: /[a-z]/, text: 'Pelo menos uma letra minúscula' },
  { regex: /[A-Z]/, text: 'Pelo menos uma letra maiúscula' },
  { regex: /\d/, text: 'Pelo menos 1 número' },
  { regex: /[^a-zA-Z0-9]/, text: 'Pelo menos um símbolo' },
]

const props = withDefaults(defineProps<Props>(), {
  label: 'Senha',
  placeholder: '********',
  rules: undefined,
  showStrengthBar: true,
})

const password = defineModel<string>({ default: '' })
const show = ref(false)
const showRequirements = ref(false)

const activeRules = computed(() => props.rules ?? DEFAULT_RULES)

const strength = computed(() =>
  activeRules.value.map(req => ({ met: req.regex.test(password.value), text: req.text }))
)

const score = computed(() => strength.value.filter(r => r.met).length)
const total = computed(() => activeRules.value.length)
const allValid = computed(() => score.value === total.value)

const strengthLabel = computed(() => {
  if (score.value === 0) return 'Insira uma senha'
  const ratio = score.value / total.value
  if (ratio <= 0.4) return 'Senha fraca'
  if (ratio < 1) return 'Senha média'
  return 'Senha forte'
})

const barColor = computed(() => {
  const ratio = score.value / total.value
  if (ratio <= 0.4) return 'bg-red-500'
  if (ratio < 1) return 'bg-amber-500'
  return 'bg-green-500'
})

const barWidth = computed(() => `${(score.value / total.value) * 100}%`)

defineExpose({ score, allValid })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-900 dark:text-gray-100">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="show ? 'text' : 'password'"
        :value="password"
        :placeholder="placeholder"
        class="w-full px-3 py-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :aria-invalid="!allValid"
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

    <template v-if="showRequirements && password && !allValid">
      <div v-if="showStrengthBar" class="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          :class="['h-full rounded-full transition-all duration-500 ease-out', barColor]"
          :style="{ width: barWidth }"
        />
      </div>

      <p v-if="showStrengthBar" class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ strengthLabel }}. A senha deve conter:
      </p>

      <ul class="space-y-1" aria-label="Requisitos de senha">
        <li
          v-for="(req, i) in strength"
          :key="i"
          class="flex items-center gap-1.5 transition-colors duration-200"
          :class="req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'"
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
