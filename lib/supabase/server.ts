import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { QuoteStatus, QuoteStatusFilter } from '@/lib/admin/quote-status'
import { isQuoteStatus } from '@/lib/admin/quote-status'
import { requireAdmin } from '@/lib/admin/auth'
import type { QuoteRequestValues } from '@/lib/quote-form-schema'
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from '@/lib/supabase/env'

export const QUOTE_REQUESTS_TABLE = 'quote_requests'

export type QuoteRequestRecord = {
  id: string
  name: string
  phone: string
  email: string
  address_or_zip: string
  service_needed: string
  property_type: string
  preferred_contact_method: string
  message: string | null
  status: QuoteStatus
  internal_notes: string | null
  created_at: string
}

export type QuoteRequestUpdate = {
  status?: QuoteStatus
  internal_notes?: string | null
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
 *   status text not null default 'new',
 *   internal_notes text,
 *   created_at timestamptz not null default now()
 * );
 *
 * alter table public.quote_requests enable row level security;
 *
 * alter table public.quote_requests
 *   add constraint quote_requests_status_check
 *   check (status in ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'lost'));
 *
 * -- Create admin users in Supabase Auth, then set ADMIN_EMAILS in your env.
 */

let adminClient: SupabaseClient | null = null

/** Server-only Supabase client using the service role key. */
export function createAdminClient(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return adminClient
}

function normalizeQuoteRecord(raw: Record<string, unknown>): QuoteRequestRecord {
  const statusValue = raw.status
  const status =
    typeof statusValue === 'string' && isQuoteStatus(statusValue)
      ? statusValue
      : 'new'

  return {
    id: String(raw.id),
    name: String(raw.name),
    phone: String(raw.phone),
    email: String(raw.email),
    address_or_zip: String(raw.address_or_zip),
    service_needed: String(raw.service_needed),
    property_type: String(raw.property_type),
    preferred_contact_method: String(raw.preferred_contact_method),
    message:
      raw.message === null || raw.message === undefined
        ? null
        : String(raw.message),
    status,
    internal_notes:
      raw.internal_notes === null || raw.internal_notes === undefined
        ? null
        : String(raw.internal_notes),
    created_at: String(raw.created_at),
  }
}

export function toQuoteRequestRecord(
  values: QuoteRequestValues,
): Omit<QuoteRequestRecord, 'id' | 'created_at' | 'internal_notes'> {
  return {
    name: values.name,
    phone: values.phone.trim() || 'Not provided',
    email: values.email.trim() || 'Not provided',
    address_or_zip: values.addressOrZip,
    service_needed: values.serviceNeeded,
    property_type: values.propertyType ?? 'Residential',
    preferred_contact_method: values.preferredContactMethod,
    message: values.message?.trim() || null,
    status: 'new',
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

  return normalizeQuoteRecord(data as Record<string, unknown>)
}

export async function listQuoteRequests(
  statusFilter: QuoteStatusFilter = 'all',
): Promise<QuoteRequestRecord[]> {
  await requireAdmin()

  const supabase = createAdminClient()
  let query = supabase
    .from(QUOTE_REQUESTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to load quote requests: ${error.message}`)
  }

  return (data ?? []).map((row) =>
    normalizeQuoteRecord(row as Record<string, unknown>),
  )
}

export async function getQuoteRequestById(
  id: string,
): Promise<QuoteRequestRecord | null> {
  await requireAdmin()

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from(QUOTE_REQUESTS_TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load quote request: ${error.message}`)
  }

  return data
    ? normalizeQuoteRecord(data as Record<string, unknown>)
    : null
}

export async function updateQuoteRequest(
  id: string,
  update: QuoteRequestUpdate,
): Promise<QuoteRequestRecord> {
  await requireAdmin()

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from(QUOTE_REQUESTS_TABLE)
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update quote request: ${error.message}`)
  }

  return normalizeQuoteRecord(data as Record<string, unknown>)
}

export async function countQuoteRequestsByStatus(
  status: QuoteStatus,
): Promise<number> {
  await requireAdmin()

  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from(QUOTE_REQUESTS_TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('status', status)

  if (error) {
    throw new Error(`Failed to count quote requests: ${error.message}`)
  }

  return count ?? 0
}
