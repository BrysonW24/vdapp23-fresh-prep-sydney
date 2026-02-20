import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationPage() {
  // Placeholder order data
  const orderNumber = 'FPS-20260213-XY7Z'
  const estimatedDelivery = 'Monday, 17 February 2026'

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      {/* Success icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>

      <h1 className="font-heading text-3xl font-bold text-charcoal">
        Order Confirmed!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Thank you for your order. We&apos;re preparing your fresh meals now.
      </p>

      {/* Order details card */}
      <Card className="mt-8 w-full text-left">
        <CardContent className="space-y-3 p-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order number</span>
            <span className="font-medium text-charcoal">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated delivery</span>
            <span className="font-medium text-charcoal">
              {estimatedDelivery}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/account/orders/${orderNumber}`}>
          <Button className="bg-sage text-white hover:bg-sage/90">
            View Order
          </Button>
        </Link>
        <Link href="/menu">
          <Button variant="outline" className="border-sage text-sage hover:bg-sage/5">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
