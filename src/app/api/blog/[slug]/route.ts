import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        recipe: true,
      },
    })

    if (!post || !post.isPublished) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Blog post not found' },
          timestamp: new Date().toISOString(),
          path: `/api/blog/${slug}`,
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post,
      timestamp: new Date().toISOString(),
      path: `/api/blog/${slug}`,
    })
  } catch (error) {
    console.error('GET /api/blog/[slug] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch blog post' },
        timestamp: new Date().toISOString(),
        path: '/api/blog/[slug]',
      },
      { status: 500 }
    )
  }
}
