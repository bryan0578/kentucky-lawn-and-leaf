'use server'

import { revalidatePath } from 'next/cache'
import { isQuoteStatus } from '@/lib/admin/quote-status'
import { updateQuoteRequest } from '@/lib/supabase/server'

export type UpdateQuoteActionState = {
  ok: boolean
  message?: string
}

export async function updateQuoteRequestAction(
  id: string,
  _prevState: UpdateQuoteActionState,
  formData: FormData,
): Promise<UpdateQuoteActionState> {
  const status = String(formData.get('status') ?? '')
  const internalNotes = String(formData.get('internal_notes') ?? '')

  if (!isQuoteStatus(status)) {
    return { ok: false, message: 'Please choose a valid status.' }
  }

  try {
    await updateQuoteRequest(id, {
      status,
      internal_notes: internalNotes.trim() || null,
    })

    revalidatePath('/admin/quotes')
    revalidatePath(`/admin/quotes/${id}`)
    revalidatePath('/admin')

    return { ok: true, message: 'Quote request updated.' }
  } catch (error) {
    console.error('[Admin] Failed to update quote request:', error)
    return {
      ok: false,
      message: 'Could not save changes. Please try again.',
    }
  }
}
