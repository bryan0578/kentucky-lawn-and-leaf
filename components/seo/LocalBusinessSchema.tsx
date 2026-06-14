import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusinessJsonLd } from '@/lib/structured-data'

export function LocalBusinessSchema() {
  return <JsonLd data={buildLocalBusinessJsonLd()} />
}
