import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { ROUTES, SECTION_IDS } from '@/lib/constants'
import {
  FEATURED_GALLERY_IDS,
  GALLERY_ITEMS,
  GALLERY_PREVIEW,
  SECTION_COPY,
} from '@/lib/site-data'

const featuredItems = FEATURED_GALLERY_IDS.map(
  (id) => GALLERY_ITEMS.find((item) => item.id === id)!,
).filter(Boolean)

export function GalleryPreviewSection() {
  const copy = SECTION_COPY.gallery

  return (
    <section
      id={SECTION_IDS.gallery}
      className="scroll-mt-20 border-y border-border bg-secondary/40 pt-6 pb-14 lg:pt-8 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <GalleryGrid items={featuredItems} limit={3} gridClassName="mt-10" />

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 px-6 text-base"
            render={
              <Link href={ROUTES.gallery}>
                {GALLERY_PREVIEW.buttonLabel}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      </div>
    </section>
  )
}
