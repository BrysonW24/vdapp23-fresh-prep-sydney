import { MapPin, Search, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import type { DeliveryZoneInfo } from '@/types'

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

const DELIVERY_ZONES: DeliveryZoneInfo[] = [
  // Inner West
  { id: '1', name: 'Inner West', suburb: 'Newtown', postcode: '2042', deliveryDays: ['Tuesday', 'Friday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '2', name: 'Inner West', suburb: 'Marrickville', postcode: '2204', deliveryDays: ['Tuesday', 'Friday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '3', name: 'Inner West', suburb: 'Leichhardt', postcode: '2040', deliveryDays: ['Tuesday', 'Friday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '4', name: 'Inner West', suburb: 'Balmain', postcode: '2041', deliveryDays: ['Tuesday', 'Friday'], deliveryFee: 0, cutoffHour: 18 },
  // CBD & Eastern
  { id: '5', name: 'CBD & Eastern Suburbs', suburb: 'Sydney CBD', postcode: '2000', deliveryDays: ['Wednesday', 'Saturday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '6', name: 'CBD & Eastern Suburbs', suburb: 'Surry Hills', postcode: '2010', deliveryDays: ['Wednesday', 'Saturday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '7', name: 'CBD & Eastern Suburbs', suburb: 'Bondi', postcode: '2026', deliveryDays: ['Wednesday', 'Saturday'], deliveryFee: 5.95, cutoffHour: 18 },
  { id: '8', name: 'CBD & Eastern Suburbs', suburb: 'Randwick', postcode: '2031', deliveryDays: ['Wednesday', 'Saturday'], deliveryFee: 5.95, cutoffHour: 18 },
  // North Shore
  { id: '9', name: 'North Shore', suburb: 'North Sydney', postcode: '2060', deliveryDays: ['Thursday'], deliveryFee: 5.95, cutoffHour: 18 },
  { id: '10', name: 'North Shore', suburb: 'Mosman', postcode: '2088', deliveryDays: ['Thursday'], deliveryFee: 5.95, cutoffHour: 18 },
  { id: '11', name: 'North Shore', suburb: 'Chatswood', postcode: '2067', deliveryDays: ['Thursday'], deliveryFee: 7.95, cutoffHour: 18 },
  { id: '12', name: 'North Shore', suburb: 'Lane Cove', postcode: '2066', deliveryDays: ['Thursday'], deliveryFee: 7.95, cutoffHour: 18 },
  // South
  { id: '13', name: 'Southern Suburbs', suburb: 'Mascot', postcode: '2020', deliveryDays: ['Wednesday', 'Saturday'], deliveryFee: 0, cutoffHour: 18 },
  { id: '14', name: 'Southern Suburbs', suburb: 'Hurstville', postcode: '2220', deliveryDays: ['Saturday'], deliveryFee: 7.95, cutoffHour: 16 },
  { id: '15', name: 'Southern Suburbs', suburb: 'Kogarah', postcode: '2217', deliveryDays: ['Saturday'], deliveryFee: 7.95, cutoffHour: 16 },
  { id: '16', name: 'Southern Suburbs', suburb: 'Cronulla', postcode: '2230', deliveryDays: ['Saturday'], deliveryFee: 9.95, cutoffHour: 14 },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function groupByRegion(zones: DeliveryZoneInfo[]): Record<string, DeliveryZoneInfo[]> {
  return zones.reduce<Record<string, DeliveryZoneInfo[]>>((acc, zone) => {
    if (!acc[zone.name]) acc[zone.name] = []
    acc[zone.name].push(zone)
    return acc
  }, {})
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function DeliveryAreasPage() {
  const grouped = groupByRegion(DELIVERY_ZONES)

  return (
    <div className="bg-warm-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="Delivery Areas"
          subtitle="We deliver fresh meals across Sydney. Check if we deliver to your area."
        />

        {/* Postcode checker */}
        <Card className="mx-auto mt-10 max-w-lg border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-sage" />
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Check My Postcode
              </h3>
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter your postcode"
                maxLength={4}
                className="flex-1 rounded-lg border border-cream bg-warm-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
              />
              <Button className="bg-sage text-white hover:bg-sage-dark">
                <Search className="mr-2 h-4 w-4" />
                Check
              </Button>
            </div>
            {/* Static result placeholder */}
            <div className="mt-4 rounded-lg bg-sage/5 p-3">
              <p className="text-sm text-charcoal/70">
                Enter your postcode above to see delivery days and fees for your area.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery info banner */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-xl bg-cream-light p-4">
          <Truck className="h-6 w-6 shrink-0 text-sage" />
          <p className="text-sm text-charcoal/70">
            <strong className="text-charcoal">Free delivery</strong> on orders over $80 within
            the Inner West and CBD. All meals are delivered in insulated packaging to keep them
            fresh.
          </p>
        </div>

        {/* Delivery zones table */}
        <div className="mt-12 space-y-10">
          {Object.entries(grouped).map(([region, zones]) => (
            <div key={region}>
              <h2 className="font-heading text-xl font-bold text-charcoal">{region}</h2>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cream-light">
                      <th className="px-4 py-3 text-left font-medium text-charcoal">Suburb</th>
                      <th className="px-4 py-3 text-left font-medium text-charcoal">Postcode</th>
                      <th className="px-4 py-3 text-left font-medium text-charcoal">Delivery Days</th>
                      <th className="px-4 py-3 text-right font-medium text-charcoal">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream bg-white">
                    {zones.map((zone) => (
                      <tr key={zone.id} className="transition-colors hover:bg-warm-white">
                        <td className="px-4 py-3 text-charcoal">{zone.suburb}</td>
                        <td className="px-4 py-3 text-charcoal/70">{zone.postcode}</td>
                        <td className="px-4 py-3 text-charcoal/70">{zone.deliveryDays.join(', ')}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          {zone.deliveryFee === 0 ? (
                            <span className="text-sage">Free</span>
                          ) : (
                            <span className="text-charcoal">${zone.deliveryFee.toFixed(2)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Don't see your suburb? */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/60">
            Don&apos;t see your suburb listed?{' '}
            <a href="mailto:hello@freshprepsydney.com.au" className="font-medium text-sage hover:underline">
              Get in touch
            </a>{' '}
            and we will let you know when we expand to your area.
          </p>
        </div>
      </div>
    </div>
  )
}
