export function formatAdminDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatPhoneForTel(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')

  if (digits.length < 10) {
    return null
  }

  if (digits.length === 10) {
    return `+1${digits}`
  }

  return `+${digits}`
}

export function isProvidedContactValue(value: string): boolean {
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 && normalized !== 'not provided'
}
