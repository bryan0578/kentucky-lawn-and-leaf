import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'
import { GALLERY_CTA, PAGE_SEO, SECTION_COPY } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.gallery)

export default function GalleryPage() {
  const copy = SECTION_COPY.gallery

  return (
    <SiteLayout>
      <BeforeAfterSection showCtas={false} />

      <section className="border-t border-border bg-secondary/40 pt-8 pb-14 lg:pt-10 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <GalleryGrid showFilters />
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-14">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-gold" />
                {GALLERY_CTA.badge}
              </span>
              <h2 className="mt-5 text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                {GALLERY_CTA.title}
              </h2>
              <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {GALLERY_CTA.description}
              </p>
              <Button
                size="lg"
                nativeButton={false}
                className="mt-7 h-12 px-6 text-base"
                render={
                  <Link href={ROUTES.requestQuote}>
                    {GALLERY_CTA.buttonLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
