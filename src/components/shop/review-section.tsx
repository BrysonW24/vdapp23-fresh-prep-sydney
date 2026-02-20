'use client'

import { useState } from 'react'
import { StarRating } from '@/components/shop/star-rating'
import { ReviewCard } from '@/components/shop/review-card'
import { WriteReviewForm } from '@/components/shop/write-review-form'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  rating: number
  title?: string | null
  comment: string
  userName: string
  isVerified: boolean
  createdAt: string
}

interface ReviewSectionProps {
  mealId: string
  mealName: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
  className?: string
}

export function ReviewSection({
  mealId,
  mealName,
  reviews,
  averageRating,
  totalReviews,
  className,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section className={cn('mt-10', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Customer Reviews
          </h2>
          {totalReviews > 0 && (
            <div className="mt-1 flex items-center gap-2">
              <StarRating rating={averageRating} size="sm" />
              <span className="text-sm text-charcoal/60">
                {averageRating.toFixed(1)} out of 5 ({totalReviews}{' '}
                {totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg border border-sage px-4 py-2 text-sm font-medium text-sage hover:bg-sage/5 transition-colors"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Write review form */}
      {showForm && (
        <WriteReviewForm
          mealId={mealId}
          mealName={mealName}
          onClose={() => setShowForm(false)}
          className="mt-4"
        />
      )}

      {/* Reviews list */}
      <div className="mt-4">
        {reviews.length === 0 && !showForm && (
          <p className="py-8 text-center text-sm text-charcoal/50">
            No reviews yet. Be the first to review this meal!
          </p>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
