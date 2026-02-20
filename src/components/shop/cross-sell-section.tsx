import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'

interface CrossSellSectionProps {
  currentMealId: string
  category: string
}

export async function CrossSellSection({ currentMealId, category }: CrossSellSectionProps) {
  // Fetch up to 4 related meals from same category (excluding current)
  const relatedMeals = await prisma.meal.findMany({
    where: {
      isActive: true,
      category: category as any,
      id: { not: currentMealId },
    },
    include: {
      nutrition: true,
    },
    take: 4,
    orderBy: { sortOrder: 'asc' },
  })

  if (relatedMeals.length === 0) {
    // Fallback: get any 4 meals if no same-category results
    const fallback = await prisma.meal.findMany({
      where: {
        isActive: true,
        id: { not: currentMealId },
      },
      include: {
        nutrition: true,
      },
      take: 4,
      orderBy: { sortOrder: 'asc' },
    })
    if (fallback.length === 0) return null
    return <CrossSellGrid meals={fallback} />
  }

  return <CrossSellGrid meals={relatedMeals} />
}

function CrossSellGrid({ meals }: { meals: any[] }) {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-heading text-xl font-bold text-charcoal mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {meals.map((meal) => (
          <Link
            key={meal.id}
            href={`/meals/${meal.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              {meal.image ? (
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-3xl">🍽️</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              {/* Compact macro row */}
              {meal.nutrition && (
                <div className="mb-1.5 flex items-center gap-2 text-[10px] text-charcoal/50">
                  <span>{meal.nutrition.calories} cal</span>
                  <span>•</span>
                  <span>{Number(meal.nutrition.protein)}g protein</span>
                </div>
              )}
              <h3 className="font-heading text-sm font-semibold text-charcoal line-clamp-1 group-hover:text-sage transition-colors">
                {meal.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-sage">
                ${Number(meal.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
