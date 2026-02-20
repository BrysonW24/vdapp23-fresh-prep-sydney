'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuantitySelector } from '@/components/ui/quantity-selector'
import { useCartStore } from '@/lib/stores/cart-store'

interface MealDetailActionsProps {
  mealId: string
  name: string
  slug: string
  price: number
  image: string
  className?: string
}

export function MealDetailActions({
  mealId,
  name,
  slug,
  price,
  image,
  className,
}: MealDetailActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const cartItems = useCartStore((s) => s.items)

  const inCart = cartItems.find((i) => i.mealId === mealId)

  function handleAddToCart() {
    addItem({ mealId, name, slug, price, image }, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={20} />

        <button
          onClick={handleAddToCart}
          disabled={justAdded}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all duration-200',
            justAdded
              ? 'bg-green-600 text-white'
              : 'bg-sage text-white hover:bg-sage-dark active:scale-[0.98]'
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart — ${(price * quantity).toFixed(2)}
            </>
          )}
        </button>
      </div>

      {/* In-cart indicator */}
      {inCart && !justAdded && (
        <p className="text-sm text-sage font-medium">
          ✓ In your cart ({inCart.quantity} {inCart.quantity === 1 ? 'item' : 'items'})
        </p>
      )}
    </div>
  )
}
