import Image from 'next/image'
import Link from 'next/link'
import { ChefHat, Truck, Flame, Utensils, ArrowRight, Instagram, Youtube } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { TrustStrip } from '@/components/shop/trust-strip'
import { HomeFeaturedMeals } from '@/components/shop/home-featured-meals'
import prisma from '@/lib/prisma'

const CATEGORY_IMAGES = [
  { slug: 'CLASSIC', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop' },
  { slug: 'HIGH_PROTEIN', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=300&fit=crop' },
  { slug: 'LOW_CARB', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop' },
  { slug: 'PLANT_BASED', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop' },
  { slug: 'BREAKFAST', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=300&fit=crop' },
  { slug: 'BULK', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=300&fit=crop' },
]

const HOW_IT_WORKS_ICONS = [Utensils, ChefHat, Truck, Flame]

export default async function HomePage() {
  const t = await getTranslations()

  // Fetch featured meals from DB
  const featuredMeals = await prisma.meal.findMany({
    where: { isActive: true },
    include: { nutrition: true },
    take: 4,
    orderBy: { sortOrder: 'asc' },
  })

  // Convert for client component
  const serializedMeals = featuredMeals.map((m) => ({
    id: m.id,
    name: m.name,
    slug: m.slug,
    price: Number(m.price),
    image: m.images?.[0] || m.image || '',
    category: m.category,
    shortDescription: m.shortDescription,
    tags: m.tags || [],
    nutrition: m.nutrition
      ? {
          calories: m.nutrition.calories,
          protein: Number(m.nutrition.protein),
          carbs: Number(m.nutrition.carbs),
          fat: Number(m.nutrition.fat),
        }
      : null,
  }))

  const howItWorksSteps = [
    { titleKey: 'howItWorks.chooseMeals' as const, descKey: 'howItWorks.chooseMealsDesc' as const },
    { titleKey: 'howItWorks.aunCooks' as const, descKey: 'howItWorks.aunCooksDesc' as const },
    { titleKey: 'howItWorks.weDeliver' as const, descKey: 'howItWorks.weDeliverDesc' as const },
    { titleKey: 'howItWorks.heatEat' as const, descKey: 'howItWorks.heatEatDesc' as const },
  ]

  const categoryKeys = ['classic', 'highProtein', 'lowCarb', 'plantBased', 'breakfast', 'bulk'] as const

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-warm-white to-cream-light">
        <div className="container mx-auto flex flex-col items-center gap-12 px-4 py-16 md:flex-row md:py-24">
          {/* Left copy */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-heading text-4xl font-bold leading-tight text-charcoal md:text-6xl">
              {t('hero.title1')}
              <br />
              {t('hero.title2')}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-charcoal/70">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg" className="bg-sage text-white hover:bg-sage-dark">
                <Link href="/meals">
                  {t('hero.shopMenu')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-sage text-sage hover:bg-sage/5">
                <Link href="#how-it-works">{t('hero.howItWorks')}</Link>
              </Button>
            </div>
          </div>

          {/* Right hero image */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-72 w-72 overflow-hidden rounded-full md:h-96 md:w-96">
              <Image
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=800&fit=crop"
                alt="Fresh prepared meal bowls"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ──────────────────────────────────────────── */}
      <TrustStrip />

      {/* ── Meet the Chef ──────────────────────────────────────── */}
      <section className="bg-warm-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
            {/* Chef photo */}
            <div className="flex-shrink-0">
              <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-lg md:h-80 md:w-80">
                <Image
                  src="/images/chef/aun.jpeg"
                  alt="Chef Aun"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Chef bio */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-sage">{t('chef.label')}</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                {t('chef.name')}
              </h2>
              <p className="mt-4 max-w-lg text-charcoal/70 leading-relaxed">
                {t('chef.bio1')}
              </p>
              <p className="mt-3 max-w-lg text-charcoal/70 leading-relaxed">
                {t('chef.bio2')}
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                <a
                  href="https://www.youtube.com/@aunscookingka24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/auns_janthana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:from-purple-600 hover:to-pink-600"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream-light">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <SectionHeading
            title={t('howItWorks.title')}
            subtitle={t('howItWorks.subtitle')}
          />

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, idx) => {
              const Icon = HOW_IT_WORKS_ICONS[idx]
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-sage">
                    {t('howItWorks.step', { number: idx + 1 })}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-charcoal">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/60">{t(step.descKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Customer Favourites ─────────────────────────────────── */}
      <section className="bg-warm-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <SectionHeading
            title={t('menu.title')}
            subtitle={t('menu.subtitle')}
          />

          <div className="mt-12">
            <HomeFeaturedMeals meals={serializedMeals} />
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="border-sage text-sage hover:bg-sage/5">
              <Link href="/meals">
                {t('menu.viewFullMenu')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────── */}
      <section className="bg-cream-light">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <SectionHeading
            title={t('categories.title')}
            subtitle={t('categories.subtitle')}
          />

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORY_IMAGES.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/meals?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full transition-transform group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={t(`categories.${categoryKeys[idx]}`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-charcoal group-hover:text-sage">
                  {t(`categories.${categoryKeys[idx]}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sage">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center md:py-20">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-sage hover:bg-cream">
            <Link href="/meals">
              {t('cta.shopNow')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
