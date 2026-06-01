/**
 * Utilitários de formatação de tempo.
 * Extraído de nexus-frontend.
 */

/** Converte segundos para HH:MM:SS */
export function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/** Converte segundos para formato legível: "2h 30min", "45min", "30s" */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min`
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

/** Formata milissegundos para tempo legível */
export function formatMillisToTime(millis: number): string {
  return formatSecondsToTime(millis / 1000)
}
