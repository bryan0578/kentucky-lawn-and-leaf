import { SectionHeading } from '@/components/section-heading'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { SECTION_IDS, SECTION_PADDING } from '@/lib/constants'
import { buildFaqJsonLd } from '@/lib/structured-data'
import { FAQS, SECTION_COPY, type FaqItem } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface FAQSectionProps {
  showSectionId?: boolean
  faqs?: FaqItem[]
  eyebrow?: string
  title?: string
  description?: string
}

export function FAQSection({
  showSectionId = true,
  faqs = FAQS,
  eyebrow = SECTION_COPY.faq.eyebrow,
  title = SECTION_COPY.faq.title,
  description = SECTION_COPY.faq.description,
}: FAQSectionProps) {
  return (
    <section
      {...(showSectionId ? { id: SECTION_IDS.faq } : {})}
      className={cn(
        'scroll-mt-20 border-t border-border bg-secondary/40',
        SECTION_PADDING,
      )}
    >
      <JsonLd data={buildFaqJsonLd(faqs)} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Accordion className="mt-10 rounded-2xl border border-border bg-card px-5 sm:px-7">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
