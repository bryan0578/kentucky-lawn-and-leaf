import { ROUTES, serviceAreaRoute, serviceRoute } from '@/lib/constants'
import { absoluteUrl } from '@/lib/seo'
import {
  COMPANY,
  SERVICE_AREAS,
  SERVICES,
  SITE,
  type FaqItem,
  type Service,
  type ServiceArea,
} from '@/lib/site-data'

const BUSINESS_TYPE = 'LandscapingBusiness'

export type BreadcrumbItem = {
  name: string
  path: string
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': BUSINESS_TYPE,
    name: COMPANY.name,
    url: SITE.url,
    image: absoluteUrl(SITE.defaultBusinessImage),
    logo: absoluteUrl(SITE.logo),
    telephone: COMPANY.phoneHref.replace('tel:', ''),
    email: COMPANY.email,
    description: COMPANY.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY.location,
      addressRegion: 'KY',
      addressCountry: 'US',
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: area.state,
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lawn and landscape services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          url: absoluteUrl(serviceRoute(service.slug)),
          provider: {
            '@type': BUSINESS_TYPE,
            name: COMPANY.name,
            url: SITE.url,
          },
        },
      })),
    },
  }
}

export function buildServiceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: absoluteUrl(serviceRoute(service.slug)),
    image: absoluteUrl(service.image.src),
    provider: {
      '@type': BUSINESS_TYPE,
      name: COMPANY.name,
      url: SITE.url,
      telephone: COMPANY.phoneHref.replace('tel:', ''),
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: COMPANY.location,
    },
    serviceType: service.title,
  }
}

export function buildServicesIndexJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': SERVICES.map((service) => buildServiceJsonLd(service)),
  }
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildServiceBreadcrumbJsonLd(service: Service) {
  return buildBreadcrumbJsonLd([
    { name: 'Home', path: ROUTES.home },
    { name: 'Services', path: ROUTES.services },
    { name: service.title, path: serviceRoute(service.slug) },
  ])
}

export function buildServiceAreaBreadcrumbJsonLd(area: ServiceArea) {
  return buildBreadcrumbJsonLd([
    { name: 'Home', path: ROUTES.home },
    { name: 'Service Areas', path: ROUTES.serviceAreas },
    {
      name: `${area.city}, ${area.state}`,
      path: serviceAreaRoute(area.slug),
    },
  ])
}

export function buildServiceAreaJsonLd(area: ServiceArea) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Lawn care and landscaping in ${area.city}, ${area.state}`,
    description: area.shortDescription,
    url: absoluteUrl(serviceAreaRoute(area.slug)),
    provider: {
      '@type': BUSINESS_TYPE,
      name: COMPANY.name,
      url: SITE.url,
    },
    areaServed: {
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: area.state,
      },
    },
  }
}
