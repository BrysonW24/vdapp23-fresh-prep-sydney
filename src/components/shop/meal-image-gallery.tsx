'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MealImageGalleryProps {
  images: string[]
  name: string
  className?: string
}

export function MealImageGallery({ images, name, className }: MealImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Fallback if no images
  const allImages = images.length > 0 ? images : []

  if (allImages.length === 0) {
    return (
      <div className={cn('aspect-square overflow-hidden rounded-2xl bg-cream', className)}>
        <div className="flex h-full items-center justify-center">
          <span className="text-6xl">🍽️</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
        <Image
          src={allImages[activeIndex]}
          alt={`${name} - Image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                idx === activeIndex
                  ? 'border-sage ring-1 ring-sage/30'
                  : 'border-border hover:border-sage/50'
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
