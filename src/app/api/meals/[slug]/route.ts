import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const meal = await prisma.meal.findUnique({
      where: { slug },
      include: {
        nutrition: true,
        allergens: true,
      },
    })

    if (!meal || !meal.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Meal not found' },
          timestamp: new Date().toISOString(),
          path: `/api/meals/${slug}`,
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: meal,
      timestamp: new Date().toISOString(),
      path: `/api/meals/${slug}`,
    })
  } catch (error) {
    console.error('GET /api/meals/[slug] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch meal' },
        timestamp: new Date().toISOString(),
        path: '/api/meals/[slug]',
      },
      { status: 500 }
    )
  }
}
