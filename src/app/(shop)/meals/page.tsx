'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { MealCard } from '@/components/shop/meal-card'
import { ShopSidebar } from '@/components/shop/shop-sidebar'
import { ShopToolbar } from '@/components/shop/shop-toolbar'
import { MobileFilterDrawer } from '@/components/shop/mobile-filter-drawer'
import { useFilteredMeals } from '@/hooks/use-filtered-meals'

export default function MealsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { meals, isLoading, error, totalCount, filteredCount } =
    useFilteredMeals()

  return (
    <div className="bg-warm-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Our Meals
          </h1>
          <p className="mt-2 text-charcoal/60">
            Chef-prepared, macro-balanced meals delivered fresh across Sydney.
          </p>
        </div>

        {/* Toolbar (search, sort, mobile filter trigger) */}
        <ShopToolbar
          filteredCount={filteredCount}
          totalCount={totalCount}
          onOpenFilters={() => setDrawerOpen(true)}
          className="mb-6"
        />

        {/* Main content: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 space-y-0 rounded-xl border border-border bg-white p-4 shadow-sm">
              <ShopSidebar />
            </div>
          </aside>

          {/* Meal grid */}
          <div className="flex-1">
            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-sage" />
                <span className="ml-3 text-charcoal/60">
                  Loading meals...
                </span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-red-600 font-medium">
                  Something went wrong loading meals.
                </p>
                <p className="mt-1 text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && meals.length === 0 && (
              <div className="rounded-xl border border-border bg-white p-12 text-center">
                <p className="text-4xl">🍽️</p>
                <p className="mt-3 font-heading text-lg font-semibold text-charcoal">
                  No meals found
                </p>
                <p className="mt-1 text-sm text-charcoal/60">
                  Try adjusting your filters or search to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}

            {/* Results grid */}
            {!isLoading && !error && meals.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {meals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filteredCount={filteredCount}
      />
    </div>
  )
}
