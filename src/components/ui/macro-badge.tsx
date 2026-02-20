import * as React from "react"

import { cn } from "@/lib/utils"

const macroConfig = {
  calories: {
    label: "Cal",
    unit: "cal",
    className: "bg-peach-light text-charcoal",
  },
  protein: {
    label: "P",
    unit: "g",
    className: "bg-sage/10 text-sage-dark",
  },
  carbs: {
    label: "C",
    unit: "g",
    className: "bg-cream text-charcoal",
  },
  fat: {
    label: "F",
    unit: "g",
    className: "border border-border bg-warm-white text-charcoal",
  },
} as const

export interface MacroBadgeProps {
  type: "calories" | "protein" | "carbs" | "fat"
  value: number
  className?: string
}

function MacroBadge({ type, value, className }: MacroBadgeProps) {
  const config = macroConfig[type]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label} {value}
      {config.unit}
    </span>
  )
}
MacroBadge.displayName = "MacroBadge"

export { MacroBadge }
