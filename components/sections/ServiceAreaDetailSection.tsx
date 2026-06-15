import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { FAQSection } from '@/components/sections/FAQSection'
import { ServiceAreaQuoteCta } from '@/components/sections/ServiceAreaQuoteCta'
import { JsonLd } from '@/components/seo/JsonLd'
import { ROUTES, serviceRoute } from '@/lib/constants'
import {
  buildServiceAreaBreadcrumbJsonLd,
  buildServiceAreaJsonLd,
} from '@/lib/structured-data'
import {
  getServiceAreaFaqs,
  LOCAL_TRUST_COPY,
  SERVICES,
  TRUST_ITEMS,
  type ServiceArea,
} from '@/lib/site-data'

interface ServiceAreaDetailSectionProps {
  area: ServiceArea
}

export function ServiceAreaDetailSection({
  area,
}: ServiceAreaDetailSectionProps) {
  const faqs = getServiceAreaFaqs(area)

  return (
    <>
      <JsonLd data={buildServiceAreaJsonLd(area)} />
      <JsonLd data={buildServiceAreaBreadcrumbJsonLd(area)} />
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.serviceAreas}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold-foreground"
          >
            <ArrowLeft className="size-4" />
            All service areas
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary">
              <MapPin className="size-3.5" />
              {area.city}, {area.state}
            </span>
            <h1 className="mt-5 text-pretty font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Lawn care & landscaping in {area.city}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {area.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-foreground">
              <span className="size-1.5 rounded-full bg-gold" />
              Services offered
            </span>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Full-service care in {area.city}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              One trusted local crew for mowing, landscaping, seasonal cleanup,
              and more throughout {area.city}.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={serviceRoute(service.slug)}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-gold-foreground">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-foreground">
                <span className="size-1.5 rounded-full bg-gold" />
                {LOCAL_TRUST_COPY.eyebrow}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Trusted by {area.city} homeowners
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {LOCAL_TRUST_COPY.description}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ServiceAreaQuoteCta area={area} />

      <FAQSection
        showSectionId={false}
        faqs={faqs}
        eyebrow="Good to know"
        title={`Frequently asked questions in ${area.city}`}
        description={`Common questions from ${area.city} homeowners about quotes, scheduling, and services.`}
      />
    </>
  )
}
