import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { MealCategory } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category') as MealCategory | null
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'name'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)))
    const skip = (page - 1) * limit

    // Build where clause
    const where: Record<string, unknown> = { isActive: true }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search.toLowerCase()] } },
      ]
    }

    // Build orderBy
    let orderBy: Record<string, string>
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'calories':
        // Sort by name as fallback; nutrition sort handled post-query if needed
        orderBy = { name: 'asc' }
        break
      case 'protein':
        orderBy = { name: 'asc' }
        break
      default:
        orderBy = { name: 'asc' }
    }

    const [meals, total] = await Promise.all([
      prisma.meal.findMany({
        where,
        include: {
          nutrition: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.meal.count({ where }),
    ])

    // Post-query sort for nutrition-based sorting
    let sortedMeals = meals
    if (sort === 'calories') {
      sortedMeals = [...meals].sort(
        (a, b) => (a.nutrition?.calories ?? 0) - (b.nutrition?.calories ?? 0)
      )
    } else if (sort === 'protein') {
      sortedMeals = [...meals].sort(
        (a, b) => Number(b.nutrition?.protein ?? 0) - Number(a.nutrition?.protein ?? 0)
      )
    }

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        items: sortedMeals,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
      path: '/api/meals',
    })
  } catch (error) {
    console.error('GET /api/meals error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch meals' },
        timestamp: new Date().toISOString(),
        path: '/api/meals',
      },
      { status: 500 }
    )
  }
}
