import Link from 'next/link'
import { FileText, MessageCircle, Phone } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { COMPANY } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const buttonBaseClass =
  'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-2.5 text-center text-xs font-semibold transition-colors active:scale-[0.98]'

export function MobileStickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-7xl items-stretch gap-1.5 px-3 py-2">
        <a
          href={COMPANY.phoneHref}
          className={cn(
            buttonBaseClass,
            'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <Phone className="size-4" />
          Call Now
        </a>
        <a
          href={COMPANY.smsHref}
          className={cn(
            buttonBaseClass,
            'border border-primary/25 bg-background text-primary hover:bg-secondary',
          )}
        >
          <MessageCircle className="size-4" />
          Text Us
        </a>
        <Link
          href={ROUTES.requestQuote}
          className={cn(
            buttonBaseClass,
            'bg-gold text-gold-foreground hover:bg-gold/90',
          )}
        >
          <FileText className="size-4" />
          Get Quote
        </Link>
      </div>
    </div>
  )
}

/** Reserves space so the fixed mobile CTA bar does not cover page content. */
export function MobileCtaSpacer() {
  return (
    <div
      aria-hidden="true"
      className="h-[calc(4.5rem+env(safe-area-inset-bottom,0px))] shrink-0 md:hidden"
    />
  )
}
