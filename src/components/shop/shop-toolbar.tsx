'use client'

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useFilterStore } from '@/lib/stores/filter-store'

interface ShopToolbarProps {
  filteredCount: number
  totalCount: number
  onOpenFilters: () => void
  className?: string
}

export function ShopToolbar({
  filteredCount,
  totalCount,
  onOpenFilters,
  className,
}: ShopToolbarProps) {
  const { searchQuery, setSearch, sortBy, setSortBy, getActiveFilterCount } =
    useFilterStore()
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const activeCount = getActiveFilterCount()

  // Debounced search
  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        setSearch(value)
      }, 300)
    },
    [setSearch]
  )

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const SORT_OPTIONS = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'calories', label: 'Calories: Low to High' },
    { value: 'protein', label: 'Protein: High to Low' },
  ]

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortBy)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      {/* Left: mobile filter button + result count */}
      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-cream transition-colors lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>

        {/* Result count */}
        <p className="text-sm text-charcoal/60">
          Showing{' '}
          <span className="font-semibold text-charcoal">{filteredCount}</span>
          {filteredCount !== totalCount && (
            <>
              {' '}
              of{' '}
              <span className="font-semibold text-charcoal">{totalCount}</span>
            </>
          )}{' '}
          meals
        </p>
      </div>

      {/* Right: search + sort */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 sm:w-56 sm:flex-none">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search meals..."
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30 transition-colors"
          />
        </div>

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-cream transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">Sort:</span>
            <span className="text-charcoal/70">
              {currentSort?.label || 'Name'}
            </span>
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform',
                sortOpen && 'rotate-180'
              )}
            />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-border bg-white shadow-lg">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value)
                    setSortOpen(false)
                  }}
                  className={cn(
                    'block w-full px-3 py-2 text-left text-sm transition-colors',
                    sortBy === option.value
                      ? 'bg-sage/10 font-medium text-sage'
                      : 'text-charcoal hover:bg-cream/50'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
