import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { COMPANY, SITE, type PageSeo } from '@/lib/site-data'

let resolvedOgImagePath: string | null = null

function publicAssetPath(assetPath: string): string {
  return path.join(
    process.cwd(),
    'public',
    assetPath.startsWith('/') ? assetPath.slice(1) : assetPath,
  )
}

/** Returns the configured Open Graph / Twitter image path. */
export function getOgImagePath(): string {
  if (resolvedOgImagePath) {
    return resolvedOgImagePath
  }

  resolvedOgImagePath = fs.existsSync(publicAssetPath(SITE.ogImage))
    ? SITE.ogImage
    : SITE.ogImageFallback

  return resolvedOgImagePath
}

export const SITE_URL = SITE.url

export function absoluteUrl(routePath: string): string {
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`
  return new URL(normalizedPath, SITE.url).toString()
}

function buildSocialImageMetadata(imagePath: string, alt: string) {
  const imageUrl = absoluteUrl(imagePath)

  return {
    openGraphImage: {
      url: imageUrl,
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
      alt,
    },
    twitterImage: imageUrl,
  }
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
  const imagePath = ogImage ?? SITE.ogImage
  const imageAlt = ogImageAlt ?? SITE.ogImageAlt
  const { openGraphImage, twitterImage } = buildSocialImageMetadata(
    imagePath,
    imageAlt,
  )

  const openGraph = {
    title: absoluteTitle ?? title,
    description,
    url,
    siteName: COMPANY.name,
    locale: SITE.locale,
    type: 'website' as const,
    images: [openGraphImage],
  }

  const twitter = {
    card: SITE.twitterCard,
    title: absoluteTitle ?? title,
    description,
    images: [twitterImage],
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
  const { openGraphImage, twitterImage } = buildSocialImageMetadata(
    SITE.ogImage,
    SITE.ogImageAlt,
  )

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
      images: [openGraphImage],
    },
    twitter: {
      card: SITE.twitterCard,
      title: SITE.absoluteDefaultTitle,
      description: SITE.defaultDescription,
      images: [twitterImage],
    },
    icons: {
      icon: [
        {
          url: SITE.favicon.light,
          media: '(prefers-color-scheme: light)',
        },
        {
          url: SITE.favicon.dark,
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: SITE.favicon.svg,
          type: 'image/svg+xml',
        },
      ],
      apple: SITE.favicon.apple,
    },
  }
}

/** @deprecated Use SITE.defaultDescription from lib/site-data.ts */
export const DEFAULT_DESCRIPTION = SITE.defaultDescription

/** @deprecated Use SITE.ogImage or getOgImagePath() */
export const DEFAULT_OG_IMAGE = SITE.ogImage

/** @deprecated Use createRootMetadata() */
export const rootMetadata = createRootMetadata()
