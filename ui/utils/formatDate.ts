/**
 * Utilitários de formatação de data pt-BR.
 * Extraído de nexus-frontend, sem dependência de date-fns.
 */

/** Formata Date para string ISO (YYYY-MM-DD) */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Formata Date para dd/MM/yyyy */
export function formatDateBR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/** Formata Date para dd/MM/yyyy HH:mm */
export function formatDateTimeBR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const datePart = formatDateBR(d)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${datePart} ${hours}:${minutes}`
}

/** Formata Date para dd/MM/yyyy HH:mm:ss */
export function formatDateTimeSecondsBR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const dateTimePart = formatDateTimeBR(d)
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${dateTimePart}:${seconds}`
}

/** Converte ISO 8601 ou string US para horário de Brasília (UTC-3) */
export function toBrasiliaTime(dateString: string): string {
  if (!dateString) return ''
  try {
    const hasTimezone = /[+-]\d{2}:\d{2}$/.test(dateString) || /Z$/.test(dateString)
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString

    if (hasTimezone) {
      // Já tem timezone — converter para Brasília (UTC-3)
      const brasilia = new Date(d.getTime() + (-3 * 60 * 60 * 1000) - (d.getTimezoneOffset() * 60 * 1000))
      return formatDateTimeBR(brasilia)
    }

    return formatDateTimeBR(d)
  } catch {
    return dateString
  }
}

/** Retorna string relativa: "Hoje", "Ontem", "Há X dias", etc. */
export function relativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return 'Hoje'
  if (diffDays === 1) return 'Ontem'
  if (diffDays < 7) return `Há ${diffDays} dias`
  if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} meses`
  return `Há ${Math.floor(diffDays / 365)} anos`
}
