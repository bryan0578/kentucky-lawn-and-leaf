import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS, SECTION_PADDING } from '@/lib/constants'
import { SECTION_COPY, STEPS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function HowItWorksSection() {
  const copy = SECTION_COPY.howItWorks

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className={cn('scroll-mt-20', SECTION_PADDING)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary font-heading text-lg font-semibold text-primary-foreground">
                    {step.step}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent md:block" />
                  )}
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
