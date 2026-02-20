"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm transition-colors",
          "hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-10 text-center font-medium">{value}</span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm transition-colors",
          "hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
QuantitySelector.displayName = "QuantitySelector"

export { QuantitySelector }
