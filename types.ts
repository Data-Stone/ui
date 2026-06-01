/**
 * Tipos públicos do @data-stone/ui.
 * Re-exportados pelos componentes via index.ts.
 */

// ─── DsChannelList ────────────────────────────────────────
export type ChannelStatus = 'online' | 'busy' | 'idle' | 'error';

export interface Channel {
    id: string;
    name: string;
    status?: ChannelStatus;
    count?: number | string;
    /** Nome de ícone Nuxt UI (i-lucide-*) ou string com SVG inline. */
    icon?: string;
    disabled?: boolean;
}

// ─── DsKpiCard / DsKpiGrid ────────────────────────────────
export interface KpiTrend {
    value: string;
    isPositive: boolean;
    label?: string;
}

export interface KpiBadge {
    text: string;
    color?: 'green' | 'red' | 'blue' | 'primary';
}

export interface KpiItem {
    id?: string;
    title: string;
    value: string | number;
    icon?: string;
    tooltipText?: string;
    subtitle?: string;
    loading?: boolean;
    badge?: KpiBadge;
    trend?: KpiTrend;
    highlight?: boolean;
    live?: boolean;
}

// ─── DsTimeline ───────────────────────────────────────────
export type TimelineSeverity =
    | 'neutral'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'brand';

export interface TimelineEvent {
    id: string | number;
    time: string;
    text: string;
    category?: string;
    severity?: TimelineSeverity;
}
