/**
 * Barrel export — uso standalone (sem Nuxt Layer).
 * Frontends que usam Nuxt Layer NÃO precisam importar daqui.
 */

// ─── Fase 1 — Componentes originais (alinhados) ──────────
export { default as DsAppShell }    from './components/DsAppShell.vue';
export { default as DsChannelList } from './components/DsChannelList.vue';
export { default as DsKpiCard }     from './components/DsKpiCard.vue';
export { default as DsKpiGrid }     from './components/DsKpiGrid.vue';
export { default as DsTimeline }    from './components/DsTimeline.vue';

// ─── Fase 2 — Componentes principais (extraídos) ─────────
export { default as DsEmptyState }      from './components/DsEmptyState.vue';
export { default as DsConfirmModal }    from './components/DsConfirmModal.vue';
export { default as DsDateRangePicker } from './components/DsDateRangePicker.vue';
export { default as DsDataTable }       from './components/DsDataTable.vue';
export { default as DsStepper }         from './components/DsStepper.vue';
export { default as DsPasswordInput }   from './components/DsPasswordInput.vue';
export { default as DsMetricCard }      from './components/DsMetricCard.vue';
export { default as DsDetailItem }      from './components/DsDetailItem.vue';
export { default as DsInfoRow }         from './components/DsInfoRow.vue';
export { default as DsCarousel }        from './components/DsCarousel.vue';

// ─── Fase 3 — Componentes secundários (extraídos) ────────
export { default as DsBaseTemplate }    from './components/DsBaseTemplate.vue';
export { default as DsEditTemplate }    from './components/DsEditTemplate.vue';
export { default as DsFilterBar }       from './components/DsFilterBar.vue';
export { default as DsDialog }          from './components/DsDialog.vue';
export { default as DsMenuButton }      from './components/DsMenuButton.vue';
export { default as DsCurrencyInput }   from './components/DsCurrencyInput.vue';
export { default as DsNumberInput }     from './components/DsNumberInput.vue';
export { default as DsResourceCard }    from './components/DsResourceCard.vue';
export { default as DsCookieBanner }    from './components/DsCookieBanner.vue';
export { default as DsFormStep }        from './components/DsFormStep.vue';
export { default as DsEngagementScore } from './components/DsEngagementScore.vue';
export { default as DsSkeletonRow }     from './components/DsSkeletonRow.vue';

// ─── Fase 4 — Componentes novos (extraídos dos frontends) ─
export { default as DsAvatar }          from './components/DsAvatar.vue';
export { default as DsProgressTable }   from './components/DsProgressTable.vue';
export { default as DsAutocomplete }    from './components/DsAutocomplete.vue';
export { default as DsStatusFeedback }  from './components/DsStatusFeedback.vue';
export { default as DsSecurityBadge }   from './components/DsSecurityBadge.vue';
export { default as DsSection }         from './components/DsSection.vue';
export { default as DsSectionBadge }    from './components/DsSectionBadge.vue';
export { default as DsCouponInput }     from './components/DsCouponInput.vue';
export { default as DsFormCollapsible } from './components/DsFormCollapsible.vue';
export { default as DsRecaptcha }       from './components/DsRecaptcha.vue';
export { default as DsAddressForm }     from './components/DsAddressForm.vue';

// ─── Composables ─────────────────────────────────────────
export {
  useScreenSize,
  useFeedbackToast,
  useGenericTable,
  useFormErrors,
  useCrudEditMode,
  useDelete,
  useLocationData,
} from './composables';

export type {
  ToastAdapter,
  PaginatedResponse,
  TableOptions,
  ApiFormErrors,
  CrudEditModeOptions,
  BrazilianState,
  BrazilianCity,
} from './composables';

// ─── Utils ───────────────────────────────────────────────
export {
  toISODate,
  formatDateBR,
  formatDateTimeBR,
  formatDateTimeSecondsBR,
  toBrasiliaTime,
  relativeDate,
  formatSecondsToTime,
  formatDuration,
  formatMillisToTime,
  cleanValue,
  formatCurrency,
  formatPercent,
  formatThousand,
  formatUnitPrice,
  formatCompact,
  formatCPF,
  formatCNPJ,
  formatCPFCNPJ,
  unmaskCPFCNPJ,
  isValidCPF,
  isValidCNPJ,
  isValidCPFCNPJ,
  isValidEmail,
  isValidPhone,
  isValidCEP,
  formatCEP,
  formatPhone,
  isRequired,
  minLength,
  maxLength,
} from './utils';

// ─── Tipos ────────────────────────────────────────────────
export type {
    Channel,
    ChannelStatus,
    KpiItem,
    KpiTrend,
    KpiBadge,
    TimelineEvent,
    TimelineSeverity
} from './types';
