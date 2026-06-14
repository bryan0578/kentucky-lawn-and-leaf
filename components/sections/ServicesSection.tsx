import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ROUTES, SECTION_IDS, SECTION_PADDING, serviceRoute } from '@/lib/constants'
import { SECTION_COPY, SERVICES } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface ServicesSectionProps {
  showSectionId?: boolean
}

export function ServicesSection({
  showSectionId = true,
}: ServicesSectionProps) {
  const copy = SECTION_COPY.services
  const quoteHref = showSectionId
    ? `${ROUTES.home}#${SECTION_IDS.quote}`
    : ROUTES.requestQuote

  return (
    <section
      {...(showSectionId ? { id: SECTION_IDS.services } : {})}
      className={cn('scroll-mt-20', SECTION_PADDING)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                <Link
                  href={serviceRoute(service.slug)}
                  className="transition-colors hover:text-primary"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                {service.shortDescription}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href={serviceRoute(service.slug)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold-foreground"
                >
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={quoteHref}
                  className="inline-flex w-fit items-center rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get a quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
