import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { FAQSection } from '@/components/sections/FAQSection'
import { createPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.faq)

export default function FaqPage() {
  return (
    <SiteLayout>
      <FAQSection showSectionId={false} />
    </SiteLayout>
  )
}
