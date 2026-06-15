'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail, MessageSquare, Phone } from 'lucide-react'
import { QuoteStatusBadge } from '@/components/admin/QuoteStatusBadge'
import { Button } from '@/components/ui/button'
import {
  formatAdminDate,
  formatPhoneForTel,
  isProvidedContactValue,
} from '@/lib/admin/format'
import {
  QUOTE_STATUSES,
  QUOTE_STATUS_LABELS,
} from '@/lib/admin/quote-status'
import type { QuoteRequestRecord } from '@/lib/supabase/server'
import {
  updateQuoteRequestAction,
  type UpdateQuoteActionState,
} from '@/app/admin/(protected)/quotes/[id]/actions'

const initialState: UpdateQuoteActionState = { ok: false }

interface QuoteDetailPanelProps {
  quote: QuoteRequestRecord
}

function DetailField({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  )
}

export function QuoteDetailPanel({ quote }: QuoteDetailPanelProps) {
  const [state, formAction, isPending] = useActionState(
    updateQuoteRequestAction.bind(null, quote.id),
    initialState,
  )

  const telHref = formatPhoneForTel(quote.phone)
  const hasPhone = isProvidedContactValue(quote.phone) && telHref
  const hasEmail = isProvidedContactValue(quote.email)

  return (
    <div className="space-y-6">
      <Link
        href="/admin/quotes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to inbox
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {quote.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Received {formatAdminDate(quote.created_at)}
          </p>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {hasPhone && (
          <>
            <Button
              nativeButton={false}
              render={
                <a href={`tel:${telHref}`}>
                  <Phone className="size-4" />
                  Call
                </a>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href={`sms:${telHref}`}>
                  <MessageSquare className="size-4" />
                  Text
                </a>
              }
            />
          </>
        )}
        {hasEmail && (
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={`mailto:${quote.email}`}>
                <Mail className="size-4" />
                Email
              </a>
            }
          />
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Request details
        </h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <DetailField label="Service needed" value={quote.service_needed} />
          <DetailField label="Property type" value={quote.property_type} />
          <DetailField
            label="Preferred contact"
            value={quote.preferred_contact_method}
          />
          <DetailField label="Phone" value={quote.phone} />
          <DetailField label="Email" value={quote.email} />
          <DetailField label="Address / ZIP" value={quote.address_or_zip} />
          <div className="sm:col-span-2">
            <DetailField
              label="Customer message"
              value={quote.message?.trim() || '—'}
            />
          </div>
        </dl>
      </div>

      <form
        action={formAction}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Manage request
        </h3>

        {state.message && (
          <p
            className={
              state.ok
                ? 'mt-4 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary'
                : 'mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive'
            }
            role={state.ok ? 'status' : 'alert'}
          >
            {state.message}
          </p>
        )}

        <div className="mt-4 grid gap-4">
          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-foreground"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={quote.status}
              disabled={isPending}
              className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50"
            >
              {QUOTE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {QUOTE_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="internal_notes"
              className="text-sm font-medium text-foreground"
            >
              Internal notes
            </label>
            <textarea
              id="internal_notes"
              name="internal_notes"
              rows={5}
              defaultValue={quote.internal_notes ?? ''}
              disabled={isPending}
              placeholder="Add private notes for your team..."
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50"
            />
          </div>
        </div>

        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save changes'
          )}
        </Button>
      </form>
    </div>
  )
}
