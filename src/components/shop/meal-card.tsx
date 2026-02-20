'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/stores/cart-store'
import type { MealWithNutrition } from '@/hooks/use-filtered-meals'

// Map tags to display labels
const TAG_DISPLAY: Record<string, { label: string; className: string }> = {
  'high-protein': { label: 'HIGH PROTEIN', className: 'bg-charcoal text-white' },
  'gluten-free': { label: 'GF', className: 'bg-sage text-white' },
  'dairy-free': { label: 'DF', className: 'bg-sage text-white' },
  vegan: { label: 'VEGAN', className: 'bg-green-600 text-white' },
  'plant-based': { label: 'PLANT', className: 'bg-green-600 text-white' },
  'low-carb': { label: 'LOW CARB', className: 'bg-charcoal text-white' },
  keto: { label: 'KETO', className: 'bg-charcoal text-white' },
  premium: { label: 'PREMIUM', className: 'bg-peach-dark text-white' },
  popular: { label: 'POPULAR', className: 'bg-peach text-charcoal' },
  'budget-friendly': { label: 'VALUE', className: 'bg-sage-light text-charcoal' },
}

interface MealCardProps {
  meal: MealWithNutrition
  className?: string
}

export function MealCard({ meal, className }: MealCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const cartItems = useCartStore((s) => s.items)
  const [justAdded, setJustAdded] = useState(false)

  const inCart = cartItems.find((i) => i.mealId === meal.id)
  const displayTags = meal.tags
    .filter((t) => TAG_DISPLAY[t])
    .slice(0, 3)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      mealId: meal.id,
      name: meal.name,
      slug: meal.slug,
      price: meal.price,
      image: meal.image,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
        className
      )}
    >
      {/* Image with tag overlays */}
      <Link href={`/meals/${meal.slug}`} className="relative aspect-[4/3] overflow-hidden bg-cream">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-cream-light">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {/* Tag overlays */}
        {displayTags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {displayTags.map((tag) => {
              const display = TAG_DISPLAY[tag]
              return (
                <span
                  key={tag}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm',
                    display.className
                  )}
                >
                  {display.label}
                </span>
              )
            })}
          </div>
        )}
        {/* Cart badge */}
        {inCart && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sage text-[10px] font-bold text-white shadow-sm">
            {inCart.quantity}
          </div>
        )}
      </Link>

      {/* Macro row */}
      {meal.nutrition && (
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
          <div className="flex items-center gap-0.5 text-[11px]">
            <span className="font-semibold text-charcoal">{meal.nutrition.calories}</span>
            <span className="text-charcoal/50">cal</span>
          </div>
          <div className="flex items-center gap-0.5 text-[11px]">
            <span className="font-semibold text-sage-dark">{meal.nutrition.protein}g</span>
            <span className="text-charcoal/50">protein</span>
          </div>
          <div className="flex items-center gap-0.5 text-[11px]">
            <span className="font-semibold text-charcoal">{meal.nutrition.carbs}g</span>
            <span className="text-charcoal/50">carbs</span>
          </div>
          <div className="flex items-center gap-0.5 text-[11px]">
            <span className="font-semibold text-charcoal">{meal.nutrition.fat}g</span>
            <span className="text-charcoal/50">fat</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <Link href={`/meals/${meal.slug}`}>
          <h3 className="font-heading text-base font-semibold text-charcoal line-clamp-1 group-hover:text-sage transition-colors">
            {meal.name}
          </h3>
        </Link>
        {meal.shortDescription && (
          <p className="mt-1 text-xs text-charcoal/60 line-clamp-2">
            {meal.shortDescription}
          </p>
        )}
      </div>

      {/* Add to Cart button with price */}
      <div className="p-3 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={justAdded}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200',
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
              ${meal.price.toFixed(2)} — Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
