import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { checkoutSchema } from '@/lib/validators'
import { Decimal } from '@prisma/client/runtime/library'

/**
 * Get the authenticated user's ID from session token.
 */
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

/**
 * Generate a unique order number: FPS-YYYYMMDD-XXXX
 */
function generateOrderNumber(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FPS-${dateStr}-${rand}`
}

// GET: List user's orders
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthUserId()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTH_REQUIRED', message: 'Authentication required' },
          timestamp: new Date().toISOString(),
          path: '/api/orders',
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)))
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          items: { include: { meal: { select: { name: true, slug: true, image: true } } } },
        },
      }),
      prisma.order.count({ where: { userId } }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        items: orders,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
      path: '/api/orders',
    })
  } catch (error) {
    console.error('GET /api/orders error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch orders' },
        timestamp: new Date().toISOString(),
        path: '/api/orders',
      },
      { status: 500 }
    )
  }
}

// POST: Create order from cart
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTH_REQUIRED', message: 'Authentication required' },
          timestamp: new Date().toISOString(),
          path: '/api/orders',
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid checkout data',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/orders',
        },
        { status: 400 }
      )
    }

    const { addressId, deliveryDate, deliverySlot, notes } = parsed.data

    // Get user's cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { meal: true } },
      },
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'BAD_REQUEST', message: 'Cart is empty' },
          timestamp: new Date().toISOString(),
          path: '/api/orders',
        },
        { status: 400 }
      )
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId },
    })

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Address not found' },
          timestamp: new Date().toISOString(),
          path: '/api/orders',
        },
        { status: 404 }
      )
    }

    // Check delivery zone for fee
    const zone = await prisma.deliveryZone.findUnique({
      where: { postcode: address.postcode },
    })

    const deliveryFee = zone?.deliveryFee ?? new Decimal(0)

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      return sum.add(item.meal.price.mul(item.quantity))
    }, new Decimal(0))

    const total = subtotal.add(deliveryFee)

    // Create order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId,
          addressId,
          status: 'PENDING',
          subtotal,
          deliveryFee,
          discount: 0,
          total,
          deliveryDate: new Date(deliveryDate),
          deliverySlot: deliverySlot || null,
          notes: notes || null,
          items: {
            create: cart.items.map((item) => ({
              mealId: item.mealId,
              quantity: item.quantity,
              unitPrice: item.meal.price,
              totalPrice: item.meal.price.mul(item.quantity),
            })),
          },
        },
        include: {
          items: { include: { meal: true } },
          address: true,
        },
      })

      // Clear the cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

      return newOrder
    })

    return NextResponse.json(
      {
        success: true,
        data: order,
        timestamp: new Date().toISOString(),
        path: '/api/orders',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to create order' },
        timestamp: new Date().toISOString(),
        path: '/api/orders',
      },
      { status: 500 }
    )
  }
}
