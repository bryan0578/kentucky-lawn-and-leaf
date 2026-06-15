import 'server-only'

import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/supabase/server-auth'

/**
 * Comma-separated admin emails in ADMIN_EMAILS, e.g.:
 * ADMIN_EMAILS=owner@example.com,manager@example.com
 */
export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS?.trim()

  if (!raw) {
    return []
  }

  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) {
    return false
  }

  const admins = getAdminEmails()

  if (admins.length === 0) {
    return false
  }

  return admins.includes(email.trim().toLowerCase())
}

export type AdminAuthResult =
  | { ok: true; email: string; userId: string }
  | { ok: false; reason: 'unauthenticated' | 'unauthorized' }

export async function getAdminAuth(): Promise<AdminAuthResult> {
  const user = await getSessionUser()

  if (!user?.email) {
    return { ok: false, reason: 'unauthenticated' }
  }

  if (!isAdminEmail(user.email)) {
    return { ok: false, reason: 'unauthorized' }
  }

  return { ok: true, email: user.email, userId: user.id }
}

export async function requireAdmin(): Promise<{ email: string; userId: string }> {
  const auth = await getAdminAuth()

  if (!auth.ok) {
    if (auth.reason === 'unauthenticated') {
      redirect('/admin/login')
    }

    redirect('/admin/access-denied')
  }

  return auth
}
