import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

/**
 * Resolve the cart for the current user/session.
 * Checks userId from session first, then falls back to sessionId cookie.
 */
async function resolveCart(_request: NextRequest) {
  const cookieStore = await cookies()

  // Check for authenticated user session
  const sessionToken =
    cookieStore.get('next-auth.session-token')?.value ||
    cookieStore.get('__Secure-next-auth.session-token')?.value

  let userId: string | null = null

  if (sessionToken) {
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: { userId: true },
    })
    userId = session?.userId ?? null
  }

  // Try finding cart by userId first
  if (userId) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { meal: { include: { nutrition: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    return { cart, userId, sessionId: null }
  }

  // Fall back to sessionId cookie
  const sessionId = cookieStore.get('fps-session-id')?.value || null

  if (sessionId) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: { meal: { include: { nutrition: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    return { cart, userId: null, sessionId }
  }

  return { cart: null, userId: null, sessionId: null }
}

export async function GET(request: NextRequest) {
  try {
    const { cart } = await resolveCart(request)

    return NextResponse.json({
      success: true,
      data: cart,
      timestamp: new Date().toISOString(),
      path: '/api/cart',
    })
  } catch (error) {
    console.error('GET /api/cart error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch cart' },
        timestamp: new Date().toISOString(),
        path: '/api/cart',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body as {
      items: { mealId: string; quantity: number }[]
    }

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Items array is required' },
          timestamp: new Date().toISOString(),
          path: '/api/cart',
        },
        { status: 400 }
      )
    }

    const { cart: existingCart, userId, sessionId } = await resolveCart(request)

    // Determine identity for cart creation
    const cartIdentity = userId
      ? { userId }
      : sessionId
        ? { sessionId }
        : { sessionId: crypto.randomUUID() }

    const cart = existingCart
      ? existingCart
      : await prisma.cart.create({
          data: cartIdentity,
          include: {
            items: {
              include: { meal: { include: { nutrition: true } } },
              orderBy: { createdAt: 'asc' },
            },
          },
        })

    // Merge items: upsert each item
    for (const item of items) {
      const existingItem = cart.items.find((ci) => ci.mealId === item.mealId)

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: item.quantity },
        })
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            mealId: item.mealId,
            quantity: item.quantity,
          },
        })
      }
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: { meal: { include: { nutrition: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    const response = NextResponse.json({
      success: true,
      data: updatedCart,
      timestamp: new Date().toISOString(),
      path: '/api/cart',
    })

    // Set session cookie if new anonymous cart
    if (!userId && !sessionId && 'sessionId' in cartIdentity) {
      response.cookies.set('fps-session-id', cartIdentity.sessionId as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
    }

    return response
  } catch (error) {
    console.error('POST /api/cart error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to sync cart' },
        timestamp: new Date().toISOString(),
        path: '/api/cart',
      },
      { status: 500 }
    )
  }
}
