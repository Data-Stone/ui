<script setup lang="ts">
/**
 * DsAvatar — avatar com imagem, iniciais como fallback.
 * Baseado no padrão do nexus-frontend (VisitorRow, IdentifiedPersonCard, CompanyCardCompact).
 */
import { computed } from 'vue'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  icon?: string
  masked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  icon: 'i-lucide-user',
})

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const sizeClasses: Record<string, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg',
}
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ring-2 ring-transparent"
    :class="sizeClasses[size]"
  >
    <img
      v-if="src && !masked"
      :src="src"
      :alt="alt || name"
      class="w-full h-full object-cover"
      :class="{ 'opacity-50 blur-[2px]': masked }"
    />
    <span
      v-else-if="initials"
      class="font-semibold bg-blue-50 text-blue-600 w-full h-full flex items-center justify-center"
    >
      {{ initials }}
    </span>
    <UIcon
      v-else
      :name="icon"
      class="w-1/2 h-1/2 text-gray-400"
    />

    <!-- Lock overlay para mascarado -->
    <div
      v-if="masked"
      class="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]"
    >
      <UIcon name="i-lucide-lock" class="w-1/3 h-1/3 text-amber-600" />
    </div>
  </div>
</template>
