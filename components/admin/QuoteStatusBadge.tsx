import {
  QUOTE_STATUS_LABELS,
  type QuoteStatus,
} from '@/lib/admin/quote-status'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<QuoteStatus, string> = {
  new: 'bg-primary/10 text-primary ring-primary/20',
  contacted: 'bg-gold/15 text-gold-foreground ring-gold/25',
  quoted: 'bg-secondary text-secondary-foreground ring-border',
  scheduled: 'bg-accent text-accent-foreground ring-border',
  completed: 'bg-primary/15 text-primary ring-primary/20',
  lost: 'bg-muted text-muted-foreground ring-border',
}

interface QuoteStatusBadgeProps {
  status: QuoteStatus
  className?: string
}

export function QuoteStatusBadge({ status, className }: QuoteStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        STATUS_STYLES[status],
        className,
      )}
    >
      {QUOTE_STATUS_LABELS[status]}
    </span>
  )
}
