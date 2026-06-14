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
    'Locally owned lawn care, landscaping, and leaf removal serving Northern Kentucky with reliable, friendly service.',
  yearsServing: '12+',
  yearsServingLabel: 'years serving Northern Kentucky',
  rating: '5.0 from 200+ neighbors',
  licensedLabel: 'Licensed & insured',
  footerLegal: 'Licensed & insured · Locally owned',
}

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
      'Weekly and bi-weekly mowing, fertilization, and treatment plans that keep your grass thick, green, and healthy all season.',
    longDescription:
      'A great lawn takes consistency. Our local crews provide scheduled mowing, edging, and seasonal treatments tailored to Kentucky grass types and weather patterns. Whether you need weekly maintenance or a bi-weekly plan, we keep your turf looking sharp without you lifting a finger.',
    benefits: [
      'Thicker, greener grass through the growing season',
      'Dependable weekly or bi-weekly scheduling',
      'Professional edging and clipping cleanup every visit',
      'Seasonal fertilization guidance for Kentucky lawns',
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
    ctaText: 'Get a Lawn Care Quote',
    icon: Scissors,
  },
  {
    slug: 'leaf-removal',
    title: 'Leaf Removal',
    shortDescription:
      'Fast, thorough fall and spring leaf cleanup so your yard stays tidy and your grass keeps breathing.',
    longDescription:
      'Fall leaves pile up fast in Northern Kentucky. We handle full-property leaf removal with efficient blowers, rakes, and haul-away so your lawn can breathe and your beds stay clean heading into winter or spring.',
    benefits: [
      'Protects grass from smothering and disease',
      'Clears walkways, beds, and hard-to-reach corners',
      'Frees up your weekends during peak leaf season',
      'Spring cleanup removes winter debris and buildup',
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
    ctaText: 'Get a Leaf Removal Quote',
    icon: Leaf,
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    shortDescription:
      'Custom landscape design, planting, and bed installation that boosts curb appeal and property value.',
    longDescription:
      'From front-yard refreshes to full bed redesigns, we help Kentucky homeowners create landscapes that look intentional and thrive in local conditions. We handle layout, planting, and finishing details so the result feels polished from day one.',
    benefits: [
      'Stronger curb appeal and first impressions',
      'Plant selections suited to Kentucky climate',
      'Cohesive bed shapes and clean transitions',
      'Increased property value with professional design',
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
    ctaText: 'Get a Landscaping Quote',
    icon: Trees,
  },
  {
    slug: 'seasonal-cleanup',
    title: 'Seasonal Cleanup',
    shortDescription:
      'Spring and fall property resets including debris removal, bed cleaning, and pruning.',
    longDescription:
      'Seasonal transitions are the perfect time to reset your property. Our spring and fall cleanups clear debris, refresh beds, and tidy borders so your yard starts each season looking maintained and ready for regular care.',
    benefits: [
      'Head-start on spring growth and fall winterization',
      'Removes branches, sticks, and storm debris',
      'Refreshes beds before mulch or planting work',
      'Pairs well with mowing and leaf removal plans',
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
    ctaText: 'Get a Seasonal Cleanup Quote',
    icon: Sprout,
  },
  {
    slug: 'mulch-installation',
    title: 'Mulch Installation',
    shortDescription:
      'Premium mulch delivery and installation that locks in moisture and gives beds a clean, finished look.',
    longDescription:
      'Fresh mulch instantly elevates your landscape. We deliver quality mulch and install it with consistent depth and clean edges, helping beds retain moisture, suppress weeds, and look professionally finished.',
    benefits: [
      'Cleaner, more uniform bed appearance',
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
    ctaText: 'Get a Mulch Installation Quote',
    icon: Layers,
  },
  {
    slug: 'trimming-edging',
    title: 'Trimming & Edging',
    shortDescription:
      'Crisp edges, shaped shrubs, and clean borders that make your whole property look professionally maintained.',
    longDescription:
      'Details make the difference. Our trimming and edging service sharpens lawn lines, shapes shrubs, and cleans up overgrowth so the entire property looks cared for — even between full mowing visits.',
    benefits: [
      'Defined borders that frame your lawn and beds',
      'Healthier shrubs with proper shaping',
      'Polished look between full service visits',
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
    ctaText: 'Get a Trimming & Edging Quote',
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

export const QUOTE_BENEFITS = [
  'Free, no-obligation quote',
  'Response within one business day',
  'Reliable, scheduled service',
]

export const QUOTE_FORM = {
  title: 'Request a Free Quote',
  submitLabel: 'Request My Free Quote',
  submittingLabel: 'Sending request...',
  disclaimer: 'By submitting you agree to be contacted about your quote.',
  successTitle: 'Thanks! We got your request.',
  successMessage: 'A member of our team will reach out within one business day.',
  errorTitle: 'We could not send your request',
  errorHelpText: 'Please check the fields below and try again, or call us directly.',
  fields: {
    name: { label: 'Full name', placeholder: 'Jane Doe' },
    phone: { label: 'Phone', placeholder: '(859) 555-0123' },
    email: { label: 'Email', placeholder: 'jane@email.com' },
    addressOrZip: {
      label: 'Address or ZIP code',
      placeholder: '123 Highland Ave, Fort Thomas, KY 41075',
    },
    serviceNeeded: { label: 'Service needed' },
    propertyType: { label: 'Property type' },
    preferredContactMethod: { label: 'Preferred contact method' },
    message: {
      label: 'Additional details (optional)',
      placeholder: 'Tell us about your property, timeline, or special requests.',
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
  badge: 'Locally owned & operated in Northern Kentucky',
  title: 'A greener lawn, a cleaner yard, all season long.',
  description:
    'Professional lawn care, landscaping, and leaf removal you can rely on. Friendly local crews, dependable scheduling, and free quotes with no obligation.',
  image: {
    src: '/hero-lawn.png',
    alt: 'Freshly mowed, lush green lawn in front of a charming Kentucky home',
  },
  statBadge: {
    value: COMPANY.yearsServing,
    label: 'years serving\nNorthern Kentucky',
  },
  quoteBadge: {
    title: 'Free quote',
    subtitle: 'No obligation',
  },
}

export type SectionCopy = {
  eyebrow: string
  title: string
  description: string
}

export const SECTION_COPY = {
  services: {
    eyebrow: 'What we do',
    title: 'Full-service lawn & landscape care',
    description:
      'One trusted local crew for everything your property needs, from weekly mowing to a complete seasonal reset.',
  },
  gallery: {
    eyebrow: 'Our work',
    title: 'See the difference for yourself',
    description:
      'Real Kentucky properties, transformed. Browse recent lawn care, landscaping, and cleanup projects across Northern Kentucky.',
  },
  beforeAfter: {
    eyebrow: 'Before & After',
    title: 'See the difference a clean yard can make',
    description:
      'Drag the slider to compare a property before and after our crew finished a full leaf removal and cleanup.',
  },
  howItWorks: {
    eyebrow: 'Simple process',
    title: 'How it works',
    description:
      'Getting started is easy. Three steps stand between you and a property you are proud of.',
  },
  reviews: {
    eyebrow: 'Loved by neighbors',
    title: 'Trusted across Northern Kentucky',
    description:
      'We earn our reputation one happy yard at a time. Here is what local homeowners have to say.',
  },
  serviceAreas: {
    eyebrow: 'Where we work',
    title: 'Proudly serving Northern Kentucky',
    description:
      'Locally owned lawn care and landscaping for cities across Northern Kentucky. Select your community below or request a quote to confirm service availability.',
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'Frequently asked questions',
    description:
      'Everything you need to know before you book. Still have a question? Just give us a call.',
  },
  finalCta: {
    badge: 'Get started today',
    title: 'Ready for a yard you can be proud of?',
    description:
      'Request your free quote and a friendly local team member will be in touch. No pressure, no obligation.',
  },
} satisfies Record<string, SectionCopy>

export const STEPS = [
  {
    step: '01',
    title: 'Request a quote',
    description:
      'Tell us about your property and what you need. It takes less than two minutes and there is zero obligation.',
  },
  {
    step: '02',
    title: 'Get your estimate',
    description:
      'We review your details, visit if needed, and send a clear, upfront estimate with no hidden fees.',
  },
  {
    step: '03',
    title: 'Enjoy a cleaner property',
    description:
      'Our local crew gets to work on a schedule you can count on, season after season.',
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
    alt: 'Kentucky yard covered in fallen leaves before cleanup',
  },
  after: {
    src: '/after-leaves.png',
    alt: 'Same Kentucky yard after professional leaf removal',
  },
  ctaLabel: 'Request a Free Quote',
}

export const GALLERY_PREVIEW = {
  buttonLabel: 'View Full Gallery',
}

export const GALLERY_CTA = {
  badge: 'Your yard could be next',
  title: 'Ready for results like these?',
  description:
    'Request a free quote and tell us about your property. We will follow up with a clear estimate and scheduling options.',
  buttonLabel: 'Request a Free Quote',
}

export const SEASONAL_PROMO = {
  badge: 'Fall Season Special',
  title: 'Fall Leaf Cleanup Slots Fill Fast',
  description: 'Reserve your seasonal cleanup before the rush.',
  image: {
    src: '/seasonal-leaves.png',
    alt: 'Autumn leaves being cleared from a Kentucky yard',
  },
}

export type Testimonial = {
  id: string
  customerName: string
  location: string
  rating: number
  quote: string
  service: string
  date: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'marcus-bell',
    customerName: 'Marcus Bell',
    location: 'Fort Thomas, KY',
    rating: 5,
    quote:
      'Best lawn care decision we have made. The crew is reliable, friendly, and our yard has never looked better. The fall leaf cleanup alone is worth every penny.',
    service: 'Lawn Care',
    date: 'September 2025',
  },
  {
    id: 'danielle-carter',
    customerName: 'Danielle Carter',
    location: 'Newport, KY',
    rating: 5,
    quote:
      'They redesigned our front beds and installed fresh mulch and it completely transformed the house. Genuinely felt like a local business that cares.',
    service: 'Landscaping',
    date: 'June 2025',
  },
  {
    id: 'tom-whitfield',
    customerName: 'Tom Whitfield',
    location: 'Covington, KY',
    rating: 5,
    quote:
      'Scheduling is rock solid. They show up when they say they will and the property always looks immaculate afterward. Highly recommend.',
    service: 'Lawn Care',
    date: 'August 2025',
  },
  {
    id: 'sarah-mitchell',
    customerName: 'Sarah Mitchell',
    location: 'Bellevue, KY',
    rating: 5,
    quote:
      'Our fall leaf removal was handled quickly and thoroughly. They cleared beds, walkways, and the back yard without us having to follow up.',
    service: 'Leaf Removal',
    date: 'November 2025',
  },
  {
    id: 'james-porter',
    customerName: 'James Porter',
    location: 'Alexandria, KY',
    rating: 5,
    quote:
      'The spring cleanup made a huge difference before we started our mowing plan. Everything looked fresh and ready within a day.',
    service: 'Seasonal Cleanup',
    date: 'March 2025',
  },
  {
    id: 'linda-hayes',
    customerName: 'Linda Hayes',
    location: 'Cold Spring, KY',
    rating: 5,
    quote:
      'Mulch installation was neat, consistent, and finished the same day. Our beds finally look as polished as the rest of the property.',
    service: 'Mulch Installation',
    date: 'April 2025',
  },
]

export const REVIEWS_CTA = {
  badge: 'Join our happy customers',
  title: 'See why neighbors trust Kentucky Lawn & Leaf',
  description:
    'Request a free quote and find out how we can keep your property looking its best all season long.',
  buttonLabel: 'Request a Free Quote',
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
      'Reliable lawn care, landscaping, and seasonal cleanup for Fort Thomas homes and neighborhoods.',
  },
  {
    slug: 'newport',
    city: 'Newport',
    state: 'KY',
    shortDescription:
      'Professional yard maintenance and leaf removal serving Newport properties year-round.',
  },
  {
    slug: 'covington',
    city: 'Covington',
    state: 'KY',
    shortDescription:
      'Full-service lawn and landscape care for residential and rental properties across Covington.',
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
      'Dependable mowing, edging, and cleanup services tailored to Dayton homeowners.',
  },
  {
    slug: 'alexandria',
    city: 'Alexandria',
    state: 'KY',
    shortDescription:
      'Lawn care and landscape support for Alexandria homes, from weekly mowing to seasonal resets.',
  },
  {
    slug: 'highland-heights',
    city: 'Highland Heights',
    state: 'KY',
    shortDescription:
      'Consistent lawn maintenance and landscaping for Highland Heights properties of every size.',
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
      question: 'Are you licensed and insured?',
      answer:
        'Absolutely. Kentucky Lawn & Leaf is fully licensed and insured, so your property and our crew are always protected.',
    },
  ]
}

export const LOCAL_TRUST_COPY = {
  eyebrow: 'Local & reliable',
  title: 'Why neighbors trust us',
  description:
    'Locally owned crews, dependable scheduling, and clear communication on every visit.',
}

export const FAQS: FaqItem[] = [
  {
    question: 'How do I request a quote?',
    answer:
      'Tap "Request a Free Quote" on our website or call us directly. Share your name, contact details, address, and the services you need. We will follow up with a clear, no-obligation estimate, usually within one business day.',
  },
  {
    question: 'Do you offer one-time cleanups?',
    answer:
      'Yes. We offer one-time seasonal cleanups, leaf removal visits, mulch installation, and other standalone projects in addition to recurring lawn care plans.',
  },
  {
    question: 'Do you offer recurring lawn care?',
    answer:
      'Yes. Weekly and bi-weekly mowing plans are available along with seasonal service packages. You choose the schedule and we handle the rest with reliable, on-time visits.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve Northern Kentucky communities including Fort Thomas, Newport, Covington, Bellevue, Dayton, Alexandria, Highland Heights, and Cold Spring. If you do not see your city listed, reach out and we will confirm availability.',
  },
  {
    question: 'Do I need to be home for service?',
    answer:
      'No. Most clients are not home during service visits. As long as we have access to the areas being maintained, our crew can complete the work and leave your property looking great.',
  },
  {
    question: 'Do you handle leaf removal?',
    answer:
      'Yes. We provide thorough fall and spring leaf removal, including blowing, collection, and haul-away so your lawn and beds stay clean and healthy.',
  },
  {
    question: 'Can I send photos for an estimate?',
    answer:
      'Absolutely. Photos help us understand your property faster. Include them in your quote request message or send them when our team follows up, and we can often provide a more accurate estimate.',
  },
]

