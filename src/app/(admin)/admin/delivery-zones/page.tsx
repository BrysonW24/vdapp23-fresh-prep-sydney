'use client'

import { useState } from 'react'
import Link from 'next/link'

const placeholderZones = [
  {
    id: '1',
    name: 'Sydney CBD',
    postcode: '2000',
    suburb: 'Sydney',
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    deliveryFee: '$0.00',
    isActive: true,
  },
  {
    id: '2',
    name: 'Bondi',
    postcode: '2026',
    suburb: 'Bondi',
    deliveryDays: ['Tuesday', 'Thursday'],
    deliveryFee: '$5.00',
    isActive: true,
  },
  {
    id: '3',
    name: 'Surry Hills',
    postcode: '2010',
    suburb: 'Surry Hills',
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    deliveryFee: '$0.00',
    isActive: true,
  },
  {
    id: '4',
    name: 'Manly',
    postcode: '2095',
    suburb: 'Manly',
    deliveryDays: ['Wednesday', 'Saturday'],
    deliveryFee: '$8.00',
    isActive: true,
  },
  {
    id: '5',
    name: 'Parramatta',
    postcode: '2150',
    suburb: 'Parramatta',
    deliveryDays: ['Thursday'],
    deliveryFee: '$10.00',
    isActive: false,
  },
]

export default function AdminDeliveryZonesPage() {
  const [zones, setZones] = useState(placeholderZones)

  const toggleActive = (id: string) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === id ? { ...zone, isActive: !zone.isActive } : zone
      )
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Delivery Zones</h1>
        <Link
          href="/admin/delivery-zones/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage px-4 py-2.5 text-sm font-medium text-white hover:bg-sage-dark transition-colors"
        >
          + Add Zone
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left bg-muted/30">
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Postcode
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Suburb
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Delivery Days
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Fee
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr
                  key={zone.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {zone.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {zone.postcode}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {zone.suburb}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {zone.deliveryDays.map((day) => (
                        <span
                          key={day}
                          className="inline-flex rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {zone.deliveryFee}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(zone.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        zone.isActive ? 'bg-sage' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          zone.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
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
