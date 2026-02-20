/**
 * In-content ad placement component.
 * Renders a container div that ad networks auto-fill with ads.
 * When no ad network is configured, renders nothing (no empty space).
 *
 * Ad networks (AdSense, Mediavine, Raptive) scan the page and inject ads
 * into these containers automatically. The data-ad-slot attribute helps
 * them identify placement positions.
 */
export function AdSlot({
  slot,
  className = '',
}: {
  slot: string
  className?: string
}) {
  const network = process.env.NEXT_PUBLIC_AD_NETWORK || ''

  // Don't render anything if no ad network configured
  if (!network) return null

  return (
    <div
      className={`ad-slot my-8 flex min-h-[250px] items-center justify-center ${className}`}
      data-ad-slot={slot}
      data-ad-network={network}
    >
      {/* Ad networks auto-fill this container */}
      {/* In development, show a placeholder */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex h-[250px] w-full items-center justify-center rounded-lg border-2 border-dashed border-sage/20 bg-cream/50 text-sm text-charcoal/30">
          Ad Slot: {slot}
        </div>
      )}
    </div>
  )
}
