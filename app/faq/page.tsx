import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { FAQSection } from '@/components/sections/FAQSection'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Answers to common questions about quotes, lawn care plans, service areas, leaf removal, and scheduling with Kentucky Lawn & Leaf.',
  path: ROUTES.faq,
})

export default function FaqPage() {
  return (
    <SiteLayout>
      <FAQSection showSectionId={false} />
    </SiteLayout>
  )
}
