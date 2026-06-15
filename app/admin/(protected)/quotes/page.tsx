import { QuoteFilters } from '@/components/admin/QuoteFilters'
import { QuoteTable } from '@/components/admin/QuoteTable'
import { parseQuoteStatusFilter } from '@/lib/admin/quote-status'
import { listQuoteRequests } from '@/lib/supabase/server'

type QuotesPageProps = {
  searchParams: Promise<{ status?: string }>
}

export default async function AdminQuotesPage({ searchParams }: QuotesPageProps) {
  const params = await searchParams
  const statusFilter = parseQuoteStatusFilter(params.status)
  const quotes = await listQuoteRequests(statusFilter)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Quote inbox
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {quotes.length} request{quotes.length === 1 ? '' : 's'}
          {statusFilter !== 'all' ? ` · ${statusFilter}` : ''}
        </p>
      </div>

      <QuoteFilters activeFilter={statusFilter} />
      <QuoteTable quotes={quotes} />
    </div>
  )
}
