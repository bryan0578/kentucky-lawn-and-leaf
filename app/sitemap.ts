import type { MetadataRoute } from 'next'
import { ROUTES, serviceAreaRoute, serviceRoute } from '@/lib/constants'
import { absoluteUrl } from '@/lib/seo'
import { getAllServiceAreaSlugs, getAllServiceSlugs } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl(ROUTES.services), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl(ROUTES.gallery), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(ROUTES.reviews), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(ROUTES.serviceAreas), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl(ROUTES.faq), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl(ROUTES.requestQuote), lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: absoluteUrl(serviceRoute(slug)),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const serviceAreaRoutes: MetadataRoute.Sitemap = getAllServiceAreaSlugs().map((slug) => ({
    url: absoluteUrl(serviceAreaRoute(slug)),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes, ...serviceAreaRoutes]
}
