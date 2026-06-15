import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServiceAreaDetailSection } from '@/components/sections/ServiceAreaDetailSection'
import { createPageMetadata } from '@/lib/seo'
import {
  getAllServiceAreaSlugs,
  getServiceAreaBySlug,
  getServiceAreaPageSeo,
  PAGE_SEO,
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
      ...PAGE_SEO.serviceAreas,
      title: 'Service Area Not Found',
      description: 'The requested service area could not be found.',
      noIndex: true,
    })
  }

  return createPageMetadata(getServiceAreaPageSeo(area))
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
