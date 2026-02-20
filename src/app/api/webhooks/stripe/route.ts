import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import type Stripe from 'stripe'

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  return secret
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = getStripe().webhooks.constructEvent(body, signature, getWebhookSecret())
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('Stripe webhook signature verification failed:', message)
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${message}` },
        { status: 400 }
      )
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const stripePaymentId = paymentIntent.id

        // Find and update the order
        const order = await prisma.order.findFirst({
          where: { stripePaymentId },
        })

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'CONFIRMED' },
          })
          console.log(`Order ${order.orderNumber} confirmed via Stripe webhook`)
        } else {
          console.warn(`No order found for payment intent: ${stripePaymentId}`)
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const stripePaymentId = paymentIntent.id

        const order = await prisma.order.findFirst({
          where: { stripePaymentId },
        })

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'CANCELLED' },
          })
          console.log(`Order ${order.orderNumber} cancelled due to payment failure`)
        } else {
          console.warn(`No order found for failed payment intent: ${stripePaymentId}`)
        }

        break
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
