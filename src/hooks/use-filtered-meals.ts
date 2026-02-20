'use client'

import { useState, useEffect, useMemo } from 'react'
import { useFilterStore } from '@/lib/stores/filter-store'
import type { MealSummary, MacroSummary } from '@/types'

export interface MealWithNutrition extends MealSummary {
  nutrition: MacroSummary | null
}

interface UseFilteredMealsReturn {
  meals: MealWithNutrition[]
  isLoading: boolean
  error: string | null
  totalCount: number
  filteredCount: number
}

export function useFilteredMeals(): UseFilteredMealsReturn {
  const [allMeals, setAllMeals] = useState<MealWithNutrition[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    category,
    proteinType,
    dietType,
    calorieRange,
    proteinRange,
    carbRange,
    fatRange,
    portionSize,
    searchQuery,
    sortBy,
  } = useFilterStore()

  // Fetch all meals once
  useEffect(() => {
    async function fetchMeals() {
      try {
        setIsLoading(true)
        const res = await fetch('/api/meals?limit=100')
        if (!res.ok) throw new Error('Failed to fetch meals')
        const json = await res.json()
        if (json.success && json.data?.items) {
          setAllMeals(
            json.data.items.map((meal: any) => ({
              id: meal.id,
              name: meal.name,
              slug: meal.slug,
              price: typeof meal.price === 'string' ? parseFloat(meal.price) : meal.price,
              image: meal.images?.[0] || meal.image || '',
              category: meal.category,
              shortDescription: meal.shortDescription,
              tags: meal.tags || [],
              nutrition: meal.nutrition
                ? {
                    calories: meal.nutrition.calories,
                    protein: meal.nutrition.protein,
                    carbs: meal.nutrition.carbs,
                    fat: meal.nutrition.fat,
                  }
                : null,
            }))
          )
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchMeals()
  }, [])

  // Client-side filtering + sorting
  const filtered = useMemo(() => {
    let result = [...allMeals]

    // Category filter
    if (category !== 'ALL') {
      result = result.filter((m) => m.category === category)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.shortDescription?.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Protein type tag filter (any match)
    if (proteinType.length > 0) {
      result = result.filter((m) =>
        proteinType.some((pt) => m.tags.some((t) => t.toLowerCase().includes(pt.toLowerCase())))
      )
    }

    // Diet type tag filter (all must match)
    if (dietType.length > 0) {
      result = result.filter((m) =>
        dietType.every((dt) => m.tags.some((t) => t.toLowerCase().includes(dt.toLowerCase())))
      )
    }

    // Portion size filter
    if (portionSize.length > 0) {
      result = result.filter((m) => {
        if (portionSize.includes('bulk')) return m.category === 'BULK'
        if (portionSize.includes('standard')) return m.category !== 'BULK'
        return true
      })
    }

    // Macro range filters
    if (result.length > 0) {
      result = result.filter((m) => {
        if (!m.nutrition) return true
        const n = m.nutrition
        return (
          n.calories >= calorieRange[0] &&
          n.calories <= calorieRange[1] &&
          n.protein >= proteinRange[0] &&
          n.protein <= proteinRange[1] &&
          n.carbs >= carbRange[0] &&
          n.carbs <= carbRange[1] &&
          n.fat >= fatRange[0] &&
          n.fat <= fatRange[1]
        )
      })
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'calories':
          return (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0)
        case 'protein':
          return (b.nutrition?.protein || 0) - (a.nutrition?.protein || 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return result
  }, [allMeals, category, proteinType, dietType, calorieRange, proteinRange, carbRange, fatRange, portionSize, searchQuery, sortBy])

  return {
    meals: filtered,
    isLoading,
    error,
    totalCount: allMeals.length,
    filteredCount: filtered.length,
  }
}
