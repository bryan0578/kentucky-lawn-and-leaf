import type { MetadataRoute } from 'next'
import { serviceAreaRoute, serviceRoute } from '@/lib/constants'
import { absoluteUrl } from '@/lib/seo'
import {
  getAllServiceAreaSlugs,
  getAllServiceSlugs,
  PAGE_SEO,
} from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(PAGE_SEO.home.path),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl(PAGE_SEO.services.path),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl(PAGE_SEO.gallery.path),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl(PAGE_SEO.reviews.path),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl(PAGE_SEO.serviceAreas.path),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl(PAGE_SEO.faq.path),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl(PAGE_SEO.requestQuote.path),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: absoluteUrl(serviceRoute(slug)),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  )

  const serviceAreaRoutes: MetadataRoute.Sitemap = getAllServiceAreaSlugs().map(
    (slug) => ({
      url: absoluteUrl(serviceAreaRoute(slug)),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  )

  return [...staticRoutes, ...serviceRoutes, ...serviceAreaRoutes]
}
