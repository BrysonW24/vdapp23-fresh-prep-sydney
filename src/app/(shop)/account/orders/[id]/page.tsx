import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

// Placeholder order data
const order = {
  id: 'FPS-20260213-ABC1',
  status: 'Delivered',
  deliveryDate: '14 Feb 2026',
  items: [
    { name: 'Lemon Herb Chicken', qty: 2, unitPrice: 13.5, total: 27.0 },
    { name: 'Teriyaki Salmon Bowl', qty: 1, unitPrice: 15.0, total: 15.0 },
    { name: 'Mediterranean Lamb', qty: 2, unitPrice: 14.0, total: 28.0 },
    { name: 'Vegan Buddha Bowl', qty: 1, unitPrice: 12.5, total: 12.5 },
  ],
  address: {
    name: 'Jane Smith',
    street: '42 Bondi Road',
    suburb: 'Bondi',
    state: 'NSW',
    postcode: '2026',
    phone: '0412 345 678',
  },
  subtotal: 82.5,
  delivery: 7.0,
  total: 89.5,
}

export default function OrderDetailPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/account/orders">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Order #{order.id}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
              {order.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Delivered {order.deliveryDate}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Items table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Items</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Meal</th>
                  <th className="pb-2 text-center font-medium">Qty</th>
                  <th className="pb-2 text-right font-medium">Unit Price</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-3 text-charcoal">{item.name}</td>
                    <td className="py-3 text-center">{item.qty}</td>
                    <td className="py-3 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-right font-medium">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Delivery address */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-charcoal">
              <p className="font-medium">{order.address.name}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.suburb}, {order.address.state}{' '}
                {order.address.postcode}
              </p>
              <p className="text-muted-foreground">{order.address.phone}</p>
            </CardContent>
          </Card>

          {/* Order summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-charcoal">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-charcoal">
                  ${order.delivery.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span className="text-charcoal">Total</span>
                <span className="text-charcoal">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
