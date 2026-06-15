import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ServicesIndexSchema } from '@/components/seo/ServicesIndexSchema'
import { createPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.services)

export default function ServicesPage() {
  return (
    <SiteLayout>
      <ServicesIndexSchema />
      <ServicesSection showSectionId={false} />
    </SiteLayout>
  )
}
