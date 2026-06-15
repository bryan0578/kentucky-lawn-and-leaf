import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOutAdmin } from '@/app/admin/actions'

export default function AdminAccessDeniedPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="size-6" />
        </div>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground">
          Access denied
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You are signed in, but this account is not authorized to access the
          admin dashboard. Contact the site owner if you believe this is a
          mistake.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <form action={signOutAdmin}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
          <Button nativeButton={false} render={<Link href="/">Back to site</Link>} />
        </div>
      </div>
    </div>
  )
}
