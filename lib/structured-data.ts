import { serviceAreaRoute, serviceRoute } from '@/lib/constants'
import { absoluteUrl, SITE_URL } from '@/lib/seo'
import {
  COMPANY,
  SERVICE_AREAS,
  SERVICES,
  type FaqItem,
  type Service,
} from '@/lib/site-data'

const BUSINESS_TYPE = 'LandscapingBusiness'

const SERVICE_NAMES = [
  'Lawn care',
  'Landscaping',
  'Leaf removal',
  'Seasonal cleanup',
  'Mulch installation',
  'Trimming and edging',
]

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': BUSINESS_TYPE,
    name: COMPANY.name,
    url: SITE_URL,
    image: absoluteUrl('/hero-lawn.png'),
    logo: absoluteUrl('/KLL_Header_Logo.png'),
    telephone: COMPANY.phoneHref.replace('tel:', ''),
    email: COMPANY.email,
    description: COMPANY.tagline,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Northern Kentucky',
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
      itemListElement: SERVICE_NAMES.map((name, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name,
          provider: {
            '@type': BUSINESS_TYPE,
            name: COMPANY.name,
            url: SITE_URL,
          },
        },
      })),
    },
    sameAs: [],
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
      url: SITE_URL,
      telephone: COMPANY.phoneHref.replace('tel:', ''),
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Northern Kentucky',
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

export function buildServiceAreaJsonLd(
  slug: string,
  city: string,
  state: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Lawn care and landscaping in ${city}, ${state}`,
    description,
    url: absoluteUrl(serviceAreaRoute(slug)),
    provider: {
      '@type': BUSINESS_TYPE,
      name: COMPANY.name,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: state,
      },
    },
  }
}
