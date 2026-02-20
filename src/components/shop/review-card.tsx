import { StarRating } from '@/components/shop/star-rating'
import { cn } from '@/lib/utils'

interface ReviewCardProps {
  review: {
    id: string
    rating: number
    title?: string | null
    comment: string
    userName: string
    isVerified: boolean
    createdAt: string
  }
  className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const date = new Date(review.createdAt)
  const formattedDate = date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className={cn('border-b border-border/50 py-4 last:border-0', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size="sm" />
            {review.isVerified && (
              <span className="rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-medium text-sage">
                Verified Purchase
              </span>
            )}
          </div>
          {review.title && (
            <p className="mt-1 text-sm font-semibold text-charcoal">{review.title}</p>
          )}
        </div>
        <span className="shrink-0 text-xs text-charcoal/40">{formattedDate}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{review.comment}</p>
      <p className="mt-1.5 text-xs font-medium text-charcoal/50">{review.userName}</p>
    </div>
  )
}
