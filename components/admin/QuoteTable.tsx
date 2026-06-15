import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { QuoteStatusBadge } from '@/components/admin/QuoteStatusBadge'
import { formatAdminDate } from '@/lib/admin/format'
import type { QuoteRequestRecord } from '@/lib/supabase/server'

interface QuoteTableProps {
  quotes: QuoteRequestRecord[]
}

export function QuoteTable({ quotes }: QuoteTableProps) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <p className="font-medium text-foreground">No quote requests found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different status filter or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Service
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Contact
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Location
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Received
              </th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-foreground">
                  {quote.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {quote.service_needed}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {quote.preferred_contact_method}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{quote.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{quote.email}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {quote.address_or_zip}
                </td>
                <td className="px-4 py-3">
                  <QuoteStatusBadge status={quote.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatAdminDate(quote.created_at)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/quotes/${quote.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:text-gold-foreground"
                  >
                    Open
                    <ArrowRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
