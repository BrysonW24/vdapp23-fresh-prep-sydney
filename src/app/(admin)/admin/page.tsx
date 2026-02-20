import {
  UtensilsCrossed,
  Package,
  DollarSign,
  RefreshCw,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Meals',
    value: '15',
    icon: UtensilsCrossed,
    color: 'bg-sage/10 text-sage',
  },
  {
    label: 'Orders Today',
    value: '3',
    icon: Package,
    color: 'bg-peach/20 text-peach-dark',
  },
  {
    label: 'Revenue This Week',
    value: '$2,450',
    icon: DollarSign,
    color: 'bg-green-50 text-green-700',
  },
  {
    label: 'Active Subscriptions',
    value: '12',
    icon: RefreshCw,
    color: 'bg-blue-50 text-blue-700',
  },
]

const recentOrders = [
  {
    orderNumber: 'FPS-20260213-A1B2',
    customer: 'Sarah Johnson',
    date: '13 Feb 2026',
    status: 'CONFIRMED',
    total: '$89.50',
  },
  {
    orderNumber: 'FPS-20260213-C3D4',
    customer: 'Michael Chen',
    date: '13 Feb 2026',
    status: 'PREPARING',
    total: '$124.00',
  },
  {
    orderNumber: 'FPS-20260212-E5F6',
    customer: 'Emily Davis',
    date: '12 Feb 2026',
    status: 'DELIVERED',
    total: '$67.00',
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

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2.5 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
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
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.orderNumber}
                  className="border-b border-border last:border-0"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
