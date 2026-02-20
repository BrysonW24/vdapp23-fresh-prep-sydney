import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { prisma } from '@/lib/prisma'

/* ------------------------------------------------------------------ */
/*  Category Config                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_CONFIG: Record<string, { label: string; description: string }> = {
  RECIPE: {
    label: 'Recipes',
    description: 'Try our favourite recipes at home.',
  },
  NUTRITION: {
    label: 'Nutrition',
    description: 'Science-backed tips for eating better.',
  },
  MEAL_PREP_TIPS: {
    label: 'Meal Prep Tips',
    description: 'Master the art of weekly meal prep.',
  },
  LIFESTYLE: {
    label: 'Lifestyle',
    description: 'Healthy living beyond the plate.',
  },
  NEWS: {
    label: 'News',
    description: 'The latest from Fresh Prep Sydney.',
  },
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(date: Date | null): string {
  if (!date) return ''
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  category: string
  readTime: number | null
  publishedAt: Date | null
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
      {/* Featured image */}
      <div className="relative h-48 w-full bg-cream">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <Badge variant="outline" className="border-sage/30 bg-sage/10 text-sage text-xs">
          {CATEGORY_CONFIG[post.category]?.label ?? post.category}
        </Badge>
        <h3 className="mt-2 font-heading text-lg font-semibold text-charcoal">
          <Link href={`/blog/${post.slug}`} className="hover:text-sage transition-colors">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-charcoal/60">{post.excerpt}</p>
        )}
        <div className="mt-3 flex items-center gap-4 text-xs text-charcoal/50">
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CategorySection({
  category,
  posts,
}: {
  category: string
  posts: BlogPost[]
}) {
  const config = CATEGORY_CONFIG[category]
  if (!config || posts.length === 0) return null

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-heading text-2xl font-bold text-charcoal">
          {config.label}
        </h2>
        <p className="mt-1 text-sm text-charcoal/50">{config.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogPage() {
  const t = await getTranslations('blog')

  // Fetch published blog posts from database
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      category: true,
      readTime: true,
      publishedAt: true,
    },
  })

  // Group posts by category
  const postsByCategory: Record<string, BlogPost[]> = {}
  for (const post of posts) {
    const cat = post.category
    if (!postsByCategory[cat]) {
      postsByCategory[cat] = []
    }
    postsByCategory[cat].push(post)
  }

  // Order categories to display
  const categoryOrder = ['RECIPE', 'NUTRITION', 'MEAL_PREP_TIPS', 'LIFESTYLE', 'NEWS']
  const orderedCategories = categoryOrder.filter((cat) => postsByCategory[cat]?.length > 0)

  return (
    <div className="bg-warm-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* All posts — featured / latest at top */}
        {posts.length > 0 && (
          <div className="mt-10">
            {/* Hero post — first post gets large treatment */}
            <div className="mb-10">
              <Card className="overflow-hidden border-0 shadow-lg md:flex">
                <div className="relative h-64 w-full bg-cream md:h-auto md:w-1/2">
                  {posts[0].featuredImage ? (
                    <Image
                      src={posts[0].featuredImage}
                      alt={posts[0].title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-col justify-center p-6 md:w-1/2 md:p-8">
                  <Badge variant="outline" className="w-fit border-sage/30 bg-sage/10 text-sage text-xs">
                    {CATEGORY_CONFIG[posts[0].category]?.label ?? posts[0].category}
                  </Badge>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-charcoal md:text-3xl">
                    <Link href={`/blog/${posts[0].slug}`} className="hover:text-sage transition-colors">
                      {posts[0].title}
                    </Link>
                  </h2>
                  {posts[0].excerpt && (
                    <p className="mt-2 text-charcoal/60">{posts[0].excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs text-charcoal/50">
                    {posts[0].readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {posts[0].readTime} min read
                      </span>
                    )}
                    {posts[0].publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(posts[0].publishedAt)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category sections */}
            <div className="space-y-12">
              {orderedCategories.map((cat) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  posts={postsByCategory[cat]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="mt-10 py-16 text-center">
            <p className="text-lg text-charcoal/50">
              {t('noPosts')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
