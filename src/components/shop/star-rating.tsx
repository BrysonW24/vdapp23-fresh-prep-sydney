'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

const SIZES = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const sizeClass = SIZES[size]

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const starValue = i + 1
        const filled = starValue <= rating
        const halfFilled = !filled && starValue - 0.5 <= rating

        return interactive ? (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="p-0.5 transition-transform hover:scale-110"
            aria-label={`Rate ${starValue} stars`}
          >
            <Star
              className={cn(
                sizeClass,
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : halfFilled
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'fill-none text-charcoal/20'
              )}
            />
          </button>
        ) : (
          <Star
            key={i}
            className={cn(
              sizeClass,
              filled
                ? 'fill-amber-400 text-amber-400'
                : halfFilled
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-none text-charcoal/20'
            )}
          />
        )
      })}
    </div>
  )
}
