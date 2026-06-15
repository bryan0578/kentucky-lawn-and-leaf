'use client'

import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY } from '@/lib/site-data'
import {
  signInAdminAction,
  type SignInActionState,
} from '@/app/admin/login/actions'

const initialState: SignInActionState = { ok: false }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAdminAction,
    initialState,
  )

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Admin sign in
        </p>
        <h1 className="mt-2 font-heading text-2xl font-semibold text-foreground">
          {COMPANY.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your authorized admin account to manage quote requests.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          {state.message && (
            <p
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {state.message}
            </p>
          )}

          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50"
            />
          </div>

          <Button type="submit" className="h-11 w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
