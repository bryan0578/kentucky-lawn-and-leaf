import { Phone, CheckCircle2 } from 'lucide-react'
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm'
import { SECTION_IDS, SECTION_PADDING } from '@/lib/constants'
import { COMPANY, QUOTE_BENEFITS, SECTION_COPY } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function FinalCTASection() {
  const copy = SECTION_COPY.finalCta

  return (
    <section
      id={SECTION_IDS.quote}
      className={cn('scroll-mt-20', SECTION_PADDING)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-gold" />
              {copy.badge}
            </span>
            <h2 className="mt-5 text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              {copy.description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {QUOTE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
            <a
              href={COMPANY.phoneHref}
              className="mt-7 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-gold-foreground"
            >
              <Phone className="size-5" />
              {COMPANY.phone}
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
            <QuoteRequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
