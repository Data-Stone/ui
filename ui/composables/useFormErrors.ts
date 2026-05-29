import { ref } from 'vue'

/**
 * useFormErrors — gerenciamento de erros de formulário vindos da API.
 * Extraído de billing-frontend.
 */

export interface ApiFormErrors {
  [key: string]: string[]
}

export function useFormErrors() {
  const errors = ref<ApiFormErrors>({})

  function setErrors(errorData: Record<string, string[]> | Array<Record<string, string[]>>) {
    errors.value = {}
    if (Array.isArray(errorData)) {
      errorData.forEach((rowError, index) => {
        Object.entries(rowError).forEach(([key, value]) => {
          if (value) errors.value[`${index}.${key}`] = value
        })
      })
    } else {
      Object.entries(errorData).forEach(([key, value]) => {
        errors.value[key] = value
      })
    }
  }

  function clearErrors() {
    errors.value = {}
  }

  function clearError(field: string) {
    delete errors.value[field]
  }

  function getErrorMessages(field: string): string[] {
    return errors.value[field] || []
  }

  function hasError(field: string): boolean {
    return !!errors.value[field]?.length
  }

  function hasAnyError(): boolean {
    return Object.keys(errors.value).length > 0
  }

  return {
    errors,
    setErrors,
    clearErrors,
    clearError,
    getErrorMessages,
    hasError,
    hasAnyError,
  }
}
