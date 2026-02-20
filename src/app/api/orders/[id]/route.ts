import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionToken =
    cookieStore.get('next-auth.session-token')?.value ||
    cookieStore.get('__Secure-next-auth.session-token')?.value

  if (!sessionToken) return null

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    select: { userId: true },
  })

  return session?.userId ?? null
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthUserId()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTH_REQUIRED', message: 'Authentication required' },
          timestamp: new Date().toISOString(),
          path: '/api/orders/[id]',
        },
        { status: 401 }
      )
    }

    const { id } = await params

    const order = await prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            meal: {
              select: {
                name: true,
                slug: true,
                image: true,
                category: true,
              },
            },
          },
        },
        address: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Order not found' },
          timestamp: new Date().toISOString(),
          path: `/api/orders/${id}`,
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order,
      timestamp: new Date().toISOString(),
      path: `/api/orders/${id}`,
    })
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch order' },
        timestamp: new Date().toISOString(),
        path: '/api/orders/[id]',
      },
      { status: 500 }
    )
  }
}
