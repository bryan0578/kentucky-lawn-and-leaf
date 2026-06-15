import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection'
import { createPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/site-data'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.serviceAreas)

export default function ServiceAreasPage() {
  return (
    <SiteLayout>
      <ServiceAreasSection showSectionId={false} />
    </SiteLayout>
  )
}
