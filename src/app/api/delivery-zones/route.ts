import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const zones = await prisma.deliveryZone.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: zones,
      timestamp: new Date().toISOString(),
      path: '/api/delivery-zones',
    })
  } catch (error) {
    console.error('GET /api/delivery-zones error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch delivery zones' },
        timestamp: new Date().toISOString(),
        path: '/api/delivery-zones',
      },
      { status: 500 }
    )
  }
}
