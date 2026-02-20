'use client'

import { useState } from 'react'
import { StarRating } from '@/components/shop/star-rating'
import { cn } from '@/lib/utils'

interface WriteReviewFormProps {
  mealId: string
  mealName: string
  onClose: () => void
  className?: string
}

export function WriteReviewForm({
  mealId,
  mealName,
  onClose,
  className,
}: WriteReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      // TODO: Wire to API when review backend is ready
      // await fetch(`/api/meals/${mealId}/reviews`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rating, title, comment }),
      // })

      // Simulate submission delay
      await new Promise((r) => setTimeout(r, 500))
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={cn('rounded-xl border border-sage/30 bg-sage/5 p-6 text-center', className)}>
        <p className="text-lg font-semibold text-sage">Thank you for your review!</p>
        <p className="mt-1 text-sm text-charcoal/60">
          Your review for {mealName} has been submitted.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('rounded-xl border border-border bg-white p-5', className)}
    >
      <h3 className="font-heading text-base font-semibold text-charcoal">
        Write a Review
      </h3>
      <p className="mt-1 text-xs text-charcoal/50">Share your experience with {mealName}</p>

      {/* Rating */}
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Your Rating *
        </label>
        <StarRating
          rating={rating}
          size="lg"
          interactive
          onChange={setRating}
        />
        {rating === 0 && (
          <p className="mt-1 text-xs text-charcoal/40">Click to rate</p>
        )}
      </div>

      {/* Title */}
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Title <span className="text-charcoal/40">(optional)</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience"
          className="w-full rounded-lg border border-border px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30"
        />
      </div>

      {/* Comment */}
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Your Review *
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="What did you think of this meal?"
          required
          className="w-full resize-none rounded-lg border border-border px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30"
        />
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={rating === 0 || !comment.trim() || isSubmitting}
          className="rounded-lg bg-sage px-5 py-2 text-sm font-semibold text-white hover:bg-sage-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
