'use server'

import { redirect } from 'next/navigation'
import { createAuthServerClient } from '@/lib/supabase/server-auth'

export async function signOutAdmin() {
  const supabase = await createAuthServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
