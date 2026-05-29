<script setup lang="ts">
/**
 * DsEditTemplate — template de página de edição/detalhe.
 * Baseado em billing EditTemplate.vue.
 */
interface Props {
  title: string
  editMode?: boolean
  loading?: boolean
  loadingSave?: boolean
  showEditButton?: boolean
  showSaveButton?: boolean
  showCancelButton?: boolean
  showBackButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editMode: false,
  loading: false,
  loadingSave: false,
  showEditButton: true,
  showSaveButton: true,
  showCancelButton: true,
  showBackButton: true,
})

const emit = defineEmits<{
  save: []
  edit: []
  cancel: []
  back: []
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Save overlay -->
    <Teleport to="body">
      <div
        v-if="loadingSave"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30"
      >
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </Teleport>

    <!-- Header -->
    <div class="flex items-center gap-3">
      <UButton
        v-if="showBackButton"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Voltar"
        @click="emit('back')"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
      </UButton>
      <div v-if="loading" class="h-7 w-64 rounded bg-gray-100 animate-pulse" />
      <h1 v-else class="text-xl font-bold text-gray-900">{{ title }}</h1>
    </div>

    <hr class="border-gray-100" />

    <!-- Content card -->
    <div class="border border-gray-200 rounded-xl bg-white p-6">
      <slot name="tabs" />

      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>

      <template v-else>
        <slot name="form" />

        <div v-if="showEditButton && !editMode" class="mt-6 pt-6 border-t border-gray-100">
          <UButton
            color="primary"
            variant="outline"
            @click="emit('edit')"
          >
            Editar
          </UButton>
        </div>

        <div v-if="editMode && (showSaveButton || showCancelButton)" class="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
          <UButton
            v-if="showSaveButton"
            color="primary"
            variant="solid"
            :disabled="loadingSave"
            @click="emit('save')"
          >
            Salvar
          </UButton>
          <UButton
            v-if="showCancelButton"
            color="neutral"
            variant="outline"
            @click="emit('cancel')"
          >
            Cancelar
          </UButton>
        </div>
      </template>
    </div>
  </div>
</template>
