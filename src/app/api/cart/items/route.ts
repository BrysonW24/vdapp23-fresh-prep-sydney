import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { cartItemSchema } from '@/lib/validators'

/**
 * Resolve the cart for the current user/session.
 */
async function getCart() {
  const cookieStore = await cookies()

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

  if (userId) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    })
  }

  const sessionId = cookieStore.get('fps-session-id')?.value
  if (sessionId) {
    return prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    })
  }

  return null
}

// POST: Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = cartItemSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid cart item data',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 400 }
      )
    }

    const { mealId, quantity } = parsed.data
    let cart = await getCart()

    if (!cart) {
      // Create a new cart with a session ID
      const newSessionId = crypto.randomUUID()

      cart = await prisma.cart.create({
        data: { sessionId: newSessionId },
        include: { items: true },
      })

      // We'll set the cookie in the response
      const item = await prisma.cartItem.create({
        data: { cartId: cart.id, mealId, quantity },
        include: { meal: true },
      })

      const response = NextResponse.json({
        success: true,
        data: item,
        timestamp: new Date().toISOString(),
        path: '/api/cart/items',
      })

      response.cookies.set('fps-session-id', newSessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      return response
    }

    // Check if item already exists
    const existingItem = cart.items.find((i) => i.mealId === mealId)

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { meal: true },
      })

      return NextResponse.json({
        success: true,
        data: updated,
        timestamp: new Date().toISOString(),
        path: '/api/cart/items',
      })
    }

    const item = await prisma.cartItem.create({
      data: { cartId: cart.id, mealId, quantity },
      include: { meal: true },
    })

    return NextResponse.json({
      success: true,
      data: item,
      timestamp: new Date().toISOString(),
      path: '/api/cart/items',
    })
  } catch (error) {
    console.error('POST /api/cart/items error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to add item to cart' },
        timestamp: new Date().toISOString(),
        path: '/api/cart/items',
      },
      { status: 500 }
    )
  }
}

// PATCH: Update item quantity
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = cartItemSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid cart item data',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 400 }
      )
    }

    const { mealId, quantity } = parsed.data
    const cart = await getCart()

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Cart not found' },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 404 }
      )
    }

    const existingItem = cart.items.find((i) => i.mealId === mealId)

    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Item not found in cart' },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 404 }
      )
    }

    const updated = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
      include: { meal: true },
    })

    return NextResponse.json({
      success: true,
      data: updated,
      timestamp: new Date().toISOString(),
      path: '/api/cart/items',
    })
  } catch (error) {
    console.error('PATCH /api/cart/items error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to update cart item' },
        timestamp: new Date().toISOString(),
        path: '/api/cart/items',
      },
      { status: 500 }
    )
  }
}

// DELETE: Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { mealId } = body as { mealId: string }

    if (!mealId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'mealId is required' },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 400 }
      )
    }

    const cart = await getCart()

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Cart not found' },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 404 }
      )
    }

    const existingItem = cart.items.find((i) => i.mealId === mealId)

    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Item not found in cart' },
          timestamp: new Date().toISOString(),
          path: '/api/cart/items',
        },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({ where: { id: existingItem.id } })

    return NextResponse.json({
      success: true,
      data: { message: 'Item removed from cart' },
      timestamp: new Date().toISOString(),
      path: '/api/cart/items',
    })
  } catch (error) {
    console.error('DELETE /api/cart/items error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to remove cart item' },
        timestamp: new Date().toISOString(),
        path: '/api/cart/items',
      },
      { status: 500 }
    )
  }
}
