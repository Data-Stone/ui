<script setup lang="ts">
/**
 * DsRecaptcha — wrapper para Google reCAPTCHA v2.
 * Baseado em billing-checkout RecaptchaBox.vue.
 */
import { ref, onMounted } from 'vue'

interface Props {
  siteKey: string
}

const props = defineProps<Props>()
const recaptchaContainer = ref<HTMLElement | null>(null)
const verified = ref(false)

const emit = defineEmits<{
  verify: [token: string | null]
}>()

declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, options: any) => void
      reset: (id?: number) => void
    }
    onRecaptchaLoad?: () => void
  }
}

function renderRecaptcha() {
  if (recaptchaContainer.value && window.grecaptcha?.render) {
    window.grecaptcha.render(recaptchaContainer.value, {
      sitekey: props.siteKey,
      callback: (token: string) => {
        verified.value = true
        emit('verify', token)
      },
      'expired-callback': () => {
        verified.value = false
        emit('verify', null)
      },
    })
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  // Se já carregou o script
  if (window.grecaptcha?.render) {
    renderRecaptcha()
    return
  }

  // Injeta script se necessário
  if (!document.querySelector('script[src*="recaptcha"]')) {
    window.onRecaptchaLoad = renderRecaptcha
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  } else {
    // Script existe mas ainda não carregou
    const check = setInterval(() => {
      if (window.grecaptcha?.render) {
        renderRecaptcha()
        clearInterval(check)
      }
    }, 100)
    // Safety timeout
    setTimeout(() => clearInterval(check), 10000)
  }
})

defineExpose({ verified })
</script>

<template>
  <div ref="recaptchaContainer" />
</template>
