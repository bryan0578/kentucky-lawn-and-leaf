import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { COMPANY, SITE, type PageSeo } from '@/lib/site-data'

let resolvedOgImagePath: string | null = null

/** Returns the configured Open Graph / Twitter image path. */
export function getOgImagePath(): string {
  if (resolvedOgImagePath) {
    return resolvedOgImagePath
  }

  const filename = SITE.ogImage.replace(/^\//, '')
  const ogImageFile = path.join(process.cwd(), 'public', filename)
  resolvedOgImagePath = fs.existsSync(ogImageFile)
    ? SITE.ogImage
    : SITE.ogImageFallback

  return resolvedOgImagePath
}

export const SITE_URL = SITE.url

export function absoluteUrl(routePath: string): string {
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`
  return new URL(normalizedPath, SITE.url).toString()
}

type CreatePageMetadataOptions = PageSeo & {
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage,
  ogImageAlt,
  absoluteTitle,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const imagePath = ogImage ?? getOgImagePath()
  const imageUrl = absoluteUrl(imagePath)
  const imageAlt = ogImageAlt ?? SITE.ogImageAlt

  const openGraph = {
    title: absoluteTitle ?? title,
    description,
    url,
    siteName: COMPANY.name,
    locale: SITE.locale,
    type: 'website' as const,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt,
      },
    ],
  }

  const twitter = {
    card: SITE.twitterCard,
    title: absoluteTitle ?? title,
    description,
    images: [imageUrl],
  }

  if (absoluteTitle) {
    return {
      title: { absolute: absoluteTitle },
      description,
      alternates: { canonical: url },
      robots: noIndex
        ? { index: false, follow: false }
        : { index: true, follow: true },
      openGraph,
      twitter,
    }
  }

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph,
    twitter,
  }
}

export function createRootMetadata(): Metadata {
  const ogImagePath = getOgImagePath()
  const ogImageUrl = absoluteUrl(ogImagePath)

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SITE.absoluteDefaultTitle,
      template: SITE.titleTemplate,
    },
    description: SITE.defaultDescription,
    applicationName: COMPANY.name,
    authors: [{ name: COMPANY.name, url: SITE.url }],
    creator: COMPANY.name,
    publisher: COMPANY.name,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url: SITE.url,
      siteName: COMPANY.name,
      title: SITE.absoluteDefaultTitle,
      description: SITE.defaultDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: SITE.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: SITE.twitterCard,
      title: SITE.absoluteDefaultTitle,
      description: SITE.defaultDescription,
      images: [ogImageUrl],
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
}

/** @deprecated Use SITE.defaultDescription from lib/site-data.ts */
export const DEFAULT_DESCRIPTION = SITE.defaultDescription

/** @deprecated Use SITE.ogImage or getOgImagePath() */
export const DEFAULT_OG_IMAGE = SITE.ogImage

/** @deprecated Use createRootMetadata() */
export const rootMetadata = createRootMetadata()
