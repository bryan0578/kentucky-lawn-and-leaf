import Image from 'next/image'
import Link from 'next/link'
import { Phone, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES, SECTION_IDS } from '@/lib/constants'
import { COMPANY, HERO } from '@/lib/site-data'

export function HeroSection() {
  return (
    <section id={SECTION_IDS.top} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-gold" />
            {HERO.badge}
          </span>

          <h1 className="mt-5 text-pretty font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {HERO.title}
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {HERO.description}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 px-6 text-base"
              render={
                <Link href={ROUTES.requestQuote}>Get My Free Quote</Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 border-primary/30 px-6 text-base text-primary hover:bg-primary/5"
              render={
                <a href={COMPANY.phoneHref}>
                  <Phone className="size-4" />
                  Call Now {COMPANY.phone}
                </a>
              }
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {HERO.trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <CheckCircle2 className="size-4 text-primary" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/5">
            <Image
              src={HERO.image.src}
              alt={HERO.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="text-2xl font-semibold text-primary">
              {HERO.statBadge.value}
            </p>
            <p className="text-xs font-medium text-muted-foreground whitespace-pre-line">
              {HERO.statBadge.label}
            </p>
          </div>

          <div className="absolute -right-2 -top-4 hidden items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-gold-foreground">
              <CheckCircle2 className="size-5 text-gold" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {HERO.quoteBadge.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {HERO.quoteBadge.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
