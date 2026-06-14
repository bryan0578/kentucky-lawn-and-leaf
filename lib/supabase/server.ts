import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { QuoteRequestValues } from '@/lib/quote-form-schema'

export const QUOTE_REQUESTS_TABLE = 'quote_requests'

export type QuoteRequestRecord = {
  id?: string
  name: string
  phone: string
  email: string
  address_or_zip: string
  service_needed: string
  property_type: string
  preferred_contact_method: string
  message: string | null
  created_at?: string
}

/**
 * Expected Supabase table (run in the SQL editor):
 *
 * create table public.quote_requests (
 *   id uuid primary key default gen_random_uuid(),
 *   name text not null,
 *   phone text not null,
 *   email text not null,
 *   address_or_zip text not null,
 *   service_needed text not null,
 *   property_type text not null,
 *   preferred_contact_method text not null,
 *   message text,
 *   created_at timestamptz not null default now()
 * );
 *
 * alter table public.quote_requests enable row level security;
 */

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()

  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  }

  return url
}

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }

  return key
}

let adminClient: SupabaseClient | null = null

/** Server-only Supabase client using the service role key. */
export function createAdminClient(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(getSupabaseUrl(), getServiceRoleKey(), {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return adminClient
}

export function toQuoteRequestRecord(
  values: QuoteRequestValues,
): QuoteRequestRecord {
  return {
    name: values.name,
    phone: values.phone.trim() || 'Not provided',
    email: values.email.trim() || 'Not provided',
    address_or_zip: values.addressOrZip,
    service_needed: values.serviceNeeded,
    property_type: values.propertyType ?? 'Residential',
    preferred_contact_method: values.preferredContactMethod,
    message: values.message?.trim() || null,
  }
}

export async function insertQuoteRequest(
  values: QuoteRequestValues,
): Promise<QuoteRequestRecord> {
  const record = toQuoteRequestRecord(values)
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from(QUOTE_REQUESTS_TABLE)
    .insert(record)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save quote request: ${error.message}`)
  }

  return data as QuoteRequestRecord
}
