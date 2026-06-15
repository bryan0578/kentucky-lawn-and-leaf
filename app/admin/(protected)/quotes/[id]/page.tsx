import { notFound } from 'next/navigation'
import { QuoteDetailPanel } from '@/components/admin/QuoteDetailPanel'
import { getQuoteRequestById } from '@/lib/supabase/server'

type QuoteDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminQuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params
  const quote = await getQuoteRequestById(id)

  if (!quote) {
    notFound()
  }

  return <QuoteDetailPanel quote={quote} />
}
