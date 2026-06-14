export const ROUTES = {
  home: '/',
  services: '/services',
  gallery: '/gallery',
  reviews: '/reviews',
  serviceAreas: '/service-areas',
  faq: '/faq',
  requestQuote: '/request-quote',
} as const

export function serviceRoute(slug: string): string {
  return `/services/${slug}`
}

export function serviceAreaRoute(slug: string): string {
  return `/service-areas/${slug}`
}

export type NavLink = {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: ROUTES.services },
  { label: 'Gallery', href: ROUTES.gallery },
  { label: 'How It Works', href: `${ROUTES.home}#how-it-works` },
  { label: 'Reviews', href: ROUTES.reviews },
  { label: 'Service Areas', href: ROUTES.serviceAreas },
  { label: 'FAQ', href: ROUTES.faq },
]

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: 'Our Work', href: ROUTES.gallery },
  { label: 'Reviews', href: ROUTES.reviews },
  { label: 'Service Areas', href: ROUTES.serviceAreas },
  { label: 'FAQ', href: ROUTES.faq },
]

/** Standard vertical spacing for marketing sections */
export const SECTION_PADDING = 'py-14 lg:py-20'

export const SECTION_IDS = {
  top: 'top',
  services: 'services',
  gallery: 'gallery',
  howItWorks: 'how-it-works',
  reviews: 'reviews',
  areas: 'areas',
  faq: 'faq',
  quote: 'quote',
} as const
