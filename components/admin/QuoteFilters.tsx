import Link from 'next/link'
import {
  QUOTE_STATUS_FILTERS,
  QUOTE_STATUS_LABELS,
  type QuoteStatusFilter,
} from '@/lib/admin/quote-status'
import { cn } from '@/lib/utils'

interface QuoteFiltersProps {
  activeFilter: QuoteStatusFilter
}

export function QuoteFilters({ activeFilter }: QuoteFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUOTE_STATUS_FILTERS.map((filter) => {
        const label =
          filter === 'all' ? 'All' : QUOTE_STATUS_LABELS[filter]
        const isActive = activeFilter === filter

        return (
          <Link
            key={filter}
            href={filter === 'all' ? '/admin/quotes' : `/admin/quotes?status=${filter}`}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
