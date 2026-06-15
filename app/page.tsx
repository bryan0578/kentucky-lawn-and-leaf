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
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { createPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.home)

export default function HomePage() {
  return (
    <SiteLayout>
      <LocalBusinessSchema />
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
