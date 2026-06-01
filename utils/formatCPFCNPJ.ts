/**
 * Formatação e validação de CPF/CNPJ.
 * Extraído de billing-frontend.
 */

/** Formata CPF: 123.456.789-00 */
export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/** Formata CNPJ: 12.345.678/0001-90 */
export function formatCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

/** Detecta e formata CPF ou CNPJ automaticamente */
export function formatCPFCNPJ(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const digits = value.toString().replace(/\D/g, '')
  if (digits.length <= 11) return formatCPF(digits)
  return formatCNPJ(digits)
}

/** Remove máscara de CPF/CNPJ */
export function unmaskCPFCNPJ(value: string): string {
  return value.replace(/\D/g, '')
}

/** Valida CPF (algoritmo mod 11) */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
  let remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== parseInt(digits[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  return remainder === parseInt(digits[10])
}

/** Valida CNPJ (algoritmo mod 11) */
export function isValidCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return false
  if (/^(\d)\1{13}$/.test(digits)) return false

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 12; i++) sum += parseInt(digits[i]) * weights1[i]
  let remainder = sum % 11
  const first = remainder < 2 ? 0 : 11 - remainder
  if (first !== parseInt(digits[12])) return false

  sum = 0
  for (let i = 0; i < 13; i++) sum += parseInt(digits[i]) * weights2[i]
  remainder = sum % 11
  const second = remainder < 2 ? 0 : 11 - remainder
  return second === parseInt(digits[13])
}

/** Valida CPF ou CNPJ automaticamente */
export function isValidCPFCNPJ(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) return isValidCPF(digits)
  return isValidCNPJ(digits)
}
