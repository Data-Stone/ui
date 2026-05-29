<script setup lang="ts">
/**
 * DsCookieBanner — banner LGPD para consentimento de cookies.
 * Réplica fiel do checkout CookieBanner.vue, com persistência.
 */
import { ref, onMounted } from 'vue'

interface Props {
  policyUrl?: string
  /** Chave do cookie/localStorage para persistir escolha */
  storageKey?: string
  /** Dias de validade da escolha */
  maxAgeDays?: number
}

const props = withDefaults(defineProps<Props>(), {
  policyUrl: 'https://www.datastone.com.br/politica-cookies',
  storageKey: 'ds-cookie-consent',
  maxAgeDays: 365,
})

const visible = defineModel<boolean>({ default: true })

const emit = defineEmits<{
  accept: []
  reject: []
}>()

onMounted(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(props.storageKey)
    if (stored) {
      visible.value = false
    }
  }
})

function persist(value: 'accepted' | 'rejected') {
  if (typeof window !== 'undefined') {
    localStorage.setItem(props.storageKey, value)
  }
}

function accept() {
  persist('accepted')
  emit('accept')
  visible.value = false
}

function reject() {
  persist('rejected')
  emit('reject')
  visible.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="ds-cookie-banner">
      <div
        v-if="visible"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-4"
      >
        <div class="mx-auto max-w-5xl flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex-1 flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-blue-600 shrink-0" />
              <span class="font-semibold text-gray-800 text-sm">
                Privacidade e Termos de Uso
              </span>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed">
              Utilizamos cookies e dados para garantir o funcionamento do site e melhorar sua experiência.
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
              <a
                :href="policyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline font-medium"
              >Política de Cookies</a>.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton variant="ghost" color="neutral" size="sm" @click="reject">
              Recusar
            </UButton>
            <UButton variant="solid" color="info" size="sm" @click="accept">
              Aceitar
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-cookie-banner-enter-active,
.ds-cookie-banner-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}
.ds-cookie-banner-enter-from,
.ds-cookie-banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
