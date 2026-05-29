import { ref, computed, watch } from 'vue'

/**
 * useCrudEditMode — alterna entre modo leitura e edição.
 * Extraído de billing-frontend, adaptado sem dependência de vue-router.
 */

export interface CrudEditModeOptions {
  /** Estado inicial do modo edição */
  initialEditMode?: boolean
  /** Callback ao cancelar edição */
  onCancel?: () => void
  /** Callback ao salvar edição */
  onSave?: () => void
}

export function useCrudEditMode(options?: CrudEditModeOptions) {
  const editMode = ref(options?.initialEditMode ?? false)
  const originalItem = ref<any>(null)

  function setOriginal(item: any) {
    originalItem.value = JSON.parse(JSON.stringify(item))
  }

  function startEdit() {
    editMode.value = true
  }

  function cancelEdit() {
    editMode.value = false
    options?.onCancel?.()
  }

  function saveEdit() {
    editMode.value = false
    options?.onSave?.()
  }

  function isReadonly(id: string | number) {
    return computed(() => !editMode.value && id !== 'novo' && id !== 0)
  }

  function resetToOriginal(): any {
    return originalItem.value ? JSON.parse(JSON.stringify(originalItem.value)) : null
  }

  return {
    editMode,
    originalItem,
    setOriginal,
    startEdit,
    cancelEdit,
    saveEdit,
    isReadonly,
    resetToOriginal,
  }
}
