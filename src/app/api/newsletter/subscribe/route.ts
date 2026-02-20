import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid email address',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/newsletter/subscribe',
        },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    // TODO: Integrate with Resend audience API
    // For now, log the subscription and return success
    console.log(`Newsletter subscription: ${email}`)

    return NextResponse.json({
      success: true,
      data: { message: 'Successfully subscribed to the newsletter' },
      timestamp: new Date().toISOString(),
      path: '/api/newsletter/subscribe',
    })
  } catch (error) {
    console.error('POST /api/newsletter/subscribe error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to subscribe' },
        timestamp: new Date().toISOString(),
        path: '/api/newsletter/subscribe',
      },
      { status: 500 }
    )
  }
}
