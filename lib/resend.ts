import 'server-only'

import { Resend } from 'resend'
import { COMPANY } from '@/lib/site-data'
import type { QuoteRequestRecord } from '@/lib/supabase/server'

function getResendApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }

  return apiKey
}

function getQuoteNotificationEmail(): string {
  const email = process.env.QUOTE_NOTIFICATION_EMAIL?.trim()

  if (!email) {
    throw new Error('Missing QUOTE_NOTIFICATION_EMAIL')
  }

  return email
}

function getFromEmail(): string {
  const email = process.env.QUOTE_FROM_EMAIL?.trim()

  if (!email) {
    throw new Error('Missing QUOTE_FROM_EMAIL')
  }

  return email
}

let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey())
  }

  return resendClient
}

function buildQuoteEmailHtml(record: QuoteRequestRecord): string {
  const rows = [
    ['Name', record.name],
    ['Phone', record.phone],
    ['Email', record.email],
    ['Address or ZIP', record.address_or_zip],
    ['Service needed', record.service_needed],
    ['Property type', record.property_type],
    ['Preferred contact', record.preferred_contact_method],
    ['Message', record.message || '—'],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td></tr>`,
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;color:#1f2937;max-width:640px;">
      <h2 style="margin:0 0 12px;">New quote request</h2>
      <p style="margin:0 0 20px;color:#4b5563;">
        A new quote request was submitted on the ${COMPANY.name} website.
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${tableRows}
      </table>
    </div>
  `
}

export async function sendQuoteNotificationEmail(
  record: QuoteRequestRecord,
): Promise<void> {
  const resend = getResendClient()
  const customerEmail = record.email.trim()
  const hasCustomerEmail =
    customerEmail.length > 0 && customerEmail !== 'Not provided'

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: getQuoteNotificationEmail(),
    ...(hasCustomerEmail ? { replyTo: customerEmail } : {}),
    subject: 'New Quote Request - Kentucky Lawn & Leaf',
    html: buildQuoteEmailHtml(record),
    text: [
      'New quote request',
      '',
      `Name: ${record.name}`,
      `Phone: ${record.phone}`,
      `Email: ${record.email}`,
      `Address or ZIP: ${record.address_or_zip}`,
      `Service needed: ${record.service_needed}`,
      `Property type: ${record.property_type}`,
      `Preferred contact: ${record.preferred_contact_method}`,
      `Message: ${record.message || '—'}`,
    ].join('\n'),
  })

  if (error) {
    throw new Error(`Failed to send quote notification email: ${error.message}`)
  }
}
