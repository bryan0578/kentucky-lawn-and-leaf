import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ServiceDetailSection } from '@/components/sections/ServiceDetailSection'
import { ROUTES, serviceRoute } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/site-data'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return createPageMetadata({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      path: ROUTES.services,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: serviceRoute(slug),
    ogImage: service.image.src,
    ogImageAlt: service.image.alt,
  })
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <SiteLayout>
      <ServiceDetailSection service={service} />
    </SiteLayout>
  )
}
