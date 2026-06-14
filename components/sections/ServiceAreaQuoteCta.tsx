import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { COMPANY, type ServiceArea } from '@/lib/site-data'

interface ServiceAreaQuoteCtaProps {
  area: ServiceArea
}

export function ServiceAreaQuoteCta({ area }: ServiceAreaQuoteCtaProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground sm:p-12 lg:p-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-gold-foreground">
              Free quote · No obligation
            </span>
            <h2 className="mt-5 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              Ready for a cleaner yard in {area.city}?
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              Request your free quote and a local team member will follow up with
              scheduling options and a clear estimate for your property.
            </p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                size="lg"
                nativeButton={false}
                className="h-12 bg-gold px-6 text-base text-gold-foreground hover:bg-gold/90"
                render={
                  <Link href={ROUTES.requestQuote}>
                    Get a Quote in {area.city}
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                className="h-12 border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={
                  <a href={COMPANY.phoneHref}>
                    <Phone className="size-4" />
                    Call {COMPANY.phone}
                  </a>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
