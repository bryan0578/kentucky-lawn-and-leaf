'use server'

import { redirect } from 'next/navigation'
import { isAdminEmail } from '@/lib/admin/auth'
import { createAuthServerClient } from '@/lib/supabase/server-auth'

export type SignInActionState = {
  ok: boolean
  message?: string
}

export async function signInAdminAction(
  _prevState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { ok: false, message: 'Email and password are required.' }
  }

  if (!isAdminEmail(email)) {
    return {
      ok: false,
      message: 'This email is not authorized for admin access.',
    }
  }

  const supabase = await createAuthServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { ok: false, message: error.message }
  }

  redirect('/admin/quotes')
}
