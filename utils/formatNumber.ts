/**
 * Utilitários de formatação numérica pt-BR.
 * Extraído de billing-frontend FormatNumber.ts.
 */

/** Limpa valor string/number para number */
export function cleanValue(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === '') return 0
  const str = value.toString().trim()
  const cleaned = str.replace(/[^\d.,-]/g, '')
  const normalized = cleaned.replace(/,(\d{2})$/, '.$1')
  const parsed = parseFloat(normalized.replace(/\.(?=.*\.)/g, '').replace(',', '.'))
  return isNaN(parsed) ? 0 : parsed
}

/** Formata valor como moeda BRL: R$ 1.234,56 */
export function formatCurrency(value: number | string | null, decimals: number = 2): string {
  const cleaned = cleanValue(value)
  return cleaned.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Formata como porcentagem: 85,50% */
export function formatPercent(value: number | string | null, decimals: number = 2): string {
  const cleaned = cleanValue(value)
  return (cleaned / 100).toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Formata com separador de milhares: 1.234.567 */
export function formatThousand(value: number | string | null): string {
  const cleaned = cleanValue(value)
  return cleaned.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  })
}

/** Formata preço unitário (6 casas decimais) */
export function formatUnitPrice(value: number | string | null): string {
  return formatCurrency(value, 6)
}

/** Abrevia números grandes: 1.5K, 2.3M, etc. */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return String(value)
}
