import { cn } from '@/lib/utils'

const PAYMENT_METHODS = [
  { name: 'Visa', svg: 'VISA' },
  { name: 'Mastercard', svg: 'MC' },
  { name: 'American Express', svg: 'AMEX' },
  { name: 'Apple Pay', svg: 'Apple Pay' },
  { name: 'Google Pay', svg: 'G Pay' },
]

interface PaymentIconsProps {
  className?: string
}

export function PaymentIcons({ className }: PaymentIconsProps) {
  return (
    <div className={cn('', className)}>
      <p className="text-xs font-medium text-charcoal/50 mb-2">Payment Made Easy</p>
      <div className="flex items-center gap-2">
        {PAYMENT_METHODS.map((pm) => (
          <div
            key={pm.name}
            className="flex h-8 items-center justify-center rounded border border-border bg-white px-2.5 text-[10px] font-bold text-charcoal/60"
            title={pm.name}
          >
            {pm.svg}
          </div>
        ))}
      </div>
    </div>
  )
}
