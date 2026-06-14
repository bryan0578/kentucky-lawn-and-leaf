'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

type GalleryFilter = 'All' | GalleryCategory

interface GalleryGridProps {
  items?: GalleryItem[]
  showFilters?: boolean
  limit?: number
  gridClassName?: string
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
        <span className="absolute left-3 top-3 rounded-full border border-background/20 bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {item.category}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-heading text-lg font-semibold text-background sm:text-xl">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {item.description}
        </p>
      </div>
    </article>
  )
}

export function GalleryGrid({
  items = GALLERY_ITEMS,
  showFilters = false,
  limit,
  gridClassName,
}: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All')
  const filters: GalleryFilter[] = ['All', ...GALLERY_CATEGORIES]

  const visibleItems = useMemo(() => {
    const filtered =
      activeFilter === 'All'
        ? items
        : items.filter((item) => item.category === activeFilter)

    return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
  }, [activeFilter, items, limit])

  return (
    <>
      {showFilters && (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                activeFilter === filter
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div
        className={cn(
          'grid gap-6 sm:grid-cols-2 xl:grid-cols-3',
          showFilters ? 'mt-10' : 'mt-12',
          gridClassName,
        )}
      >
        {visibleItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {visibleItems.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          No projects found in this category yet.
        </p>
      )}
    </>
  )
}
