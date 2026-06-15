'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Inbox, LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { signOutAdmin } from '@/app/admin/actions'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/quotes', label: 'Quote Inbox', icon: Inbox, exact: false },
]

interface AdminShellProps {
  email: string
  children: React.ReactNode
}

export function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
              Admin
            </p>
            <h1 className="font-heading text-lg font-semibold">
              {COMPANY.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-primary-foreground/80 sm:inline">
              {email}
            </span>
            <form action={signOutAdmin}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-card">
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
