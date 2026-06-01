<script setup lang="ts">
/**
 * DsAppShell — shell de layout com aside + main.
 * Slots: #header, #aside, #main (ou default).
 */
type Density = 'compact' | 'comfortable'

interface Props {
  asideWidth?: string
  density?: Density
  collapsible?: boolean
  gradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  asideWidth: '280px',
  density: 'comfortable',
  collapsible: false,
  gradient: false,
})

const asideOpen = defineModel<boolean>('asideOpen', { default: true })
</script>

<template>
  <div
    class="ds-app-shell flex flex-col min-h-full text-gray-900"
    :class="gradient ? 'ds-app-shell--gradient' : 'bg-white'"
  >
    <header v-if="$slots.header" class="border-b border-gray-200 bg-white">
      <slot name="header" />
    </header>

    <div
      class="flex-1 grid min-h-0"
      :class="$slots.aside ? 'ds-app-shell__body' : ''"
      :style="$slots.aside ? { gridTemplateColumns: `${asideWidth} 1fr` } : { gridTemplateColumns: '1fr' }"
    >
      <aside
        v-if="$slots.aside"
        :data-open="asideOpen ? 'true' : 'false'"
        :class="[
          'ds-app-shell__aside',
          'border-r border-gray-200 bg-white overflow-y-auto ds-scrollbar',
          density === 'compact' ? 'p-3' : 'p-5',
          collapsible && 'ds-app-shell__aside--collapsible',
        ]"
      >
        <slot name="aside" />
      </aside>

      <main
        :class="[
          'overflow-y-auto',
          density === 'compact' ? 'p-4' : 'p-6',
        ]"
      >
        <slot name="main" />
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.ds-app-shell--gradient {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, rgba(67, 111, 190, 0.03) 100%);
}

@media (max-width: 1024px) {
  .ds-app-shell__aside--collapsible[data-open='false'] { display: none; }
  .ds-app-shell__body:has(.ds-app-shell__aside--collapsible) {
    grid-template-columns: 1fr !important;
  }
  .ds-app-shell__aside--collapsible[data-open='true'] {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(280px, 90vw);
    z-index: 50;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
}
</style>
