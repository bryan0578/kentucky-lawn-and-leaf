export const QUOTE_STATUSES = [
  'new',
  'contacted',
  'quoted',
  'scheduled',
  'completed',
  'lost',
] as const

export type QuoteStatus = (typeof QUOTE_STATUSES)[number]

export const QUOTE_STATUS_FILTERS = ['all', ...QUOTE_STATUSES] as const

export type QuoteStatusFilter = (typeof QUOTE_STATUS_FILTERS)[number]

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  scheduled: 'Scheduled',
  completed: 'Completed',
  lost: 'Lost',
}

export function isQuoteStatus(value: string): value is QuoteStatus {
  return QUOTE_STATUSES.includes(value as QuoteStatus)
}

export function isQuoteStatusFilter(value: string): value is QuoteStatusFilter {
  return QUOTE_STATUS_FILTERS.includes(value as QuoteStatusFilter)
}

export function parseQuoteStatusFilter(
  value: string | undefined,
): QuoteStatusFilter {
  if (value && isQuoteStatusFilter(value)) {
    return value
  }

  return 'all'
}
