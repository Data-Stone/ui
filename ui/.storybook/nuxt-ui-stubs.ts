/**
 * Stubs dos componentes Nuxt UI para Storybook.
 * Alinhados com app.config.ts do nexus-frontend.
 */
import { defineComponent, h, type PropType } from 'vue'

export const UCard = defineComponent({
  name: 'UCard',
  props: {
    ui: Object,
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: [
            'rounded-xl border border-gray-200 bg-white shadow-sm',
            'transition-all duration-200 ease-out',
            props.class,
          ],
        },
        [h('div', { class: 'p-4' }, slots.default?.())]
      )
  },
})

export const UIcon = defineComponent({
  name: 'UIcon',
  props: {
    name: String,
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props) {
    const iconMap: Record<string, string> = {
      'i-heroicons-question-mark-circle': '?',
      'i-heroicons-magnifying-glass': '⌕',
      'i-heroicons-x-mark': '✕',
      'i-heroicons-x-mark-20-solid': '✕',
      'i-heroicons-arrow-left': '←',
      'i-heroicons-chevron-left': '‹',
      'i-heroicons-chevron-right': '›',
      'i-heroicons-ellipsis-vertical': '⋮',
      'i-heroicons-lock-closed': '🔒',
      'i-heroicons-chart-bar': '📊',
      'i-lucide-eye': '👁',
      'i-lucide-eye-off': '🙈',
      'i-lucide-bar-chart-2': '📊',
      'i-lucide-circle-check': '✓',
      'i-lucide-circle-x': '✗',
      'i-lucide-calendar': '📅',
      'i-lucide-search': '🔍',
      'i-lucide-flame': '🔥',
      'i-lucide-loader-circle': '⟳',
      'i-lucide-check': '✓',
      'i-lucide-lock': '🔒',
      'i-lucide-user': '👤',
      'i-lucide-image': '🖼',
      'i-lucide-plus': '+',
      'i-lucide-trash-2': '🗑',
      'i-lucide-pencil': '✎',
      'i-lucide-download': '⬇',
      'i-lucide-upload': '⬆',
      'i-lucide-settings': '⚙',
      'i-lucide-info': 'ℹ',
      'i-lucide-alert-triangle': '⚠',
      'i-lucide-shield-check': '🛡',
    }
    return () =>
      h(
        'span',
        {
          class: ['inline-flex items-center justify-center shrink-0', props.class],
          'aria-label': props.name,
          role: 'img',
        },
        iconMap[props.name || ''] || '●'
      )
  },
})

export const UBadge = defineComponent({
  name: 'UBadge',
  props: {
    color: { type: String, default: 'primary' },
    variant: { type: String, default: 'soft' },
    size: { type: String, default: 'sm' },
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props, { slots }) {
    const colorStyles: Record<string, string> = {
      primary: 'bg-blue-50 text-blue-700 border-blue-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      error: 'bg-red-50 text-red-700 border-red-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      success: 'bg-green-50 text-green-700 border-green-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      info: 'bg-blue-50 text-blue-700 border-blue-200',
      warning: 'bg-amber-50 text-amber-700 border-amber-200',
      neutral: 'bg-gray-100 text-gray-700 border-gray-200',
      secondary: 'bg-gray-50 text-gray-600 border-gray-200',
    }

    const solidColorStyles: Record<string, string> = {
      primary: 'bg-blue-600 text-white border-blue-600',
      red: 'bg-red-600 text-white border-red-600',
      error: 'bg-red-600 text-white border-red-600',
      green: 'bg-green-600 text-white border-green-600',
      success: 'bg-green-600 text-white border-green-600',
      info: 'bg-blue-600 text-white border-blue-600',
      warning: 'bg-amber-500 text-white border-amber-500',
      neutral: 'bg-gray-600 text-white border-gray-600',
    }

    const sizeStyles: Record<string, string> = {
      xs: 'text-[10px] px-1.5 py-0.5',
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
    }

    return () => {
      const styles = props.variant === 'solid'
        ? (solidColorStyles[props.color] || solidColorStyles.primary)
        : (colorStyles[props.color] || colorStyles.primary)

      return h(
        'span',
        {
          class: [
            'inline-flex items-center gap-1 !rounded-full font-medium border',
            styles,
            sizeStyles[props.size] || sizeStyles.sm,
            props.class,
          ],
        },
        slots.default?.()
      )
    }
  },
})

export const UTooltip = defineComponent({
  name: 'UTooltip',
  props: {
    text: String,
    popper: Object,
  },
  setup(props, { slots }) {
    return () =>
      h('span', { class: 'inline-flex', title: props.text }, slots.default?.())
  },
})

export const USkeleton = defineComponent({
  name: 'USkeleton',
  props: {
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props) {
    return () =>
      h('div', {
        class: ['animate-pulse rounded bg-gray-100', props.class],
      })
  },
})

export const UProgress = defineComponent({
  name: 'UProgress',
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    color: { type: String, default: 'primary' },
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props) {
    const percent = () => Math.min(100, ((props.modelValue || 0) / (props.max || 100)) * 100)
    return () =>
      h('div', { class: ['h-1.5 bg-gray-100 rounded-full overflow-hidden', props.class] }, [
        h('div', {
          class: 'h-full bg-blue-500 rounded-full transition-all duration-500 ease-out',
          style: { width: `${percent()}%` },
        }),
      ])
  },
})

export const UCollapsible = defineComponent({
  name: 'UCollapsible',
  props: {
    open: { type: Boolean, default: false },
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: props.class }, [
        slots.default?.(),
        props.open ? slots.content?.() : null,
      ])
  },
})

export const UButton = defineComponent({
  name: 'UButton',
  props: {
    icon: String,
    color: { type: String, default: 'primary' },
    variant: { type: String, default: 'solid' },
    size: { type: String, default: 'md' },
    disabled: Boolean,
    loading: Boolean,
    class: [String, Object, Array] as PropType<any>,
  },
  setup(props, { slots, attrs }) {
    const styles: Record<string, Record<string, string>> = {
      primary: {
        solid: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
        outline: 'border border-blue-300 text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
        ghost: 'text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
        link: 'text-blue-600 hover:underline p-0',
      },
      info: {
        solid: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
        outline: 'border border-blue-300 text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
        ghost: 'text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
        link: 'text-blue-600 hover:underline p-0',
      },
      neutral: {
        solid: 'bg-gray-600 text-white hover:bg-gray-700 active:scale-[0.98]',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.98]',
        ghost: 'text-gray-600 hover:bg-gray-100 active:scale-[0.98]',
        link: 'text-gray-600 hover:underline p-0',
      },
      red: {
        solid: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
        outline: 'border border-red-300 text-red-600 hover:bg-red-50 active:scale-[0.98]',
        ghost: 'text-red-600 hover:bg-red-50 active:scale-[0.98]',
        link: 'text-red-600 hover:underline p-0',
      },
    }

    const sizes: Record<string, string> = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    }

    return () => {
      const c = props.color || 'primary'
      const v = props.variant || 'solid'
      const s = props.size || 'md'
      return h(
        'button',
        {
          class: [
            'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg',
            'transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed',
            styles[c]?.[v] || styles.primary.solid,
            v !== 'link' ? (sizes[s] || sizes.md) : '',
            props.class,
          ],
          disabled: props.disabled || props.loading,
          ...attrs,
        },
        slots.default?.()
      )
    }
  },
})
