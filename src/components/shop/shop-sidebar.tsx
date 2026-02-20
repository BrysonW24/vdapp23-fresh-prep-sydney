'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RangeSlider } from '@/components/ui/range-slider'
import {
  useFilterStore,
  DEFAULT_CALORIE_RANGE,
  DEFAULT_PROTEIN_RANGE,
  DEFAULT_CARB_RANGE,
  DEFAULT_FAT_RANGE,
} from '@/lib/stores/filter-store'

const CATEGORIES = [
  { value: 'ALL', label: 'All Meals' },
  { value: 'CLASSIC', label: 'Classic' },
  { value: 'HIGH_PROTEIN', label: 'High Protein' },
  { value: 'LOW_CARB', label: 'Low Carb' },
  { value: 'PLANT_BASED', label: 'Plant Based' },
  { value: 'BREAKFAST', label: 'Breakfast' },
  { value: 'SNACK', label: 'Snack' },
  { value: 'BULK', label: 'Bulk' },
]

const PROTEIN_TYPES = [
  { value: 'chicken', label: 'Chicken' },
  { value: 'beef', label: 'Beef' },
  { value: 'lamb', label: 'Lamb' },
  { value: 'salmon', label: 'Salmon / Fish' },
  { value: 'tofu', label: 'Tofu / Plant' },
  { value: 'prawns', label: 'Prawns' },
]

const DIET_TYPES = [
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'dairy-free', label: 'Dairy Free' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'keto', label: 'Keto' },
  { value: 'high-protein', label: 'High Protein' },
  { value: 'low-carb', label: 'Low Carb' },
]

const PORTION_SIZES = [
  { value: 'standard', label: 'Standard' },
  { value: 'bulk', label: 'Bulk' },
]

// Collapsible filter section
function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border/50 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold text-charcoal hover:text-sage transition-colors"
      >
        {title}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

// Checkbox item
function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full cursor-pointer items-center gap-2 py-0.5 text-sm text-charcoal/80 hover:text-charcoal"
    >
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-colors',
          checked ? 'border-sage bg-sage' : 'border-border bg-white'
        )}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {label}
    </button>
  )
}

// Radio item
function RadioItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full cursor-pointer items-center gap-2 py-0.5 text-sm text-charcoal/80 hover:text-charcoal"
    >
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-full border transition-colors',
          checked ? 'border-sage' : 'border-border'
        )}
      >
        {checked && <div className="h-2 w-2 rounded-full bg-sage" />}
      </div>
      {label}
    </button>
  )
}

export function ShopSidebar({ className }: { className?: string }) {
  const {
    category,
    setCategory,
    proteinType,
    toggleProteinType,
    dietType,
    toggleDietType,
    calorieRange,
    setCalorieRange,
    proteinRange,
    setProteinRange,
    carbRange,
    setCarbRange,
    fatRange,
    setFatRange,
    portionSize,
    togglePortionSize,
    resetFilters,
    getActiveFilterCount,
  } = useFilterStore()

  const activeCount = getActiveFilterCount()

  return (
    <div className={cn('space-y-0', className)}>
      {/* Meal Type */}
      <FilterSection title="Meal Type" defaultOpen>
        {CATEGORIES.map((cat) => (
          <RadioItem
            key={cat.value}
            label={cat.label}
            checked={category === cat.value}
            onChange={() => setCategory(cat.value)}
          />
        ))}
      </FilterSection>

      {/* Protein Type */}
      <FilterSection title="Protein Type">
        {PROTEIN_TYPES.map((pt) => (
          <CheckboxItem
            key={pt.value}
            label={pt.label}
            checked={proteinType.includes(pt.value)}
            onChange={() => toggleProteinType(pt.value)}
          />
        ))}
      </FilterSection>

      {/* Diet */}
      <FilterSection title="Diet">
        {DIET_TYPES.map((dt) => (
          <CheckboxItem
            key={dt.value}
            label={dt.label}
            checked={dietType.includes(dt.value)}
            onChange={() => toggleDietType(dt.value)}
          />
        ))}
      </FilterSection>

      {/* Calorie Range */}
      <FilterSection title="Calories">
        <RangeSlider
          min={DEFAULT_CALORIE_RANGE[0]}
          max={DEFAULT_CALORIE_RANGE[1]}
          step={25}
          value={calorieRange}
          onValueChange={setCalorieRange}
          unit=" cal"
        />
      </FilterSection>

      {/* Protein Range */}
      <FilterSection title="Protein">
        <RangeSlider
          min={DEFAULT_PROTEIN_RANGE[0]}
          max={DEFAULT_PROTEIN_RANGE[1]}
          step={5}
          value={proteinRange}
          onValueChange={setProteinRange}
          unit="g"
        />
      </FilterSection>

      {/* Carbs Range */}
      <FilterSection title="Carbs">
        <RangeSlider
          min={DEFAULT_CARB_RANGE[0]}
          max={DEFAULT_CARB_RANGE[1]}
          step={5}
          value={carbRange}
          onValueChange={setCarbRange}
          unit="g"
        />
      </FilterSection>

      {/* Fat Range */}
      <FilterSection title="Fat">
        <RangeSlider
          min={DEFAULT_FAT_RANGE[0]}
          max={DEFAULT_FAT_RANGE[1]}
          step={5}
          value={fatRange}
          onValueChange={setFatRange}
          unit="g"
        />
      </FilterSection>

      {/* Portion Size */}
      <FilterSection title="Portion Size">
        {PORTION_SIZES.map((ps) => (
          <CheckboxItem
            key={ps.value}
            label={ps.label}
            checked={portionSize.includes(ps.value)}
            onChange={() => togglePortionSize(ps.value)}
          />
        ))}
      </FilterSection>

      {/* Reset */}
      {activeCount > 0 && (
        <div className="pt-4">
          <button
            onClick={resetFilters}
            className="w-full rounded-lg border border-border py-2 text-sm font-medium text-charcoal/70 hover:bg-cream hover:text-charcoal transition-colors"
          >
            Reset All Filters ({activeCount})
          </button>
        </div>
      )}
    </div>
  )
}
