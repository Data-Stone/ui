<script setup lang="ts">
/**
 * DsCarousel — carrossel com gradientes laterais.
 * Baseado em checkout CustomCarousel.vue.
 */
import { ref, onMounted, onUnmounted } from 'vue'

export interface CarouselItem {
  src: string
  alt: string
}

interface Props {
  items: CarouselItem[]
  autoScroll?: number
  gradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoScroll: 3000,
  gradient: true,
})

const containerRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

function scrollTo(index: number) {
  const container = containerRef.value
  if (!container) return
  const children = container.children
  if (children[index]) {
    children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
  currentIndex.value = index
}

function next() {
  const nextIndex = (currentIndex.value + 1) % props.items.length
  scrollTo(nextIndex)
}

function prev() {
  const prevIndex = (currentIndex.value - 1 + props.items.length) % props.items.length
  scrollTo(prevIndex)
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.autoScroll > 0) {
    timer = setInterval(next, props.autoScroll)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative w-full">
    <div
      v-if="gradient"
      class="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white from-20% to-transparent pointer-events-none z-[1]"
    />
    <div
      v-if="gradient"
      class="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white from-20% to-transparent pointer-events-none z-[1]"
    />

    <div
      ref="containerRef"
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 scrollbar-hide"
    >
      <div
        v-for="(item, i) in items"
        :key="i"
        class="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 snap-center"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="h-24 w-full object-contain mx-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    <div class="flex items-center justify-center gap-2 mt-3">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        class="!rounded-full"
        aria-label="Anterior"
        @click="prev"
      >
        <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
      </UButton>
      <div class="flex gap-1.5">
        <button
          v-for="(_, i) in items"
          :key="i"
          type="button"
          :class="[
            'rounded-full transition-all duration-300',
            currentIndex === i ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400',
          ]"
          :aria-label="`Ir para slide ${i + 1}`"
          @click="scrollTo(i)"
        />
      </div>
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        class="!rounded-full"
        aria-label="Próximo"
        @click="next"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
      </UButton>
    </div>
  </div>
</template>
