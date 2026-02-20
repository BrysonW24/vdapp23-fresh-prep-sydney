import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import { MacroBadge } from '@/components/ui/macro-badge'
import { MealImageGallery } from '@/components/shop/meal-image-gallery'
import { MealDetailActions } from '@/components/shop/meal-detail-actions'
import { MealDetailAccordions } from '@/components/shop/meal-detail-accordions'
import { CrossSellSection } from '@/components/shop/cross-sell-section'
import { StickyAtcBar } from '@/components/shop/sticky-atc-bar'

// Map category enum to readable labels
const CATEGORY_LABELS: Record<string, string> = {
  CLASSIC: 'Classic',
  HIGH_PROTEIN: 'High Protein',
  LOW_CARB: 'Low Carb',
  PLANT_BASED: 'Plant Based',
  BREAKFAST: 'Breakfast',
  SNACK: 'Snack',
  BULK: 'Bulk',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meal = await prisma.meal.findUnique({
    where: { slug },
    select: { name: true, shortDescription: true, image: true },
  })

  if (!meal) return { title: 'Meal Not Found' }

  return {
    title: `${meal.name} — Fresh Prep Sydney`,
    description: meal.shortDescription || `Order ${meal.name} — chef-prepared and delivered fresh across Sydney.`,
    openGraph: {
      title: meal.name,
      description: meal.shortDescription || undefined,
      images: meal.image ? [meal.image] : undefined,
    },
  }
}

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const meal = await prisma.meal.findUnique({
    where: { slug },
    include: {
      nutrition: true,
      allergens: true,
    },
  })

  if (!meal || !meal.isActive) {
    notFound()
  }

  const price = Number(meal.price)
  const categoryLabel = CATEGORY_LABELS[meal.category] || meal.category
  const images = meal.images.length > 0 ? meal.images : meal.image ? [meal.image] : []

  return (
    <div className="bg-warm-white min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-charcoal/50">
          <Link href="/" className="hover:text-sage transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/meals" className="hover:text-sage transition-colors">
            Meals
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/meals?category=${meal.category}`}
            className="hover:text-sage transition-colors"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-charcoal font-medium truncate max-w-[200px]">
            {meal.name}
          </span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Image gallery */}
          <MealImageGallery images={images} name={meal.name} />

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Category badge */}
            <span className="inline-flex w-fit rounded-full border border-sage/30 bg-sage/10 px-3 py-0.5 text-xs font-medium text-sage">
              {categoryLabel}
            </span>

            {/* Name */}
            <h1 className="mt-3 font-heading text-2xl font-bold text-charcoal md:text-3xl lg:text-4xl">
              {meal.name}
            </h1>

            {/* Short description */}
            {meal.shortDescription && (
              <p className="mt-2 text-charcoal/70">{meal.shortDescription}</p>
            )}

            {/* Price */}
            <p className="mt-4 text-2xl font-bold text-sage">${price.toFixed(2)}</p>

            {/* Macro badges */}
            {meal.nutrition && (
              <div className="mt-4 flex flex-wrap gap-2">
                <MacroBadge type="calories" value={meal.nutrition.calories} />
                <MacroBadge type="protein" value={Number(meal.nutrition.protein)} />
                <MacroBadge type="carbs" value={Number(meal.nutrition.carbs)} />
                <MacroBadge type="fat" value={Number(meal.nutrition.fat)} />
              </div>
            )}

            {/* Tags */}
            {meal.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {meal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-medium text-charcoal/70"
                  >
                    {tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                ))}
              </div>
            )}

            {/* Serving info */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-charcoal/60">
              {meal.servingSize && (
                <span>
                  <span className="font-medium text-charcoal">Serving:</span>{' '}
                  {meal.servingSize}
                </span>
              )}
              {meal.shelfLife && (
                <span>
                  <span className="font-medium text-charcoal">Shelf Life:</span>{' '}
                  {meal.shelfLife}
                </span>
              )}
            </div>

            {/* Add to Cart actions */}
            <div id="main-atc" className="mt-6">
              <MealDetailActions
                mealId={meal.id}
                name={meal.name}
                slug={meal.slug}
                price={price}
                image={meal.image || ''}
              />
            </div>

            {/* Full description */}
            {meal.description && (
              <p className="mt-6 text-sm leading-relaxed text-charcoal/70">
                {meal.description}
              </p>
            )}
          </div>
        </div>

        {/* Accordions */}
        <div className="mt-10 max-w-2xl">
          <MealDetailAccordions
            ingredients={meal.ingredients}
            description={meal.description}
            allergens={meal.allergens}
            reheatingInstructions={meal.reheatingInstructions}
            shelfLife={meal.shelfLife}
            servingSize={meal.servingSize}
            nutrition={
              meal.nutrition
                ? {
                    calories: meal.nutrition.calories,
                    protein: meal.nutrition.protein,
                    carbs: meal.nutrition.carbs,
                    fat: meal.nutrition.fat,
                    fibre: meal.nutrition.fibre,
                    sodium: meal.nutrition.sodium,
                    sugar: meal.nutrition.sugar,
                  }
                : null
            }
          />
        </div>

        {/* Cross-sell section */}
        {/* @ts-expect-error Server Component */}
        <CrossSellSection currentMealId={meal.id} category={meal.category} />
      </div>

      {/* Sticky ATC bar */}
      <StickyAtcBar
        mealId={meal.id}
        name={meal.name}
        slug={meal.slug}
        price={price}
        image={meal.image || ''}
        observeTargetId="main-atc"
      />
    </div>
  )
}
