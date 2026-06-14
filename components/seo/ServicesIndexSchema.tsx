import { JsonLd } from '@/components/seo/JsonLd'
import { buildServicesIndexJsonLd } from '@/lib/structured-data'

export function ServicesIndexSchema() {
  return <JsonLd data={buildServicesIndexJsonLd()} />
}
