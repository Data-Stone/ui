/**
 * useFeedbackToast — wrapper para exibir toasts de feedback.
 * Duplicado em nexus-frontend e billing-checkout.
 *
 * Uso com Nuxt UI: usa useToast() internamente.
 * Uso standalone: aceita adaptador customizado.
 */

export interface ToastAdapter {
  add: (options: { title: string; icon?: string; color?: string }) => void
}

export function useFeedbackToast(adapter?: ToastAdapter) {
  const getToast = (): ToastAdapter => {
    if (adapter) return adapter
    // Tenta usar useToast do Nuxt UI se disponível
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useToast } = require('#imports')
      return useToast()
    } catch {
      // Fallback: console
      return {
        add: (opts) => {
          const method = opts.color === 'error' ? 'error' : 'log'
          console[method](`[Toast] ${opts.title}`)
        },
      }
    }
  }

  function showToast(message: string, type: 'error' | 'success' = 'error') {
    const toast = getToast()
    toast.add({
      title: message,
      icon: `i-lucide-circle-${type === 'error' ? 'x' : 'check'}`,
      color: type,
    })
  }

  function showSuccess(message: string) {
    showToast(message, 'success')
  }

  function showError(message: string) {
    showToast(message, 'error')
  }

  return { showToast, showSuccess, showError }
}
