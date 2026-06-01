import { ref } from 'vue'

/**
 * useDelete — lógica de confirmação e execução de deleção.
 * Extraído de billing-frontend, adaptado sem dependência de toast.
 */

export function useDelete<T = string | number>(
  deleteFunction: (id: T) => Promise<void>,
  options?: {
    onSuccess?: () => void
    onError?: (error: any) => void
    successMessage?: string
  }
) {
  const showDeleteDialog = ref(false)
  const deleteLoading = ref(false)
  const itemToDelete = ref<T | null>(null) as { value: T | null }

  function openDeleteConfirmation(id: T) {
    itemToDelete.value = id
    showDeleteDialog.value = true
  }

  async function confirmDelete() {
    if (itemToDelete.value === null) return

    deleteLoading.value = true
    try {
      await deleteFunction(itemToDelete.value)
      options?.onSuccess?.()
    } catch (error: any) {
      options?.onError?.(error)
    } finally {
      deleteLoading.value = false
      itemToDelete.value = null
      showDeleteDialog.value = false
    }
  }

  function cancelDelete() {
    itemToDelete.value = null
    showDeleteDialog.value = false
  }

  return {
    showDeleteDialog,
    deleteLoading,
    itemToDelete,
    openDeleteConfirmation,
    confirmDelete,
    cancelDelete,
  }
}
