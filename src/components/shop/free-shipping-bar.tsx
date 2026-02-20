'use client'

import { Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

const FREE_SHIPPING_THRESHOLD = 100

interface FreeShippingBarProps {
  subtotal: number
  className?: string
}

export function FreeShippingBar({ subtotal, className }: FreeShippingBarProps) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const qualified = remaining <= 0

  return (
    <div
      className={cn(
        'rounded-lg border p-3',
        qualified ? 'border-sage/30 bg-sage/5' : 'border-border bg-cream/30',
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <Truck className={cn('h-4 w-4 shrink-0', qualified ? 'text-sage' : 'text-charcoal/50')} />
        {qualified ? (
          <span className="font-medium text-sage">You qualify for free delivery!</span>
        ) : (
          <span className="text-charcoal/70">
            Spend <span className="font-semibold text-charcoal">${remaining.toFixed(2)}</span> more
            for free delivery
          </span>
        )}
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            qualified ? 'bg-sage' : 'bg-peach'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export { FREE_SHIPPING_THRESHOLD }
