'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/stores/cart-store'

interface StickyAtcBarProps {
  mealId: string
  name: string
  slug: string
  price: number
  image: string
  /** Ref ID of the main ATC button to observe */
  observeTargetId: string
}

export function StickyAtcBar({
  mealId,
  name,
  slug,
  price,
  image,
  observeTargetId,
}: StickyAtcBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  // Show bar when main ATC button scrolls out of view
  useEffect(() => {
    const target = document.getElementById(observeTargetId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when main ATC is NOT visible
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [observeTargetId])

  function handleAdd() {
    addItem({ mealId, name, slug, price, image })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        {/* Thumbnail */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" sizes="40px" />
          ) : (
            <div className="flex h-full items-center justify-center text-lg">🍽️</div>
          )}
        </div>

        {/* Name + Price */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-charcoal truncate">{name}</p>
          <p className="text-sm text-sage font-medium">${price.toFixed(2)}</p>
        </div>

        {/* ATC Button */}
        <button
          onClick={handleAdd}
          disabled={justAdded}
          className={cn(
            'flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all',
            justAdded
              ? 'bg-green-600 text-white'
              : 'bg-sage text-white hover:bg-sage-dark active:scale-[0.98]'
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
