<script setup lang="ts">
/**
 * DsAddressForm — formulário de endereço brasileiro com CEP via ViaCEP.
 * Baseado em billing-frontend BillingAdressForm.vue + checkout.
 */
import { ref, reactive, watch } from 'vue'

export interface AddressData {
  postalCode: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
}

interface Props {
  modelValue?: AddressData
  disabled?: boolean
  loading?: boolean
  showComplement?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  showComplement: true,
})

const emit = defineEmits<{
  'update:modelValue': [data: AddressData]
  submit: [data: AddressData]
}>()

const form = reactive<AddressData>({
  postalCode: props.modelValue?.postalCode || '',
  address: props.modelValue?.address || '',
  number: props.modelValue?.number || '',
  complement: props.modelValue?.complement || '',
  neighborhood: props.modelValue?.neighborhood || '',
  city: props.modelValue?.city || '',
  state: props.modelValue?.state || '',
  country: props.modelValue?.country || 'Brasil',
})

const cepLoading = ref(false)
const cepError = ref('')

watch(form, (newVal) => {
  emit('update:modelValue', { ...newVal })
}, { deep: true })

async function fetchCEP() {
  const cep = form.postalCode.replace(/\D/g, '')
  if (cep.length !== 8) return

  cepLoading.value = true
  cepError.value = ''

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      cepError.value = 'CEP não encontrado'
      return
    }

    form.address = data.logradouro || ''
    form.neighborhood = data.bairro || ''
    form.city = data.localidade || ''
    form.state = data.uf || ''
  } catch {
    cepError.value = 'Erro ao buscar CEP'
  } finally {
    cepLoading.value = false
  }
}

function handleSubmit() {
  emit('submit', { ...form })
}

defineExpose({ form, fetchCEP })
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- CEP -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">CEP</label>
      <input
        v-model="form.postalCode"
        type="text"
        placeholder="00000-000"
        maxlength="9"
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
        @blur="fetchCEP"
      />
      <p v-if="cepError" class="text-xs text-red-500">{{ cepError }}</p>
      <p v-if="cepLoading" class="text-xs text-gray-400 animate-pulse">Buscando...</p>
    </div>

    <!-- Estado -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Estado</label>
      <input
        v-model="form.state"
        type="text"
        placeholder="UF"
        maxlength="2"
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>

    <!-- Cidade -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Cidade</label>
      <input
        v-model="form.city"
        type="text"
        placeholder="Cidade"
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>

    <!-- Endereço -->
    <div class="sm:col-span-2 flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Endereço</label>
      <input
        v-model="form.address"
        type="text"
        placeholder="Rua, Avenida..."
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>

    <!-- Número -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Número</label>
      <input
        v-model="form.number"
        type="text"
        placeholder="Nº"
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>

    <!-- Bairro -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Bairro</label>
      <input
        v-model="form.neighborhood"
        type="text"
        placeholder="Bairro"
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>

    <!-- Complemento -->
    <div v-if="showComplement" class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">Complemento</label>
      <input
        v-model="form.complement"
        type="text"
        placeholder="Apto, Sala..."
        :disabled="disabled"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
      />
    </div>
  </div>
</template>
