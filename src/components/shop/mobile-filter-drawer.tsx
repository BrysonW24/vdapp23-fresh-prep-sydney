'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ShopSidebar } from '@/components/shop/shop-sidebar'
import { useFilterStore } from '@/lib/stores/filter-store'

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filteredCount: number
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filteredCount,
}: MobileFilterDrawerProps) {
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const getActiveFilterCount = useFilterStore((s) => s.getActiveFilterCount)

  const activeCount = getActiveFilterCount()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-heading text-lg font-semibold text-charcoal">
            Filters
            {activeCount > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-charcoal/60 hover:bg-cream hover:text-charcoal transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <ShopSidebar />
        </div>

        {/* Footer with action buttons */}
        <div className="border-t border-border p-4 space-y-2">
          {/* Show results button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-sage py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
          >
            Show {filteredCount} {filteredCount === 1 ? 'Result' : 'Results'}
          </button>

          {/* Reset button */}
          {activeCount > 0 && (
            <button
              onClick={() => {
                resetFilters()
              }}
              className="w-full rounded-lg border border-border py-2 text-sm font-medium text-charcoal/70 hover:bg-cream hover:text-charcoal transition-colors"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>
    </>
  )
}
