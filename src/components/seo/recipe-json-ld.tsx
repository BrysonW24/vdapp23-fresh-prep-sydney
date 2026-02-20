import type { BlogPostDetail, RecipeDetail } from '@/types'

/**
 * Converts minutes to ISO 8601 duration format (e.g., 30 -> "PT30M")
 */
function toIsoDuration(minutes: number | undefined | null): string | undefined {
  if (!minutes) return undefined
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0 && mins > 0) return `PT${hours}H${mins}M`
  if (hours > 0) return `PT${hours}H`
  return `PT${mins}M`
}

interface RecipeJsonLdProps {
  post: BlogPostDetail
  recipe: RecipeDetail
  siteUrl?: string
}

/**
 * Outputs Google Recipe structured data as JSON-LD.
 * This is what gets your recipes into Google rich snippets (recipe cards in search results).
 * @see https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export function RecipeJsonLd({ post, recipe, siteUrl = 'https://freshprepsydney.com.au' }: RecipeJsonLdProps) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    author: {
      '@type': 'Person',
      name: 'Aun',
      url: siteUrl,
    },
    datePublished: post.publishedAt || undefined,
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    totalTime: totalTime > 0 ? toIsoDuration(totalTime) : undefined,
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    recipeCategory: recipe.recipeCategory || undefined,
    recipeCuisine: recipe.cuisine || undefined,
    keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
    nutrition: recipe.nutrition
      ? {
          '@type': 'NutritionInformation',
          calories: `${recipe.nutrition.calories} calories`,
          proteinContent: `${recipe.nutrition.protein}g`,
          carbohydrateContent: `${recipe.nutrition.carbs}g`,
          fatContent: `${recipe.nutrition.fat}g`,
        }
      : undefined,
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.amount} ${ing.item}`
    ),
    recipeInstructions: recipe.instructions.map((inst) => ({
      '@type': 'HowToStep',
      text: inst.text,
    })),
    url: `${siteUrl}/blog/${post.slug}`,
  }

  // Remove undefined values for clean JSON output
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}
