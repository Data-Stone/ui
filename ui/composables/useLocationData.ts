import { ref, watch, type Ref } from 'vue'

/**
 * useLocationData — busca estados e cidades do IBGE.
 * Extraído de billing-frontend (useStateCities).
 */

export interface BrazilianState {
  nome: string
  sigla: string
}

export interface BrazilianCity {
  nome: string
  id: number
}

const IBGE_API = 'https://servicodados.ibge.gov.br/api/v1/localidades'

export function useLocationData(stateRef?: Ref<string>) {
  const statesList = ref<BrazilianState[]>([])
  const citiesList = ref<BrazilianCity[]>([])
  const loadingStates = ref(false)
  const loadingCities = ref(false)

  async function getStates(): Promise<void> {
    loadingStates.value = true
    try {
      const response = await fetch(`${IBGE_API}/estados`)
      const data = await response.json()
      statesList.value = data
        .map((s: any) => ({ nome: s.nome, sigla: s.sigla }))
        .sort((a: BrazilianState, b: BrazilianState) => a.nome.localeCompare(b.nome))
    } catch {
      console.error('[useLocationData] Erro ao buscar estados')
    } finally {
      loadingStates.value = false
    }
  }

  async function getCities(stateSigla: string): Promise<void> {
    if (!stateSigla) return
    loadingCities.value = true
    try {
      const response = await fetch(`${IBGE_API}/estados/${stateSigla}/municipios`)
      const data = await response.json()
      citiesList.value = data
        .map((c: any) => ({ nome: c.nome, id: c.id }))
        .sort((a: BrazilianCity, b: BrazilianCity) => a.nome.localeCompare(b.nome))
    } catch {
      console.error('[useLocationData] Erro ao buscar cidades')
    } finally {
      loadingCities.value = false
    }
  }

  // Watch automático se ref de estado for passada
  if (stateRef) {
    watch(stateRef, (newState) => {
      if (newState) getCities(newState)
    })
  }

  return {
    statesList,
    citiesList,
    loadingStates,
    loadingCities,
    getStates,
    getCities,
  }
}
