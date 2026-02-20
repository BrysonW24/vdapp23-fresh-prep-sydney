import * as React from "react"

import { cn } from "@/lib/utils"

export interface Step {
  label: string
  description?: string
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep?: number
  className?: string
}

function StepIndicator({
  steps,
  currentStep = -1,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: horizontal layout */}
      <div className="hidden items-center md:flex">
        {steps.map((step, index) => {
          const isActiveOrCompleted = index <= currentStep

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isActiveOrCompleted
                      ? "bg-sage text-white"
                      : "bg-cream text-charcoal"
                  )}
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-charcoal">
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 mb-8 h-0.5 flex-1",
                    index < currentStep
                      ? "bg-sage"
                      : "border-t-2 border-dashed border-cream"
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Mobile: vertical layout */}
      <div className="flex flex-col md:hidden">
        {steps.map((step, index) => {
          const isActiveOrCompleted = index <= currentStep

          return (
            <div key={index} className="flex gap-3">
              {/* Circle and connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isActiveOrCompleted
                      ? "bg-sage text-white"
                      : "bg-cream text-charcoal"
                  )}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "my-1 w-0.5 flex-1",
                      index < currentStep
                        ? "bg-sage"
                        : "border-l-2 border-dashed border-cream"
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-6", index === steps.length - 1 && "pb-0")}>
                <p className="text-sm font-medium text-charcoal">
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
StepIndicator.displayName = "StepIndicator"

export { StepIndicator }
