/**
 * Validadores genéricos pt-BR para formulários.
 */

/** Valida e-mail */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Valida telefone brasileiro (10-11 dígitos) */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 11
}

/** Valida CEP (8 dígitos) */
export function isValidCEP(cep: string): boolean {
  return /^\d{8}$/.test(cep.replace(/\D/g, ''))
}

/** Formata CEP: 12345-678 */
export function formatCEP(cep: string): string {
  const digits = cep.replace(/\D/g, '').slice(0, 8)
  return digits.replace(/(\d{5})(\d{3})/, '$1-$2')
}

/** Formata telefone: (11) 99999-9999 ou (11) 9999-9999 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

/** Verifica campo obrigatório (não vazio) */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/** Verifica comprimento mínimo */
export function minLength(value: string, min: number): boolean {
  return value.length >= min
}

/** Verifica comprimento máximo */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max
}
