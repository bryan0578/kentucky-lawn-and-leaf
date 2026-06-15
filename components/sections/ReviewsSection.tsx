import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { ROUTES, SECTION_IDS, SECTION_PADDING } from '@/lib/constants'
import {
  REVIEW_PLACEHOLDERS,
  REVIEWS_CTA,
  SECTION_COPY,
  type ReviewPlaceholder,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface ReviewsSectionProps {
  showSectionId?: boolean
  showCta?: boolean
}

function ReviewPlaceholderCard({ item }: { item: ReviewPlaceholder }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <Sparkles className="size-8 shrink-0 text-gold" aria-hidden />
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          {item.service}
        </span>
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
        {item.title}
      </h3>

      <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <p className="mt-6 border-t border-border pt-5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        What to expect
      </p>
    </article>
  )
}

export function ReviewsSection({
  showSectionId = true,
  showCta = true,
}: ReviewsSectionProps) {
  const copy = SECTION_COPY.reviews

  return (
    <>
      <section
        {...(showSectionId ? { id: SECTION_IDS.reviews } : {})}
        className={cn(
          'scroll-mt-20 border-y border-border bg-secondary/40',
          SECTION_PADDING,
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {REVIEW_PLACEHOLDERS.map((item) => (
              <ReviewPlaceholderCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {showCta && (
        <section className={SECTION_PADDING}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground sm:p-12 lg:p-14">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-gold-foreground">
                  {REVIEWS_CTA.badge}
                </span>
                <h2 className="mt-5 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                  {REVIEWS_CTA.title}
                </h2>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
                  {REVIEWS_CTA.description}
                </p>
                <Button
                  size="lg"
                  nativeButton={false}
                  className="mt-7 h-12 bg-gold px-6 text-base text-gold-foreground hover:bg-gold/90"
                  render={
                    <Link href={ROUTES.requestQuote}>
                      {REVIEWS_CTA.buttonLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
