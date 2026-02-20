'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  label?: string
  unit?: string
  className?: string
}

function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  label,
  unit = '',
  className,
}: RangeSliderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-charcoal">{label}</span>
          <span className="text-xs text-charcoal/60">
            {value[0]}{unit} – {value[1]}{unit}
          </span>
        </div>
      )}
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onValueChange(v as [number, number])}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-cream">
          <SliderPrimitive.Range className="absolute h-full bg-sage" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-sage bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 hover:bg-cream" />
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-sage bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 hover:bg-cream" />
      </SliderPrimitive.Root>
    </div>
  )
}
RangeSlider.displayName = 'RangeSlider'

export { RangeSlider }
