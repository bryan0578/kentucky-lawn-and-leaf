import type { Metadata } from 'next'

export const SITE_NAME = 'Kentucky Lawn & Leaf'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kylawnandleaf.com'

export const DEFAULT_DESCRIPTION =
  'Locally owned lawn care, landscaping, and leaf removal serving Northern Kentucky. Reliable scheduling, free quotes, and friendly local crews.'

export const DEFAULT_OG_IMAGE = '/hero-lawn.png'

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  ogImage?: string
  ogImageAlt?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = SITE_NAME,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(ogImage)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Lawn Care, Landscaping & Leaf Removal`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Lawn Care, Landscaping & Leaf Removal`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Lawn Care, Landscaping & Leaf Removal`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}
