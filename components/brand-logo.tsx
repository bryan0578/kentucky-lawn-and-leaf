import Image from 'next/image'
import { SITE } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type EmblemTone = 'default' | 'light'

interface BrandEmblemProps {
  className?: string
  tone?: EmblemTone
}

/** Kentucky Lawn & Leaf circular emblem mark. */
export function BrandEmblem({ className }: BrandEmblemProps) {
  return (
    <Image
      src={SITE.logo}
      alt="Kentucky Lawn & Leaf emblem"
      width={48}
      height={48}
      className={cn('size-12', className)}
    />
  )
}

type WordmarkTone = 'default' | 'light'

interface BrandLogoProps {
  className?: string
  tone?: WordmarkTone
  /** Hide the wordmark to show the emblem only (favicons, tight spaces). */
  emblemOnly?: boolean
  emblemClassName?: string
}

export function BrandLogo({
  className,
  tone = 'default',
  emblemOnly = false,
  emblemClassName,
}: BrandLogoProps) {
  const primaryText =
    tone === 'light' ? 'text-primary-foreground' : 'text-foreground'
  const accentText = tone === 'light' ? 'text-gold' : 'text-primary'
  const kickerText =
    tone === 'light' ? 'text-primary-foreground/60' : 'text-muted-foreground'

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <BrandEmblem tone={tone} className={emblemClassName} />
      {!emblemOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-heading text-lg font-semibold tracking-tight',
              primaryText,
            )}
          >
            Kentucky <span className={accentText}>Lawn &amp; Leaf</span>
          </span>
          <span
            className={cn(
              'mt-1 text-[0.625rem] font-medium uppercase tracking-[0.18em]',
              kickerText,
            )}
          >
            Lawn · Landscape · Leaf Removal
          </span>
        </span>
      )}
    </span>
  )
}
