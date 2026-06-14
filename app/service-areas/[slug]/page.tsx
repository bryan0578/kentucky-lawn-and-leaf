import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServiceAreaDetailSection } from '@/components/sections/ServiceAreaDetailSection'
import { serviceAreaRoute } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'
import {
  getAllServiceAreaSlugs,
  getServiceAreaBySlug,
} from '@/lib/site-data'

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return createPageMetadata({
      title: 'Service Area Not Found',
      description: 'The requested service area could not be found.',
      path: '/service-areas',
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: `${area.city}, ${area.state} Lawn Care`,
    description: area.shortDescription,
    path: serviceAreaRoute(slug),
  })
}

export default async function ServiceAreaDetailPage({
  params,
}: ServiceAreaPageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  return (
    <SiteLayout>
      <ServiceAreaDetailSection area={area} />
    </SiteLayout>
  )
}
