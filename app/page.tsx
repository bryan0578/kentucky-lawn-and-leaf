import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { GalleryPreviewSection } from '@/components/sections/GalleryPreviewSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { SeasonalPromoSection } from '@/components/sections/SeasonalPromoSection'
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata, DEFAULT_DESCRIPTION } from '@/lib/seo'

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Lawn Care, Landscaping & Leaf Removal',
    description: DEFAULT_DESCRIPTION,
    path: ROUTES.home,
  }),
  title: {
    absolute: 'Kentucky Lawn & Leaf | Lawn Care, Landscaping & Leaf Removal',
  },
}

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <BeforeAfterSection />
      <GalleryPreviewSection />
      <HowItWorksSection />
      <SeasonalPromoSection />
      <ReviewsSection showCta={false} />
      <ServiceAreasSection />
      <FAQSection />
      <FinalCTASection />
    </SiteLayout>
  )
}
