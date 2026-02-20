import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const priceTagVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const priceTextVariants = cva("font-bold text-charcoal", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export interface PriceTagProps extends VariantProps<typeof priceTagVariants> {
  price: number
  originalPrice?: number
  subscriptionPrice?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

function PriceTag({
  price,
  originalPrice,
  subscriptionPrice,
  size = "md",
  className,
}: PriceTagProps) {
  const hasDiscount = originalPrice != null && originalPrice !== price

  return (
    <div className={cn(priceTagVariants({ size, className }))}>
      <div className="flex items-center gap-2">
        <span className={cn(priceTextVariants({ size }))}>
          {formatPrice(price)}
        </span>
        {hasDiscount && (
          <span
            className={cn(
              "text-muted-foreground line-through",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base"
            )}
          >
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
      {subscriptionPrice != null && (
        <span
          className={cn(
            "font-medium text-sage",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          Subscribe: {formatPrice(subscriptionPrice)}
        </span>
      )}
    </div>
  )
}
PriceTag.displayName = "PriceTag"

export { PriceTag, priceTagVariants }
