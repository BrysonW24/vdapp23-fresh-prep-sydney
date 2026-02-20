'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MealDetailAccordionsProps {
  ingredients?: string | null
  description?: string | null
  allergens?: { allergen: string }[]
  reheatingInstructions?: string | null
  shelfLife?: string | null
  servingSize?: string | null
  nutrition?: {
    calories: number
    protein: number | string
    carbs: number | string
    fat: number | string
    fibre?: number | string | null
    sodium?: number | string | null
    sugar?: number | string | null
  } | null
  className?: string
}

function AccordionItem({
  value,
  title,
  children,
}: {
  value: string
  title: string
  children: React.ReactNode
}) {
  return (
    <AccordionPrimitive.Item value={value} className="border-b border-border/50">
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-sm font-semibold text-charcoal hover:text-sage transition-colors [&[data-state=open]>svg]:rotate-180">
          {title}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pb-4 text-sm text-charcoal/70 leading-relaxed">
          {children}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

export function MealDetailAccordions({
  ingredients,
  description,
  allergens,
  reheatingInstructions,
  shelfLife,
  servingSize,
  nutrition,
  className,
}: MealDetailAccordionsProps) {
  // Build list of sections that have content
  const defaultValues: string[] = []
  if (ingredients) defaultValues.push('ingredients')

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultValues}
      className={cn('w-full', className)}
    >
      {/* Ingredients */}
      {ingredients && (
        <AccordionItem value="ingredients" title="Ingredients">
          <ul className="list-inside list-disc space-y-1">
            {ingredients.split(',').map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        </AccordionItem>
      )}

      {/* Description */}
      {description && (
        <AccordionItem value="description" title="Description">
          <p>{description}</p>
        </AccordionItem>
      )}

      {/* Nutrition */}
      {nutrition && (
        <AccordionItem value="nutrition" title="Nutrition Information">
          {servingSize && (
            <p className="mb-3 text-xs text-charcoal/50">Per serving ({servingSize})</p>
          )}
          <table className="w-full text-sm">
            <tbody className="divide-y divide-cream">
              <tr>
                <td className="py-2 font-medium text-charcoal">Calories</td>
                <td className="py-2 text-right text-charcoal/70">{nutrition.calories} cal</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-charcoal">Protein</td>
                <td className="py-2 text-right text-charcoal/70">{Number(nutrition.protein)}g</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-charcoal">Carbohydrates</td>
                <td className="py-2 text-right text-charcoal/70">{Number(nutrition.carbs)}g</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-charcoal">Fat</td>
                <td className="py-2 text-right text-charcoal/70">{Number(nutrition.fat)}g</td>
              </tr>
              {nutrition.fibre != null && (
                <tr>
                  <td className="py-2 font-medium text-charcoal">Fibre</td>
                  <td className="py-2 text-right text-charcoal/70">{Number(nutrition.fibre)}g</td>
                </tr>
              )}
              {nutrition.sugar != null && (
                <tr>
                  <td className="py-2 font-medium text-charcoal">Sugar</td>
                  <td className="py-2 text-right text-charcoal/70">{Number(nutrition.sugar)}g</td>
                </tr>
              )}
              {nutrition.sodium != null && (
                <tr>
                  <td className="py-2 font-medium text-charcoal">Sodium</td>
                  <td className="py-2 text-right text-charcoal/70">{Number(nutrition.sodium)}mg</td>
                </tr>
              )}
            </tbody>
          </table>
        </AccordionItem>
      )}

      {/* Allergens */}
      {allergens && allergens.length > 0 && (
        <AccordionItem value="allergens" title="Allergen Information">
          <div className="flex flex-wrap gap-2 mb-3">
            {allergens.map((a) => (
              <span
                key={a.allergen}
                className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal"
              >
                {a.allergen.charAt(0) + a.allergen.slice(1).toLowerCase()}
              </span>
            ))}
          </div>
          <p className="text-xs text-charcoal/50">
            Prepared in a kitchen that handles gluten, dairy, nuts, eggs, soy, and
            shellfish. Please contact us if you have specific allergy concerns.
          </p>
        </AccordionItem>
      )}

      {/* Reheating Instructions */}
      {reheatingInstructions && (
        <AccordionItem value="reheating" title="Heating Instructions">
          <p className="whitespace-pre-line">{reheatingInstructions}</p>
        </AccordionItem>
      )}

      {/* Shelf Life & Storage */}
      {shelfLife && (
        <AccordionItem value="storage" title="Shelf Life & Storage">
          <p>{shelfLife}</p>
        </AccordionItem>
      )}
    </AccordionPrimitive.Root>
  )
}
