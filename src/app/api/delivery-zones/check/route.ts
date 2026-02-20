import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { postcodeCheckSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = postcodeCheckSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid postcode',
            details: parsed.error.flatten().fieldErrors,
          },
          timestamp: new Date().toISOString(),
          path: '/api/delivery-zones/check',
        },
        { status: 400 }
      )
    }

    const { postcode } = parsed.data

    const zone = await prisma.deliveryZone.findUnique({
      where: { postcode },
    })

    if (!zone || !zone.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Sorry, we don't currently deliver to postcode ${postcode}`,
          },
          timestamp: new Date().toISOString(),
          path: '/api/delivery-zones/check',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: zone.id,
        name: zone.name,
        postcode: zone.postcode,
        suburb: zone.suburb,
        deliveryDays: zone.deliveryDays,
        deliveryFee: zone.deliveryFee,
        cutoffHour: zone.cutoffHour,
      },
      timestamp: new Date().toISOString(),
      path: '/api/delivery-zones/check',
    })
  } catch (error) {
    console.error('POST /api/delivery-zones/check error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to check postcode' },
        timestamp: new Date().toISOString(),
        path: '/api/delivery-zones/check',
      },
      { status: 500 }
    )
  }
}
