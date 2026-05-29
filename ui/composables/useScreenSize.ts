import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * useScreenSize — breakpoints responsivos reativos.
 * Duplicado em nexus-frontend e billing-checkout.
 */
export function useScreenSize() {
  const windowWidth = ref(0)

  const onResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const isMobile = computed(() => windowWidth.value < 768)
  const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
  const isSmallerWindow = computed(() => windowWidth.value >= 1024 && windowWidth.value < 1280)
  const isDesktop = computed(() => windowWidth.value >= 1024)
  const isLargeDesktop = computed(() => windowWidth.value >= 1280)

  return {
    windowWidth,
    isMobile,
    isTablet,
    isSmallerWindow,
    isDesktop,
    isLargeDesktop,
  }
}
