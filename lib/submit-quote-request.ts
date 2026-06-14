import type { QuoteRequestValues } from '@/lib/quote-form-schema'

export type QuoteSubmissionResult =
  | { success: true; data: QuoteRequestValues; message: string }
  | {
      success: false
      error: string
      isValidationError?: boolean
    }

type QuoteApiResponse = {
  success: boolean
  error?: string
  message?: string
  code?: string
}

const defaultErrorMessage =
  'We could not send your request right now. Please try again or call us directly.'

const validationFallbackMessage =
  'Please review the highlighted fields and try again.'

export async function submitQuoteRequest(
  data: QuoteRequestValues,
): Promise<QuoteSubmissionResult> {
  try {
    const response = await fetch('/api/quote-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let result: QuoteApiResponse | null = null

    try {
      result = (await response.json()) as QuoteApiResponse
    } catch (parseError) {
      console.error('[QuoteRequest] Invalid API response:', parseError)

      return {
        success: false,
        error: defaultErrorMessage,
      }
    }

    if (!response.ok || !result.success) {
      const isValidationError =
        response.status === 400 || result.code === 'validation'

      return {
        success: false,
        isValidationError,
        error: isValidationError
          ? (result.error ?? validationFallbackMessage)
          : (result.error ?? defaultErrorMessage),
      }
    }

    return {
      success: true,
      data,
      message: result.message ?? 'Quote request received.',
    }
  } catch (error) {
    console.error('[QuoteRequest] Submission failed:', error)

    const isOffline =
      typeof navigator !== 'undefined' && navigator.onLine === false

    return {
      success: false,
      error: isOffline
        ? 'You appear to be offline. Check your connection and try again, or call us directly.'
        : defaultErrorMessage,
    }
  }
}
