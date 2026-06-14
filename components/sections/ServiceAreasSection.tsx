import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { ROUTES, SECTION_IDS, SECTION_PADDING, serviceAreaRoute } from '@/lib/constants'
import { SECTION_COPY, SERVICE_AREAS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface ServiceAreasSectionProps {
  showSectionId?: boolean
}

export function ServiceAreasSection({
  showSectionId = true,
}: ServiceAreasSectionProps) {
  const copy = SECTION_COPY.serviceAreas

  return (
    <section
      {...(showSectionId ? { id: SECTION_IDS.areas } : {})}
      className={cn('scroll-mt-20', SECTION_PADDING)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
            <Button
              size="lg"
              nativeButton={false}
              className="mt-7 h-12 px-6 text-base"
              render={
                <Link href={ROUTES.requestQuote}>Check your address</Link>
              }
            />
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={serviceAreaRoute(area.slug)}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-gold" />
                    <span className="font-semibold text-foreground group-hover:text-primary">
                      {area.city}, {area.state}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.shortDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
