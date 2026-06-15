import Link from 'next/link'
import { ArrowRight, Inbox } from 'lucide-react'
import { QuoteStatusBadge } from '@/components/admin/QuoteStatusBadge'
import { Button } from '@/components/ui/button'
import { formatAdminDate } from '@/lib/admin/format'
import {
  countQuoteRequestsByStatus,
  listQuoteRequests,
} from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const [newCount, recentQuotes] = await Promise.all([
    countQuoteRequestsByStatus('new'),
    listQuoteRequests('new'),
  ])

  const latestQuotes = recentQuotes.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of incoming quote requests for Kentucky Lawn & Leaf.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">New requests</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-foreground">
            {newCount}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Quote inbox
              </p>
              <p className="mt-1 text-sm text-foreground">
                Review, update status, and add internal notes.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={
                <Link href="/admin/quotes">
                  <Inbox className="size-4" />
                  Open inbox
                </Link>
              }
            />
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Latest new requests
          </h3>
          <Link
            href="/admin/quotes?status=new"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold-foreground"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {latestQuotes.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
            No new quote requests right now.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {latestQuotes.map((quote) => (
              <li key={quote.id}>
                <Link
                  href={`/admin/quotes/${quote.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-secondary/30"
                >
                  <div>
                    <p className="font-medium text-foreground">{quote.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {quote.service_needed} · {formatAdminDate(quote.created_at)}
                    </p>
                  </div>
                  <QuoteStatusBadge status={quote.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
