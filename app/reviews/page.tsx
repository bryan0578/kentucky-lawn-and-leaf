import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Reviews',
  description:
    'Read reviews from Northern Kentucky homeowners about lawn care, landscaping, and seasonal yard services from Kentucky Lawn & Leaf.',
  path: ROUTES.reviews,
})

export default function ReviewsPage() {
  return (
    <SiteLayout>
      <ReviewsSection showSectionId={false} />
    </SiteLayout>
  )
}
