import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import { Decimal } from '@prisma/client/runtime/library'

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

export async function POST() {
  try {
    const userId = await getAuthUserId()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTH_REQUIRED', message: 'Authentication required' },
          timestamp: new Date().toISOString(),
          path: '/api/checkout/create-payment-intent',
        },
        { status: 401 }
      )
    }

    // Get user's cart
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
          path: '/api/checkout/create-payment-intent',
        },
        { status: 400 }
      )
    }

    // Calculate amount from cart items
    const subtotal = cart.items.reduce((sum, item) => {
      return sum.add(item.meal.price.mul(item.quantity))
    }, new Decimal(0))

    // Convert to cents for Stripe (AUD)
    const amountInCents = Math.round(subtotal.toNumber() * 100)

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amountInCents,
      currency: 'aud',
      metadata: {
        userId,
        cartId: cart.id,
      },
    })

    return NextResponse.json({
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
      timestamp: new Date().toISOString(),
      path: '/api/checkout/create-payment-intent',
    })
  } catch (error) {
    console.error('POST /api/checkout/create-payment-intent error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to create payment intent' },
        timestamp: new Date().toISOString(),
        path: '/api/checkout/create-payment-intent',
      },
      { status: 500 }
    )
  }
}
