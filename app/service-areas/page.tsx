import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Service Areas',
  description:
    'Kentucky Lawn & Leaf serves Northern Kentucky cities including Fort Thomas, Newport, Covington, Bellevue, Dayton, Alexandria, Highland Heights, and Cold Spring.',
  path: ROUTES.serviceAreas,
})

export default function ServiceAreasPage() {
  return (
    <SiteLayout>
      <ServiceAreasSection showSectionId={false} />
    </SiteLayout>
  )
}
