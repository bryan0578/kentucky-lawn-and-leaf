'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BeforeAfterSliderProps {
  before: {
    src: string
    alt: string
  }
  after: {
    src: string
    alt: string
  }
  className?: string
}

export function BeforeAfterSlider({
  before,
  after,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    if (rect.width <= 0) return

    const nextPosition = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, nextPosition)))
  }, [])

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(true)
      updatePosition(event.clientX)
    },
    [updatePosition],
  )

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (event: PointerEvent) => {
      event.preventDefault()
      updatePosition(event.clientX)
    }

    const stopDragging = () => {
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: false })
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [isDragging, updatePosition])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setPosition((current) => Math.max(0, current - 2))
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setPosition((current) => Math.min(100, current + 2))
      }
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Compare before and after photos"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 outline-none focus-visible:ring-3 focus-visible:ring-ring/30 lg:aspect-video',
        isDragging && 'cursor-grabbing',
        className,
      )}
    >
      <Image
        src={before.src}
        alt={before.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 980px"
        className="pointer-events-none object-cover"
        draggable={false}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 980px"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-background shadow-[0_0_0_1px_rgba(255,255,255,0.85),0_0_18px_rgba(0,0,0,0.45)]"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-background bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-2 ring-gold/70">
          <span className="flex items-center gap-0.5 text-sm font-bold tracking-tight">
            <span aria-hidden>&lsaquo;</span>
            <span aria-hidden>&rsaquo;</span>
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-background/20 bg-foreground/75 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-background backdrop-blur sm:left-4 sm:top-4">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-background/20 bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground backdrop-blur sm:right-4 sm:top-4">
        After
      </span>
    </div>
  )
}
