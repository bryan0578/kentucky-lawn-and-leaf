import { NextResponse } from 'next/server'
import { quoteRequestSchema } from '@/lib/quote-form-schema'
import { sendQuoteNotificationEmail } from '@/lib/resend'
import { insertQuoteRequest } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = quoteRequestSchema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]

      return NextResponse.json(
        {
          success: false,
          error:
            firstIssue?.message ??
            'Please check the form and try again.',
          code: 'validation',
        },
        { status: 400 },
      )
    }

    const values = {
      ...parsed.data,
      message: parsed.data.message?.trim() || undefined,
    }

    const record = await insertQuoteRequest(values)

    let message = 'Quote request received.'

    try {
      await sendQuoteNotificationEmail(record)
    } catch (emailError) {
      console.error('[QuoteRequest] Email notification failed:', emailError)
      message =
        'Your quote request was saved successfully, but we could not send our team an email notification. We will still follow up with you as soon as possible.'
    }

    return NextResponse.json({
      success: true,
      message,
    })
  } catch (error) {
    console.error('[QuoteRequest] API error:', error)

    return NextResponse.json(
      {
        success: false,
        error:
          'We could not send your request right now. Please try again or call us directly.',
      },
      { status: 500 },
    )
  }
}
