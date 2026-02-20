'use client'

import { MealCard } from '@/components/shop/meal-card'
import type { MealWithNutrition } from '@/hooks/use-filtered-meals'

interface HomeFeaturedMealsProps {
  meals: MealWithNutrition[]
}

export function HomeFeaturedMeals({ meals }: HomeFeaturedMealsProps) {
  if (meals.length === 0) {
    return (
      <p className="text-center text-charcoal/60">
        Check back soon for this week&apos;s menu!
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  )
}
