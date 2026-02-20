'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/stores/cart-store'

const FREE_SHIPPING_THRESHOLD = 100

export function StickyCartBar({ className }: { className?: string }) {
  const getItemCount = useCartStore((s) => s.getItemCount)
  const getSubtotal = useCartStore((s) => s.getSubtotal)

  const itemCount = getItemCount()
  const subtotal = getSubtotal()

  if (itemCount === 0) return null

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 border-t border-sage-dark bg-sage shadow-[0_-2px_10px_rgba(0,0,0,0.15)]',
        className
      )}
    >
      <div className="container mx-auto px-4 py-3">
        {/* Free shipping progress */}
        {remaining > 0 && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-[11px] text-white/80 mb-1">
              <span>Spend ${remaining.toFixed(2)} more for free delivery</span>
              <span>${subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-peach transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        {remaining <= 0 && (
          <p className="mb-2 text-center text-[11px] font-medium text-peach-light">
            ✓ You qualify for free delivery!
          </p>
        )}

        {/* Cart link */}
        <Link
          href="/cart"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-sage hover:bg-cream transition-colors"
        >
          <ShoppingBag className="h-4 w-4" />
          View Cart ({itemCount}) · ${subtotal.toFixed(2)}
        </Link>
      </div>
    </div>
  )
}
