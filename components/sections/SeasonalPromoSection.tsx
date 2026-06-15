import Image from 'next/image'
import Link from 'next/link'
import { Phone, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES, SECTION_PADDING } from '@/lib/constants'
import { COMPANY, SEASONAL_PROMO } from '@/lib/site-data'

export function SeasonalPromoSection() {
  return (
    <section className={SECTION_PADDING}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-gold-foreground">
                <Leaf className="size-3.5" />
                {SEASONAL_PROMO.badge}
              </span>
              <h2 className="mt-5 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                {SEASONAL_PROMO.title}
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
                {SEASONAL_PROMO.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  nativeButton={false}
                  className="h-12 bg-gold px-6 text-base text-gold-foreground hover:bg-gold/90"
                  render={
                    <Link href={ROUTES.requestQuote}>
                      {SEASONAL_PROMO.primaryCta}
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
                      {SEASONAL_PROMO.secondaryCta}
                    </a>
                  }
                />
              </div>
            </div>

            <div className="relative h-64 w-full lg:h-full lg:min-h-[22rem]">
              <Image
                src={SEASONAL_PROMO.image.src}
                alt={SEASONAL_PROMO.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
