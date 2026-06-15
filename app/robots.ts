import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { SITE } from '@/lib/site-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE.url,
  }
}
