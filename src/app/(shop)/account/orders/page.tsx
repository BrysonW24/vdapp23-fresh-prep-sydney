import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

const statusStyles: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700 border-green-200',
  'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
  Preparing: 'bg-amber-100 text-amber-700 border-amber-200',
}

const orders = [
  {
    id: 'FPS-20260210-A1B2',
    date: '10 Feb 2026',
    status: 'Delivered',
    total: '$89.50',
    itemCount: 6,
  },
  {
    id: 'FPS-20260203-C3D4',
    date: '3 Feb 2026',
    status: 'In Transit',
    total: '$124.00',
    itemCount: 9,
  },
  {
    id: 'FPS-20260127-E5F6',
    date: '27 Jan 2026',
    status: 'Preparing',
    total: '$67.00',
    itemCount: 4,
  },
]

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/account">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-heading text-3xl font-bold text-charcoal">
          Order History
        </h1>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium text-charcoal">#{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <Badge
                  className={cn(
                    'mt-1 text-xs',
                    statusStyles[order.status] ?? ''
                  )}
                >
                  {order.status}
                </Badge>
              </div>

              <div className="flex items-center gap-6 sm:text-right">
                <div>
                  <p className="text-lg font-semibold text-charcoal">
                    {order.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                  </p>
                </div>

                <Link href={`/account/orders/${order.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sage text-sage hover:bg-sage/5"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
