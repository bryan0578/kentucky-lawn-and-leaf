import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { ServiceQuoteCta } from '@/components/sections/ServiceQuoteCta'
import { JsonLd } from '@/components/seo/JsonLd'
import { ROUTES } from '@/lib/constants'
import { buildServiceJsonLd } from '@/lib/structured-data'
import { type Service } from '@/lib/site-data'

interface ServiceDetailSectionProps {
  service: Service
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.services}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold-foreground"
          >
            <ArrowLeft className="size-4" />
            All services
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary">
                <service.icon className="size-3.5" />
                {service.title}
              </span>
              <h1 className="mt-5 text-pretty font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/5">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                Why homeowners choose us
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {service.includedItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-border pb-3 text-muted-foreground last:border-0 last:pb-0"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceQuoteCta service={service} />
    </>
  )
}
