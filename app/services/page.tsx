import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ServicesIndexSchema } from '@/components/seo/ServicesIndexSchema'
import { ROUTES } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Services',
  description:
    'Lawn care, landscaping, leaf removal, seasonal cleanup, mulch installation, and trimming and edging across Northern Kentucky.',
  path: ROUTES.services,
})

export default function ServicesPage() {
  return (
    <SiteLayout>
      <ServicesIndexSchema />
      <ServicesSection showSectionId={false} />
    </SiteLayout>
  )
}
