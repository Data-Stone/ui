import { ref, reactive } from 'vue'

/**
 * useGenericTable — lógica de tabela com paginação server-side.
 * Extraído de billing-frontend, adaptado sem dependência de toast.
 */

export interface PaginatedResponse<T> {
  results: T[]
  count: number
}

export interface TableOptions {
  page?: number
  itemsPerPage?: number
  sortBy?: Array<{ key: string; order: 'asc' | 'desc' }> | string[]
  [key: string]: any
}

export function useGenericTable<T>(
  fetchFunction: (params: Record<string, any>) => Promise<PaginatedResponse<T> | T[]>,
  options?: { onError?: (error: any) => void }
) {
  const page = ref(1)
  const loading = ref(false)
  const itemsList = ref<PaginatedResponse<T>>({ results: [], count: 0 })
  const itemsPerPage = ref(10)
  const currentFilters = reactive<Record<string, any>>({})

  function cleanParams(params: Record<string, any>): Record<string, any> {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (
        value !== undefined &&
        value !== '' &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0)
      ) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>)
  }

  function parseSortBy(sortBy: any[]): string | undefined {
    if (!sortBy || sortBy.length === 0) return undefined
    let field = sortBy[0]
    let direction = 'asc'
    if (typeof field === 'object' && field !== null) {
      direction = field.order || 'asc'
      field = field.key || field.value || ''
    }
    if (!field) return undefined
    return direction === 'desc' ? `-${field}` : field
  }

  async function fetchItems(opts?: TableOptions): Promise<void> {
    loading.value = true
    try {
      const { page: requestedPage, itemsPerPage: optItemsPerPage, sortBy, ...restOptions } = opts || {}
      const limit = optItemsPerPage ?? itemsPerPage.value
      const currentPage = requestedPage || page.value
      const offset = limit === -1 ? 0 : (currentPage - 1) * limit

      Object.assign(currentFilters, restOptions)

      const filteredOptions = cleanParams({ ...currentFilters })

      if (sortBy) {
        const orderBy = parseSortBy(sortBy as any[])
        if (orderBy) filteredOptions.order_by = orderBy
      }

      const params = cleanParams({ limit, offset, ...filteredOptions })
      const response = await fetchFunction(params)

      if (Array.isArray(response)) {
        itemsList.value = { results: response, count: response.length }
      } else {
        itemsList.value = response
      }
    } catch (error: any) {
      options?.onError?.(error)
    } finally {
      loading.value = false
    }
  }

  function handleOptionsUpdate(opts: TableOptions) {
    page.value = opts.page || 1
    if (opts.itemsPerPage !== undefined) itemsPerPage.value = opts.itemsPerPage
    fetchItems(opts)
  }

  function clearFilters() {
    for (const key in currentFilters) delete currentFilters[key]
    page.value = 1
    fetchItems({ page: 1, itemsPerPage: itemsPerPage.value })
  }

  return {
    page,
    loading,
    itemsList,
    itemsPerPage,
    currentFilters,
    fetchItems,
    handleOptionsUpdate,
    clearFilters,
  }
}
