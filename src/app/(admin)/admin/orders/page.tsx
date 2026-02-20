'use client'

import { useState } from 'react'
import Link from 'next/link'

const statuses = ['All', 'PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERED'] as const

const placeholderOrders = [
  {
    id: '1',
    orderNumber: 'FPS-20260213-A1B2',
    customer: 'Sarah Johnson',
    date: '13 Feb 2026',
    status: 'CONFIRMED',
    total: '$89.50',
  },
  {
    id: '2',
    orderNumber: 'FPS-20260213-C3D4',
    customer: 'Michael Chen',
    date: '13 Feb 2026',
    status: 'PREPARING',
    total: '$124.00',
  },
  {
    id: '3',
    orderNumber: 'FPS-20260212-E5F6',
    customer: 'Emily Davis',
    date: '12 Feb 2026',
    status: 'DELIVERED',
    total: '$67.00',
  },
  {
    id: '4',
    orderNumber: 'FPS-20260212-G7H8',
    customer: 'James Wilson',
    date: '12 Feb 2026',
    status: 'PENDING',
    total: '$156.50',
  },
  {
    id: '5',
    orderNumber: 'FPS-20260211-I9J0',
    customer: 'Lisa Park',
    date: '11 Feb 2026',
    status: 'DELIVERED',
    total: '$43.80',
  },
]

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PREPARING: 'bg-purple-100 text-purple-800',
    OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }
  return styles[status] || 'bg-gray-100 text-gray-800'
}

export default function AdminOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filteredOrders =
    activeFilter === 'All'
      ? placeholderOrders
      : placeholderOrders.filter((o) => o.status === activeFilter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Orders</h1>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 rounded-lg bg-muted/30 p-1 w-fit">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === status
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {status === 'All' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left bg-muted/30">
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Order #
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Total
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-sage hover:text-sage-dark transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
