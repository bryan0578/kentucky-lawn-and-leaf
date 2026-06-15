import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isAdminEmail } from '@/lib/admin/auth'
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })

        supabaseResponse = NextResponse.next({ request })

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isAccessDeniedPage = pathname === '/admin/access-denied'
  const isAuthorized = isAdminEmail(user?.email)

  if (isLoginPage) {
    if (user && isAuthorized) {
      return NextResponse.redirect(new URL('/admin/quotes', request.url))
    }

    return supabaseResponse
  }

  if (isAccessDeniedPage) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isAuthorized) {
      return NextResponse.redirect(new URL('/admin/quotes', request.url))
    }

    return supabaseResponse
  }

  if (!user) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!isAuthorized) {
    return NextResponse.redirect(new URL('/admin/access-denied', request.url))
  }

  return supabaseResponse
}
