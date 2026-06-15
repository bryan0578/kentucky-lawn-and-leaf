import {
  Scissors,
  Leaf,
  Trees,
  Sprout,
  Layers,
  Ruler,
  Home,
  FileText,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react'

export const COMPANY = {
  name: 'Kentucky Lawn & Leaf',
  shortName: 'KLL',
  phone: '(859) 555-0147',
  phoneHref: 'tel:+18595550147',
  smsHref: 'sms:+18595550147',
  email: 'hello@kylawnandleaf.com',
  location: 'Northern Kentucky',
  tagline:
    'Premium lawn care, leaf removal, and landscaping for Northern Kentucky homes — delivered by a friendly local crew you can count on.',
}

export const FOOTER = {
  legalLine: 'Locally owned · Serving Northern Kentucky',
  contactNote:
    'Free quotes for lawn care, landscaping, leaf removal, mulch installation, and seasonal cleanup.',
}

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kylawnandleaf.com',
  locale: 'en_US' as const,
  defaultDescription:
    'Premium lawn care, leaf removal, and landscaping for Northern Kentucky homes. Locally owned, reliable scheduling, and free quotes from a friendly local crew.',
  defaultTitle: 'Lawn Care, Landscaping & Leaf Removal',
  absoluteDefaultTitle: `${COMPANY.name} | Lawn Care, Landscaping & Leaf Removal`,
  titleTemplate: `%s | ${COMPANY.name}`,
  ogImage: '/KentuckyLawnAndLeafOpenGraph.png',
  ogImageFallback: '/hero-lawn.png',
  ogImageAlt: `${COMPANY.name} — lawn care and landscaping in Northern Kentucky`,
  twitterCard: 'summary_large_image' as const,
}

/** Stable year for copyright — evaluated once at build/load time, not during render. */
export const COPYRIGHT_YEAR = new Date().getFullYear()

export type PageSeo = {
  title: string
  description: string
  path: string
  ogImage?: string
  ogImageAlt?: string
  absoluteTitle?: string
}

export const PAGE_SEO = {
  home: {
    title: SITE.defaultTitle,
    absoluteTitle: SITE.absoluteDefaultTitle,
    description: SITE.defaultDescription,
    path: '/',
  },
  services: {
    title: 'Services',
    description:
      'Lawn care, leaf removal, landscaping, seasonal cleanup, mulch installation, and trimming and edging across Northern Kentucky.',
    path: '/services',
  },
  gallery: {
    title: 'Gallery',
    description:
      'Browse lawn care, landscaping, leaf removal, cleanup, and mulch projects from Northern Kentucky properties.',
    path: '/gallery',
  },
  reviews: {
    title: 'Customer Feedback',
    description:
      'Learn what to expect from Kentucky Lawn & Leaf — reliable lawn care, landscaping, and seasonal cleanup across Northern Kentucky. Request a free quote.',
    path: '/reviews',
  },
  serviceAreas: {
    title: 'Service Areas',
    description:
      'Locally owned lawn care and landscaping serving Fort Thomas, Newport, Covington, Bellevue, Dayton, Alexandria, Highland Heights, Cold Spring, and nearby Northern Kentucky communities.',
    path: '/service-areas',
  },
  faq: {
    title: 'FAQ',
    description:
      'Answers about free quotes, lawn care plans, service areas, leaf removal, and scheduling with Kentucky Lawn & Leaf in Northern Kentucky.',
    path: '/faq',
  },
  requestQuote: {
    title: 'Request a Quote',
    description:
      'Request a free, no-obligation quote for lawn care, landscaping, leaf removal, or seasonal cleanup in Northern Kentucky.',
    path: '/request-quote',
  },
} satisfies Record<string, PageSeo>

export type Service = {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  benefits: string[]
  includedItems: string[]
  image: {
    src: string
    alt: string
  }
  ctaText: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    slug: 'lawn-care',
    title: 'Lawn Care',
    shortDescription:
      'Weekly and bi-weekly mowing, edging, and cleanup that keep your Northern Kentucky lawn thick, green, and guest-ready all season.',
    longDescription:
      'Your lawn should look great every week — not just after a rare free Saturday. Our local crew handles scheduled mowing, crisp edging, and clipping cleanup tailored to Northern Kentucky grass and weather, so your yard stays polished without you lifting a finger.',
    benefits: [
      'Consistent results from a crew that knows local turf',
      'Dependable weekly or bi-weekly scheduling',
      'Clean edges and hard-surface blow-off every visit',
      'Seasonal care guidance for Kentucky lawns',
    ],
    includedItems: [
      'Mowing and line trimming',
      'Hard-surface blowing and clipping removal',
      'Edging along sidewalks and driveways',
      'Seasonal treatment recommendations',
    ],
    image: {
      src: '/hero-lawn.png',
      alt: 'Freshly mowed green lawn in front of a Kentucky home',
    },
    ctaText: 'Get My Lawn Care Quote',
    icon: Scissors,
  },
  {
    slug: 'leaf-removal',
    title: 'Leaf Removal',
    shortDescription:
      'Thorough fall and spring leaf cleanup across Northern Kentucky — so your lawn can breathe and your property stays tidy through the seasons.',
    longDescription:
      'When leaves blanket your yard, they smother grass and clutter beds fast. We clear full properties with efficient blowers, rakes, and haul-away — including walkways, corners, and hard-to-reach spots — so your Northern Kentucky home looks cared for heading into winter or spring.',
    benefits: [
      'Protects turf from smothering and seasonal damage',
      'Clears beds, walkways, and tight corners in one visit',
      'Frees up your weekends during peak leaf season',
      'Spring service removes winter debris and buildup',
    ],
    includedItems: [
      'Full-yard leaf blowing and collection',
      'Bed and landscape edge cleanup',
      'Curbside or on-site haul-away',
      'Spring and fall service availability',
    ],
    image: {
      src: '/after-leaves.png',
      alt: 'Clean Kentucky yard after professional leaf removal',
    },
    ctaText: 'Schedule Leaf Cleanup',
    icon: Leaf,
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    shortDescription:
      'Front-yard refreshes, bed redesigns, and planting that boost curb appeal across Northern Kentucky neighborhoods.',
    longDescription:
      'First impressions start at the curb. From reshaping tired beds to full front-yard refreshes, we help Northern Kentucky homeowners create landscapes that look intentional, thrive in local conditions, and feel finished from day one.',
    benefits: [
      'Stronger curb appeal that makes your home stand out',
      'Plant selections suited to Northern Kentucky climate',
      'Cohesive bed shapes and clean transitions',
      'A polished look that complements your lawn care plan',
    ],
    includedItems: [
      'Bed layout and reshape consultation',
      'Shrub, perennial, and ornamental planting',
      'Soil prep and bed refinement',
      'Finished edges and initial mulch placement',
    ],
    image: {
      src: '/landscape-design.png',
      alt: 'Professionally landscaped front yard beds in Kentucky',
    },
    ctaText: 'Start My Landscaping Quote',
    icon: Trees,
  },
  {
    slug: 'seasonal-cleanup',
    title: 'Seasonal Cleanup',
    shortDescription:
      'Spring and fall property resets — debris removal, bed cleaning, and pruning to get your yard season-ready.',
    longDescription:
      'Every season deserves a fresh start. Our spring and fall cleanups clear debris, refresh beds, and tidy borders across Northern Kentucky — so your property looks maintained and ready for mowing, mulch, or planting work.',
    benefits: [
      'Head start on spring growth or fall winterization',
      'Removes branches, sticks, and storm debris',
      'Refreshes beds before mulch or landscaping work',
      'Pairs easily with mowing and leaf removal plans',
    ],
    includedItems: [
      'Property-wide debris pickup',
      'Bed weeding and edge cleaning',
      'Light pruning of shrubs and ornamentals',
      'Hard-surface blowing and final walkthrough',
    ],
    image: {
      src: '/seasonal-leaves.png',
      alt: 'Seasonal yard cleanup on a Kentucky property',
    },
    ctaText: 'Book Seasonal Cleanup',
    icon: Sprout,
  },
  {
    slug: 'mulch-installation',
    title: 'Mulch Installation',
    shortDescription:
      'Fresh mulch delivery and installation that locks in moisture and gives your beds a clean, finished look.',
    longDescription:
      'New mulch instantly elevates a property. We deliver quality mulch and install it with consistent depth and clean edges — helping Northern Kentucky beds retain moisture, suppress weeds, and look professionally finished.',
    benefits: [
      'Instantly cleaner, more uniform bed appearance',
      'Better moisture retention through summer heat',
      'Natural weed suppression between visits',
      'Protects plant roots through seasonal temperature swings',
    ],
    includedItems: [
      'Premium mulch delivery to your property',
      'Bed weeding and edge prep before install',
      'Even spreading at proper depth',
      'Cleanup of walkways and hard surfaces',
    ],
    image: {
      src: '/gallery-mulch.png',
      alt: 'Fresh mulch installed in landscaped garden beds',
    },
    ctaText: 'Get My Mulch Quote',
    icon: Layers,
  },
  {
    slug: 'trimming-edging',
    title: 'Trimming & Edging',
    shortDescription:
      'Crisp lawn edges, shaped shrubs, and clean borders that make your whole property look professionally maintained.',
    longDescription:
      'The details set premium properties apart. Our trimming and edging service sharpens lawn lines, shapes shrubs, and clears overgrowth — so your Northern Kentucky home looks cared for between full mowing visits.',
    benefits: [
      'Defined borders that frame your lawn and beds',
      'Healthier shrubs with proper shaping',
      'A polished look between full service visits',
      'Ideal add-on for mowing and landscaping clients',
    ],
    includedItems: [
      'Sidewalk, driveway, and bed edging',
      'Shrub and hedge trimming',
      'Overgrowth cleanup along fences and corners',
      'Clipping removal and final blow-off',
    ],
    image: {
      src: '/gallery-edge.png',
      alt: 'Crisp lawn edging along a Kentucky sidewalk',
    },
    ctaText: 'Request Trimming & Edging',
    icon: Ruler,
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug)
}

export function getServicePath(slug: string): string {
  return `/services/${slug}`
}

export function getServicePageSeo(service: Service): PageSeo {
  return {
    title: service.title,
    description: service.shortDescription,
    path: getServicePath(service.slug),
    ogImage: service.image.src,
    ogImageAlt: service.image.alt,
  }
}

export const QUOTE_BENEFITS = [
  'Free quote with no obligation',
  'Friendly follow-up within one business day',
  'Reliable scheduling from a local crew',
]

export const QUOTE_FORM = {
  title: 'Request a Free Quote',
  intro:
    'Tell us about your Northern Kentucky property and the services you need. We will follow up with a clear estimate — no pressure, no obligation.',
  submitLabel: 'Send My Free Quote Request',
  submittingLabel: 'Sending your request...',
  disclaimer:
    'By submitting, you agree to be contacted about your quote request. We respect your time and never share your information.',
  successTitle: 'Thanks — we received your request.',
  successMessage:
    'A friendly member of our local team will reach out within one business day.',
  errorTitle: 'We could not send your request',
  errorHelpText:
    'Please check the fields below and try again, or call us directly at',
  fields: {
    name: { label: 'Full name', placeholder: 'Jane Doe' },
    phone: { label: 'Phone', placeholder: '(859) 555-0123' },
    email: { label: 'Email', placeholder: 'jane@email.com' },
    addressOrZip: {
      label: 'Address or ZIP code',
      placeholder: '123 Highland Ave, Fort Thomas, KY 41075',
      helperText:
        'Your address or ZIP helps us confirm service availability in Northern Kentucky.',
    },
    serviceNeeded: {
      label: 'Service needed',
      helperText: 'Select the service that best matches what you are looking for.',
    },
    propertyType: { label: 'Property type' },
    preferredContactMethod: {
      label: 'Preferred contact method',
      helperText: 'Choose how you would like us to follow up about your quote.',
    },
    message: {
      label: 'Additional details (optional)',
      placeholder:
        'Share your timeline, yard size, problem areas, or anything else that helps us quote accurately.',
    },
  },
}

export type TrustItem = {
  icon: LucideIcon
  label: string
}

export const TRUST_ITEMS: TrustItem[] = [
  { icon: Home, label: 'Locally Owned' },
  { icon: FileText, label: 'Free Quotes' },
  { icon: CalendarCheck, label: 'Reliable Scheduling' },
  { icon: Leaf, label: 'Seasonal Cleanup' },
]

export const HERO = {
  badge: 'Northern Kentucky · Locally owned',
  title: 'A beautiful yard, without the weekend work.',
  description:
    'From weekly mowing to fall leaf cleanup and fresh mulch, our friendly local crew keeps Northern Kentucky properties looking sharp — with reliable scheduling and free quotes.',
  trustPoints: [
    'Locally owned in Northern Kentucky',
    'Free quotes with no obligation',
  ],
  image: {
    src: '/hero-lawn.png',
    alt: 'Freshly mowed, lush green lawn in front of a Northern Kentucky home',
  },
  statBadge: {
    value: 'NKY',
    label: 'lawn care, leaf removal\n& seasonal cleanup',
  },
  quoteBadge: {
    title: 'Free local quote',
    subtitle: 'Response within one business day',
  },
}

export type SectionCopy = {
  eyebrow: string
  title: string
  description: string
  badge?: string
}

export const SECTION_COPY = {
  services: {
    eyebrow: 'Our services',
    title: 'Everything your Northern Kentucky yard needs',
    description:
      'One reliable local crew for mowing, leaf removal, landscaping, mulch, and seasonal cleanup — so your property stays polished year-round.',
  },
  gallery: {
    eyebrow: 'Recent work',
    title: 'Results you can see before you book',
    description:
      'Browse lawn care, landscaping, and cleanup projects from properties across Northern Kentucky. Every visit is finished with the same attention to detail.',
  },
  beforeAfter: {
    eyebrow: 'Before & after',
    title: 'See what a thorough cleanup can do',
    description:
      'Drag the slider to compare a Northern Kentucky property before and after our crew completed a full leaf removal and seasonal cleanup.',
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Three simple steps to a better yard',
    description:
      'Getting started takes less than two minutes. Request a free quote and our local team handles the rest.',
  },
  reviews: {
    eyebrow: 'Customer feedback',
    title: 'Verified reviews coming soon',
    description:
      'We are collecting feedback from Northern Kentucky homeowners. In the meantime, here is what you can expect from every visit — or request a free quote and see for yourself.',
  },
  serviceAreas: {
    eyebrow: 'Service areas',
    title: 'Proudly serving Northern Kentucky',
    description:
      'Locally owned lawn care and landscaping for neighborhoods across Northern Kentucky. Select your community below or request a quote to confirm availability.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions before you book?',
    description:
      'Straight answers about quotes, scheduling, and what to expect. Still unsure? Call our friendly local team anytime.',
  },
  finalCta: {
    eyebrow: 'Ready when you are',
    badge: 'Ready when you are',
    title: 'Get a yard you are proud to come home to',
    description:
      'Request your free quote today. A local team member will follow up with a clear estimate — no pressure, no obligation.',
  },
} satisfies Record<string, SectionCopy>

export const STEPS = [
  {
    step: '01',
    title: 'Tell us about your property',
    description:
      'Share your address, the services you need, and how you would like us to follow up. It takes less than two minutes.',
  },
  {
    step: '02',
    title: 'Receive a clear estimate',
    description:
      'We review your details, visit if needed, and send a straightforward quote with no hidden fees or pressure.',
  },
  {
    step: '03',
    title: 'Enjoy a cleaner property',
    description:
      'Our friendly local crew gets to work on a schedule you can count on — mowing, cleanup, mulch, and more.',
  },
]

export type GalleryCategory =
  | 'Lawn Care'
  | 'Leaf Removal'
  | 'Landscaping'
  | 'Cleanup'
  | 'Mulch'

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Lawn Care',
  'Leaf Removal',
  'Landscaping',
  'Cleanup',
  'Mulch',
]

export type GalleryItem = {
  id: string
  title: string
  category: GalleryCategory
  image: {
    src: string
    alt: string
  }
  description: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'lawn-weekly-mow',
    title: 'Weekly Lawn Maintenance',
    category: 'Lawn Care',
    image: {
      src: '/hero-lawn.png',
      alt: 'Freshly mowed Kentucky lawn',
    },
    description:
      'Consistent weekly mowing and edging kept this Fort Thomas yard thick and uniform all summer.',
  },
  {
    id: 'lawn-biweekly-refresh',
    title: 'Bi-Weekly Turf Refresh',
    category: 'Lawn Care',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — green residential lawn',
    },
    description:
      'A bi-weekly plan with clean borders and clipping removal gave this property a polished look between visits.',
  },
  {
    id: 'lawn-fertilization',
    title: 'Seasonal Lawn Treatment',
    category: 'Lawn Care',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — healthy green grass',
    },
    description:
      'Targeted seasonal treatment helped this lawn recover from summer stress and stay greener into fall.',
  },
  {
    id: 'leaf-fall-cleanup',
    title: 'Fall Leaf Removal',
    category: 'Leaf Removal',
    image: {
      src: '/after-leaves.png',
      alt: 'Kentucky yard after professional leaf removal',
    },
    description:
      'Full-property leaf collection and haul-away cleared heavy fall coverage in a single visit.',
  },
  {
    id: 'leaf-spring-reset',
    title: 'Spring Leaf & Debris Cleanup',
    category: 'Leaf Removal',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — spring yard cleanup',
    },
    description:
      'Winter debris and leftover leaf buildup were removed to prepare beds and turf for spring growth.',
  },
  {
    id: 'landscape-bed-redesign',
    title: 'Front Bed Redesign',
    category: 'Landscaping',
    image: {
      src: '/landscape-design.png',
      alt: 'Professionally landscaped front beds in Kentucky',
    },
    description:
      'Reshaped beds, fresh plantings, and clean transitions gave this Newport home stronger curb appeal.',
  },
  {
    id: 'landscape-shrub-planting',
    title: 'Shrub & Perennial Installation',
    category: 'Landscaping',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — shrub and perennial planting',
    },
    description:
      'New shrubs and perennials were installed with proper spacing and soil prep for long-term health.',
  },
  {
    id: 'landscape-curb-appeal',
    title: 'Curb Appeal Refresh',
    category: 'Landscaping',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — enhanced front landscape',
    },
    description:
      'A full front-yard refresh combined bed work, edging, and planting for a more finished first impression.',
  },
  {
    id: 'cleanup-spring-reset',
    title: 'Spring Property Reset',
    category: 'Cleanup',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — spring property cleanup',
    },
    description:
      'Branches, sticks, and bed debris were cleared so the property was ready for mowing and mulch work.',
  },
  {
    id: 'cleanup-fall-prep',
    title: 'Fall Yard Cleanup',
    category: 'Cleanup',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — fall yard cleanup',
    },
    description:
      'A seasonal cleanup removed storm debris and tidied beds before winter weather set in.',
  },
  {
    id: 'mulch-front-beds',
    title: 'Front Bed Mulch Install',
    category: 'Mulch',
    image: {
      src: '/gallery-mulch.png',
      alt: 'Fresh mulch installed in landscaped garden beds',
    },
    description:
      'Fresh mulch at consistent depth gave these beds a clean, finished look and better moisture retention.',
  },
  {
    id: 'mulch-full-property',
    title: 'Full-Property Mulch Refresh',
    category: 'Mulch',
    image: {
      src: '/placeholder.jpg',
      alt: 'Placeholder — mulched landscape beds',
    },
    description:
      'All landscape beds were weeded, edged, and mulched for a uniform appearance across the property.',
  },
]

export const FEATURED_GALLERY_IDS = [
  'leaf-fall-cleanup',
  'landscape-bed-redesign',
  'mulch-front-beds',
] as const

export const BEFORE_AFTER = {
  before: {
    src: '/before-leaves.png',
    alt: 'Northern Kentucky yard covered in fallen leaves before cleanup',
  },
  after: {
    src: '/after-leaves.png',
    alt: 'Same Northern Kentucky yard after professional leaf removal and cleanup',
  },
  ctaLabel: 'Get My Free Quote',
}

export const GALLERY_PREVIEW = {
  buttonLabel: 'Browse Full Gallery',
}

export const GALLERY_CTA = {
  badge: 'Your yard could look like this',
  title: 'Ready for a property you are proud of?',
  description:
    'Request a free quote and tell us about your lawn, beds, or seasonal cleanup needs. We will follow up with a clear estimate and scheduling options.',
  buttonLabel: 'Request My Free Quote',
}

export const SEASONAL_PROMO = {
  badge: 'Fall in Northern Kentucky',
  title: 'Fall leaf cleanup slots fill fast',
  description:
    'Reserve your seasonal cleanup before leaves peak. Our local crew handles full-property removal, haul-away, and bed cleanup so your yard stays tidy through winter.',
  primaryCta: 'Reserve My Cleanup',
  secondaryCta: 'Call Now',
  image: {
    src: '/seasonal-leaves.png',
    alt: 'Autumn leaves being cleared from a Northern Kentucky yard',
  },
}

export type ReviewPlaceholder = {
  id: string
  service: string
  title: string
  description: string
}

export const REVIEW_PLACEHOLDERS: ReviewPlaceholder[] = [
  {
    id: 'lawn-care',
    service: 'Lawn Care',
    title: 'Consistent results, visit after visit',
    description:
      'Reliable mowing, clean edges, and clipping removal on a schedule that fits your Northern Kentucky property.',
  },
  {
    id: 'leaf-removal',
    service: 'Leaf Removal',
    title: 'Thorough cleanup when leaves pile up',
    description:
      'Full-yard leaf collection, bed clearing, and haul-away so your lawn can breathe through fall and spring.',
  },
  {
    id: 'landscaping',
    service: 'Landscaping',
    title: 'Curb appeal that feels finished',
    description:
      'Bed refreshes, planting, and clean transitions that make your home stand out on the block.',
  },
  {
    id: 'seasonal-cleanup',
    service: 'Seasonal Cleanup',
    title: 'A fresh start each season',
    description:
      'Debris removal, bed tidying, and light pruning to get your property ready for the season ahead.',
  },
  {
    id: 'mulch',
    service: 'Mulch Installation',
    title: 'Beds that look professionally finished',
    description:
      'Even mulch depth, clean edges, and hard-surface cleanup for a polished look that lasts.',
  },
  {
    id: 'trimming',
    service: 'Trimming & Edging',
    title: 'Sharp details between visits',
    description:
      'Crisp lawn lines and shaped shrubs that keep your whole property looking cared for.',
  },
]

export const REVIEWS_CTA = {
  badge: 'Experience it yourself',
  title: 'See why Northern Kentucky homeowners choose us',
  description:
    'Request a free quote and meet the friendly local crew behind every mow, cleanup, and landscape refresh.',
  buttonLabel: 'Request My Free Quote',
}

export type ServiceArea = {
  slug: string
  city: string
  state: string
  shortDescription: string
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: 'fort-thomas',
    city: 'Fort Thomas',
    state: 'KY',
    shortDescription:
      'Reliable mowing, leaf removal, and seasonal cleanup for Fort Thomas homes and neighborhoods.',
  },
  {
    slug: 'newport',
    city: 'Newport',
    state: 'KY',
    shortDescription:
      'Professional lawn care and fall cleanup for Newport properties — weekly plans or one-time visits.',
  },
  {
    slug: 'covington',
    city: 'Covington',
    state: 'KY',
    shortDescription:
      'Full-service lawn and landscape care for Covington homeowners, rentals, and multi-unit properties.',
  },
  {
    slug: 'bellevue',
    city: 'Bellevue',
    state: 'KY',
    shortDescription:
      'Friendly local crews keeping Bellevue lawns trimmed, tidy, and ready for every season.',
  },
  {
    slug: 'dayton',
    city: 'Dayton',
    state: 'KY',
    shortDescription:
      'Dependable mowing, edging, mulch, and cleanup tailored to Dayton homeowners.',
  },
  {
    slug: 'alexandria',
    city: 'Alexandria',
    state: 'KY',
    shortDescription:
      'Lawn care and landscape support in Alexandria — from weekly mowing to full seasonal resets.',
  },
  {
    slug: 'highland-heights',
    city: 'Highland Heights',
    state: 'KY',
    shortDescription:
      'Consistent lawn maintenance, leaf removal, and landscaping for Highland Heights properties.',
  },
  {
    slug: 'cold-spring',
    city: 'Cold Spring',
    state: 'KY',
    shortDescription:
      'Seasonal cleanup, mulch installation, and lawn care serving Cold Spring and nearby communities.',
  },
]

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((area) => area.slug === slug)
}

export function getAllServiceAreaSlugs(): string[] {
  return SERVICE_AREAS.map((area) => area.slug)
}

export function getServiceAreaPath(slug: string): string {
  return `/service-areas/${slug}`
}

export function getServiceAreaPageSeo(area: ServiceArea): PageSeo {
  return {
    title: `${area.city}, ${area.state} Lawn Care`,
    description: area.shortDescription,
    path: getServiceAreaPath(area.slug),
  }
}

export type FaqItem = {
  question: string
  answer: string
}

export function getServiceAreaFaqs(area: ServiceArea): FaqItem[] {
  const label = `${area.city}, ${area.state}`

  return [
    {
      question: `Do you serve ${label}?`,
      answer: `Yes. We provide lawn care, landscaping, and seasonal services throughout ${area.city} and surrounding Northern Kentucky communities.`,
    },
    {
      question: `How quickly can I get a quote in ${area.city}?`,
      answer:
        'Most quote requests receive a response within one business day. Share your address and service needs and we will follow up with a clear, no-obligation estimate.',
    },
    {
      question: `What services are available in ${area.city}?`,
      answer:
        'We offer lawn care, leaf removal, landscaping, seasonal cleanup, mulch installation, and trimming and edging. Visit our services page for full details on each offering.',
    },
    {
      question: 'Do you offer recurring lawn care plans?',
      answer:
        'Yes. Weekly and bi-weekly mowing plans are available along with seasonal packages so your property stays maintained without the hassle.',
    },
    {
      question: 'What can I expect from your crew?',
      answer:
        'Friendly local professionals who communicate clearly, show up on schedule, and leave your property looking clean and cared for after every visit.',
    },
  ]
}

export const LOCAL_TRUST_COPY = {
  eyebrow: 'Local & reliable',
  title: 'Why Northern Kentucky homeowners choose us',
  description:
    'Locally owned crews, dependable scheduling, and clear communication on every visit — from the first quote to the final blow-off.',
}

export const FAQS: FaqItem[] = [
  {
    question: 'How do I request a quote?',
    answer:
      'Tap "Request a Free Quote" on our website or call us directly. Share your name, contact details, address, and the services you need. We will follow up with a clear, no-obligation estimate — usually within one business day.',
  },
  {
    question: 'Do you offer one-time cleanups?',
    answer:
      'Yes. We handle one-time seasonal cleanups, leaf removal visits, mulch installation, and other standalone projects — in addition to recurring lawn care plans.',
  },
  {
    question: 'Do you offer recurring lawn care?',
    answer:
      'Yes. Weekly and bi-weekly mowing plans are available, along with seasonal service packages. You choose the schedule and our local crew handles the rest.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve Northern Kentucky communities including Fort Thomas, Newport, Covington, Bellevue, Dayton, Alexandria, Highland Heights, and Cold Spring. If your city is not listed, reach out and we will confirm availability.',
  },
  {
    question: 'Do I need to be home for service?',
    answer:
      'No. Most clients are not home during service visits. As long as we have access to the areas being maintained, our crew can complete the work and leave your property looking great.',
  },
  {
    question: 'Do you handle leaf removal?',
    answer:
      'Yes. We provide thorough fall and spring leaf removal across Northern Kentucky — including blowing, collection, bed cleanup, and haul-away.',
  },
  {
    question: 'Can I send photos for an estimate?',
    answer:
      'Absolutely. Photos help us understand your property faster. Include them in your quote request or send them when our team follows up — we can often provide a more accurate estimate.',
  },
  {
    question: 'Are you a local company?',
    answer:
      'Yes. Kentucky Lawn & Leaf is locally owned and focused on Northern Kentucky homeowners who want reliable lawn care, landscaping, and seasonal yard work.',
  },
]

