import { TRUST_ITEMS } from '@/lib/site-data'

export function TrustBar() {
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-center gap-3 py-5 text-center"
          >
            <item.icon className="size-5 shrink-0 text-gold" />
            <span className="text-sm font-semibold sm:text-base">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
