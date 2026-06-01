<script setup lang="ts">
/**
 * DsStepper — indicador de progresso multi-etapa.
 * Baseado em checkout CustomStepper + nexus InstallSteps patterns.
 */
export interface StepItem {
  title: string
  description?: string
}

interface Props {
  items: StepItem[]
  orientation?: 'horizontal' | 'vertical'
  /** Alterna para vertical automaticamente em telas menores que este breakpoint (px) */
  responsiveBreakpoint?: number
  /** Permite clicar em steps completados para voltar */
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  responsiveBreakpoint: 0,
  clickable: false,
})

import { ref, computed, onMounted, onUnmounted } from 'vue'

const current = defineModel<number>({ default: 0 })

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

function onResize() { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

const effectiveOrientation = computed(() => {
  if (props.responsiveBreakpoint > 0 && windowWidth.value < props.responsiveBreakpoint) {
    return 'vertical'
  }
  return props.orientation
})

function stepStatus(index: number): 'completed' | 'current' | 'pending' {
  if (index < current.value) return 'completed'
  if (index === current.value) return 'current'
  return 'pending'
}

function handleClick(index: number) {
  if (!props.clickable) return
  if (stepStatus(index) === 'completed') {
    current.value = index
  }
}
</script>

<template>
  <div
    :class="[
      'flex gap-2',
      effectiveOrientation === 'vertical' ? 'flex-col' : 'flex-row items-start',
    ]"
  >
    <div
      v-for="(step, i) in items"
      :key="i"
      :class="[
        'flex gap-3',
        effectiveOrientation === 'vertical' ? 'items-start' : 'items-center flex-1',
      ]"
    >
      <div
        class="flex items-center gap-3 flex-shrink-0"
        :class="{ 'cursor-pointer': clickable && stepStatus(i) === 'completed' }"
        @click="handleClick(i)"
      >
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2',
            stepStatus(i) === 'completed'
              ? 'border-green-500 bg-green-50/30 text-green-600'
              : '',
            stepStatus(i) === 'current'
              ? 'border-blue-600 bg-white text-blue-600 ring-1 ring-blue-100 shadow-sm'
              : '',
            stepStatus(i) === 'pending'
              ? 'border-gray-200 bg-gray-50 text-gray-400'
              : '',
          ]"
        >
          <span v-if="stepStatus(i) === 'completed'">✓</span>
          <span v-else>{{ i + 1 }}</span>
        </div>

        <div class="flex flex-col">
          <span
            :class="[
              'text-sm font-medium transition-colors',
              stepStatus(i) === 'completed' ? 'text-green-700' : '',
              stepStatus(i) === 'current' ? 'text-gray-900' : '',
              stepStatus(i) === 'pending' ? 'text-gray-400' : '',
            ]"
          >
            {{ step.title }}
          </span>
          <span v-if="step.description" class="text-xs text-gray-500">
            {{ step.description }}
          </span>
        </div>
      </div>

      <!-- Connector line horizontal -->
      <div
        v-if="i < items.length - 1 && effectiveOrientation === 'horizontal'"
        :class="[
          'flex-1 h-0.5 mt-5 mx-2 transition-colors duration-500',
          stepStatus(i) === 'completed' ? 'bg-green-400' : 'bg-gray-200',
        ]"
      />

      <!-- Connector line vertical -->
      <div
        v-if="i < items.length - 1 && effectiveOrientation === 'vertical'"
        :class="[
          'w-0.5 h-6 ml-5 transition-colors duration-500',
          stepStatus(i) === 'completed' ? 'bg-green-400' : 'bg-gray-200',
        ]"
      />
    </div>
  </div>
</template>
