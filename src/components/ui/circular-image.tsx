import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const circularImageVariants = cva(
  "relative rounded-full overflow-hidden border-4 border-white shadow-md",
  {
    variants: {
      size: {
        sm: "h-16 w-16",
        md: "h-32 w-32",
        lg: "h-48 w-48",
        xl: "h-64 w-64",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface CircularImageProps
  extends VariantProps<typeof circularImageVariants> {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const CircularImage = React.forwardRef<HTMLDivElement, CircularImageProps>(
  ({ src, alt, size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(circularImageVariants({ size, className }))}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={
            size === "sm"
              ? "64px"
              : size === "md"
                ? "128px"
                : size === "lg"
                  ? "192px"
                  : "256px"
          }
        />
      </div>
    )
  }
)
CircularImage.displayName = "CircularImage"

export { CircularImage, circularImageVariants }
