import { Truck, Flame, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Delivered Fresh',
    subtitle: 'Across Sydney every week',
  },
  {
    icon: Flame,
    title: 'Macro-Friendly',
    subtitle: 'Every meal tracked & balanced',
  },
  {
    icon: UtensilsCrossed,
    title: 'Heat & Eat',
    subtitle: 'Ready in under 3 minutes',
  },
]

interface TrustStripProps {
  className?: string
  variant?: 'dark' | 'light'
}

export function TrustStrip({ className, variant = 'dark' }: TrustStripProps) {
  return (
    <section
      className={cn(
        'py-8 md:py-10',
        variant === 'dark' ? 'bg-charcoal text-white' : 'bg-cream text-charcoal',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                  variant === 'dark' ? 'bg-sage' : 'bg-sage/10'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    variant === 'dark' ? 'text-white' : 'text-sage'
                  )}
                />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold">{item.title}</h3>
                <p
                  className={cn(
                    'text-xs',
                    variant === 'dark' ? 'text-white/60' : 'text-charcoal/60'
                  )}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
