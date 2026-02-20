import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Clock,
  Calendar,
  ChevronRight,
  ChefHat,
  Timer,
  Users,
  BarChart3,
  Snowflake,
  Flame,
  UtensilsCrossed,
  ShoppingBag,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MacroBadge } from '@/components/ui/macro-badge'
import { RecipeJsonLd } from '@/components/seo/recipe-json-ld'
import { AdSlot } from '@/components/ads/ad-slot'
import prisma from '@/lib/prisma'
import type { BlogPostDetail, RecipeDetail } from '@/types'

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

async function getPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
      include: { recipe: true },
    })

    if (!post) return null

    const recipe: RecipeDetail | null = post.recipe
      ? {
          prepTime: post.recipe.prepTime || 0,
          cookTime: post.recipe.cookTime || 0,
          servings: post.recipe.servings || 0,
          difficulty: post.recipe.difficulty,
          ingredients: post.recipe.ingredients as { amount: string; item: string }[],
          instructions: post.recipe.instructions as { step: number; text: string }[],
          nutrition:
            post.recipe.calories != null
              ? {
                  calories: post.recipe.calories,
                  protein: Number(post.recipe.protein) || 0,
                  carbs: Number(post.recipe.carbs) || 0,
                  fat: Number(post.recipe.fat) || 0,
                }
              : null,
          storageInstructions: post.recipe.storageInstructions,
          makeAheadTips: post.recipe.makeAheadTips,
          mealPrepNotes: post.recipe.mealPrepNotes,
          cuisine: post.recipe.cuisine,
          recipeCategory: post.recipe.recipeCategory,
        }
      : null

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      featuredImage: post.featuredImage || '',
      category: post.category,
      readTime: post.readTime,
      publishedAt: post.publishedAt?.toISOString() || null,
      content: post.content,
      metaDescription: post.metaDescription,
      featuredImageAlt: post.featuredImageAlt,
      tags: post.tags,
      recipe,
    }
  } catch {
    return null
  }
}

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const description = post.metaDescription || post.excerpt
  const siteUrl = 'https://freshprepsydney.com.au'

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: 'Fresh Prep Sydney' }],
    openGraph: {
      type: 'article',
      locale: 'en_AU',
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description,
      siteName: 'Fresh Prep Sydney',
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              alt: post.featuredImageAlt || post.title,
            },
          ]
        : undefined,
      publishedTime: post.publishedAt || undefined,
      authors: ['Fresh Prep Sydney'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Parse markdown-style content into sections split by ## headers.
 * Returns an array of { title, content } objects.
 */
function parseContentSections(content: string): { title: string | null; content: string }[] {
  const lines = content.split('\n')
  const sections: { title: string | null; content: string }[] = []
  let currentTitle: string | null = null
  let currentLines: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentLines.length > 0 || currentTitle !== null) {
        sections.push({ title: currentTitle, content: currentLines.join('\n').trim() })
      }
      currentTitle = line.replace('## ', '')
      currentLines = []
    } else {
      currentLines.push(line)
    }
  }

  if (currentLines.length > 0 || currentTitle !== null) {
    sections.push({ title: currentTitle, content: currentLines.join('\n').trim() })
  }

  return sections
}

/* ------------------------------------------------------------------ */
/*  Content Section Component                                          */
/* ------------------------------------------------------------------ */

function ContentSection({ title, content }: { title: string | null; content: string }) {
  if (!content && !title) return null

  return (
    <div className="mb-8">
      {title && (
        <h2 className="mt-10 mb-4 font-heading text-2xl font-bold text-charcoal">{title}</h2>
      )}
      {content.split('\n\n').map((block, idx) => {
        if (!block.trim()) return null

        // Handle bullet lists
        if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
          const items = block.split('\n').filter((l) => l.trim())
          return (
            <ul key={idx} className="mb-4 space-y-2 pl-4">
              {items.map((item, i) => (
                <li key={i} className="list-disc leading-relaxed text-charcoal/80">
                  {item.replace(/^[-*]\s/, '')}
                </li>
              ))}
            </ul>
          )
        }

        // Handle numbered lists
        if (/^\d+\.\s/.test(block.trim())) {
          const items = block.split('\n').filter((l) => l.trim())
          return (
            <ol key={idx} className="mb-4 space-y-2 pl-4">
              {items.map((item, i) => (
                <li key={i} className="list-decimal leading-relaxed text-charcoal/80">
                  {item.replace(/^\d+\.\s/, '')}
                </li>
              ))}
            </ol>
          )
        }

        // Handle bold text (e.g. **Oil Temperature:** Do this...)
        if (block.includes('**')) {
          return (
            <p
              key={idx}
              className="mb-4 leading-relaxed text-charcoal/80"
              dangerouslySetInnerHTML={{
                __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-charcoal">$1</strong>'),
              }}
            />
          )
        }

        return (
          <p key={idx} className="mb-4 leading-relaxed text-charcoal/80">
            {block}
          </p>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Cross-Promotion CTA                                                */
/* ------------------------------------------------------------------ */

function MealPrepCta() {
  return (
    <Card className="mt-12 max-w-3xl border-0 bg-gradient-to-r from-sage/5 to-peach/10 shadow-md">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage/10">
          <ShoppingBag className="h-7 w-7 text-sage" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-charcoal">
            Love this recipe but short on time?
          </h3>
          <p className="mt-1 text-sm text-charcoal/60">
            Fresh Prep Sydney delivers chef-prepared meals across Sydney. Let us do the cooking for you.
          </p>
        </div>
        <Link
          href="/meals"
          className="shrink-0 rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage/90"
        >
          View This Week&apos;s Menu
        </Link>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const sections = parseContentSections(post.content)
  const recipe = post.recipe

  return (
    <div className="bg-warm-white">
      {/* Recipe JSON-LD for Google Rich Snippets */}
      {recipe && <RecipeJsonLd post={post} recipe={recipe} />}

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-charcoal/50">
          <Link href="/" className="transition-colors hover:text-sage">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="transition-colors hover:text-sage">
            Blog
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-charcoal/70">{post.title}</span>
        </nav>

        {/* Hero Image */}
        <div className="mt-6 overflow-hidden rounded-xl">
          {post.featuredImage ? (
            <div className="relative h-64 w-full md:h-96">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center bg-cream-light md:h-80">
              <ChefHat className="h-20 w-20 text-sage/20" />
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mt-8 max-w-3xl">
          <Badge variant="outline" className="border-sage/30 bg-sage/10 text-xs text-sage">
            {post.category.replace(/_/g, ' ')}
          </Badge>

          <h1 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-charcoal/50">
            <span className="font-medium text-charcoal/70">Fresh Prep Sydney</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
            )}
          </div>

          {/* Recipe quick stats */}
          {recipe && (
            <div className="mt-4 flex flex-wrap gap-3">
              {recipe.prepTime > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                  <Timer className="h-4 w-4 text-sage" />
                  Prep: {recipe.prepTime} min
                </div>
              )}
              {recipe.cookTime > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                  <Clock className="h-4 w-4 text-sage" />
                  Cook: {recipe.cookTime} min
                </div>
              )}
              {recipe.servings > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                  <Users className="h-4 w-4 text-sage" />
                  Serves {recipe.servings}
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                <BarChart3 className="h-4 w-4 text-sage" />
                {recipe.difficulty}
              </div>
            </div>
          )}
        </div>

        {/* Main Content — Butterhand-style long-form with ad slots */}
        <article className="mt-10 max-w-3xl">
          {sections.map((section, idx) => (
            <div key={idx}>
              <ContentSection title={section.title} content={section.content} />

              {/* Insert ad slots after 1st, 3rd, 5th content sections */}
              {(idx === 0 || idx === 2 || idx === 4) && (
                <AdSlot slot={`in-content-${idx + 1}`} />
              )}
            </div>
          ))}

          {/* Storage & Reheating Guide (from recipe data) */}
          {recipe?.storageInstructions && (
            <div className="mb-8">
              <h2 className="mt-10 mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-charcoal">
                <Snowflake className="h-6 w-6 text-sage" />
                Storage & Reheating Guide
              </h2>
              {recipe.storageInstructions.split('\n\n').map((block, idx) => (
                <p key={idx} className="mb-3 leading-relaxed text-charcoal/80">
                  {block}
                </p>
              ))}
            </div>
          )}

          {/* Make Ahead Tips (from recipe data) */}
          {recipe?.makeAheadTips && (
            <div className="mb-8">
              <h2 className="mt-10 mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-charcoal">
                <Flame className="h-6 w-6 text-sage" />
                Make Ahead Tips
              </h2>
              {recipe.makeAheadTips.split('\n\n').map((block, idx) => (
                <p key={idx} className="mb-3 leading-relaxed text-charcoal/80">
                  {block}
                </p>
              ))}
            </div>
          )}

          <AdSlot slot="pre-recipe-card" />

          {/* Meal Prep Section (from recipe data) */}
          {recipe?.mealPrepNotes && (
            <div className="mb-8">
              <h2 className="mt-10 mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-charcoal">
                <UtensilsCrossed className="h-6 w-6 text-sage" />
                Meal Prep Guide
              </h2>
              {recipe.mealPrepNotes.split('\n\n').map((block, idx) => (
                <p key={idx} className="mb-3 leading-relaxed text-charcoal/80">
                  {block}
                </p>
              ))}
            </div>
          )}
        </article>

        {/* Recipe Card — at the BOTTOM to force full-page scroll */}
        {recipe && (
          <Card className="mt-12 max-w-3xl border-0 shadow-lg" id="recipe">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal">Recipe</h2>

              {/* Meta badges */}
              <div className="mt-4 flex flex-wrap gap-3">
                {recipe.prepTime > 0 && (
                  <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                    <Timer className="h-4 w-4 text-sage" />
                    Prep: {recipe.prepTime} min
                  </div>
                )}
                {recipe.cookTime > 0 && (
                  <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                    <Clock className="h-4 w-4 text-sage" />
                    Cook: {recipe.cookTime} min
                  </div>
                )}
                {recipe.servings > 0 && (
                  <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                    <Users className="h-4 w-4 text-sage" />
                    Serves {recipe.servings}
                  </div>
                )}
                <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm text-charcoal">
                  <BarChart3 className="h-4 w-4 text-sage" />
                  {recipe.difficulty}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-6">
                <h3 className="font-heading text-lg font-semibold text-charcoal">Ingredients</h3>
                <ul className="mt-3 space-y-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-charcoal/70">
                      <span className="mt-1 h-4 w-4 shrink-0 rounded border border-sage/30" />
                      <span>
                        <strong className="text-charcoal">{ing.amount}</strong> {ing.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-semibold text-charcoal">Instructions</h3>
                <ol className="mt-3 space-y-4">
                  {recipe.instructions.map((inst) => (
                    <li key={inst.step} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-xs font-bold text-white">
                        {inst.step}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-charcoal/70">{inst.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Nutrition summary */}
              {recipe.nutrition && (
                <div className="mt-8 border-t border-cream pt-5">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    Nutrition per Serving
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <MacroBadge type="calories" value={recipe.nutrition.calories} />
                    <MacroBadge type="protein" value={recipe.nutrition.protein} />
                    <MacroBadge type="carbs" value={recipe.nutrition.carbs} />
                    <MacroBadge type="fat" value={recipe.nutrition.fat} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cross-Promotion CTA */}
        <MealPrepCta />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-charcoal/10 text-xs text-charcoal/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
