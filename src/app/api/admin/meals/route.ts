import { NextRequest, NextResponse } from 'next/server'
import { MealCategory } from '@prisma/client'
import prisma from '@/lib/prisma'
import { mealSchema } from '@/lib/validators'

// GET: List all meals (including inactive) with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const skip = (page - 1) * limit
    const search = searchParams.get('search')
    const category = searchParams.get('category')

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search.toLowerCase()] } },
      ]
    }

    if (category) {
      where.category = category
    }

    const [meals, total] = await Promise.all([
      prisma.meal.findMany({
        where,
        include: {
          nutrition: true,
          allergens: true,
        },
        orderBy: [{ isActive: 'desc' }, { sortOrder: 'asc' }, { name: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.meal.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        items: meals,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
      path: '/api/admin/meals',
    })
  } catch (error) {
    console.error('GET /api/admin/meals error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch meals' },
        timestamp: new Date().toISOString(),
        path: '/api/admin/meals',
      },
      { status: 500 }
    )
  }
}

// POST: Create new meal with nutrition and allergens
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = mealSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid meal data',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/admin/meals',
        },
        { status: 400 }
      )
    }

    const { nutrition, allergens, ...mealData } = parsed.data

    // Generate slug from name
    const slug = mealData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Check for duplicate slug
    const existingMeal = await prisma.meal.findUnique({ where: { slug } })
    const finalSlug = existingMeal ? `${slug}-${Date.now()}` : slug

    const meal = await prisma.meal.create({
      data: {
        ...mealData,
        category: mealData.category as MealCategory,
        slug: finalSlug,
        tags: mealData.tags || [],
        nutrition: {
          create: nutrition,
        },
        allergens: allergens
          ? {
              create: allergens.map((allergen) => ({
                allergen: allergen as any,
              })),
            }
          : undefined,
      },
      include: {
        nutrition: true,
        allergens: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: meal,
        timestamp: new Date().toISOString(),
        path: '/api/admin/meals',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/admin/meals error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to create meal' },
        timestamp: new Date().toISOString(),
        path: '/api/admin/meals',
      },
      { status: 500 }
    )
  }
}
