import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { BEFORE_AFTER, SECTION_COPY } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface BeforeAfterSectionProps {
  showCtas?: boolean
}

export function BeforeAfterSection({ showCtas = true }: BeforeAfterSectionProps) {
  const copy = SECTION_COPY.beforeAfter

  return (
    <section
      id="before-after"
      className={cn(
        'scroll-mt-20 pt-14 lg:pt-20',
        showCtas ? 'pb-6 lg:pb-8' : 'pb-8 lg:pb-10',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mx-auto mt-10 w-full max-w-[980px]">
          <BeforeAfterSlider
            before={BEFORE_AFTER.before}
            after={BEFORE_AFTER.after}
          />
        </div>

        {showCtas && (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 px-6 text-base"
              render={
                <Link href={ROUTES.requestQuote}>
                  {BEFORE_AFTER.ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="h-12 px-6 text-base"
              render={
                <Link href={ROUTES.gallery}>View Full Gallery</Link>
              }
            />
          </div>
        )}
      </div>
    </section>
  )
}
