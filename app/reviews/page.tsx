import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { createPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.reviews)

export default function ReviewsPage() {
  return (
    <SiteLayout>
      <ReviewsSection showSectionId={false} />
    </SiteLayout>
  )
}
