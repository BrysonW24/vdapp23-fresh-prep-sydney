import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'

const addresses = [
  {
    id: '1',
    label: 'Home',
    name: 'Jane Smith',
    street: '42 Bondi Road',
    suburb: 'Bondi',
    postcode: '2026',
    phone: '0412 345 678',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    name: 'Jane Smith',
    street: '100 George Street, Level 12',
    suburb: 'Sydney CBD',
    postcode: '2000',
    phone: '0412 345 678',
    isDefault: false,
  },
]

export default function AddressesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/account">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            My Addresses
          </h1>
        </div>
        <Button className="bg-sage text-white hover:bg-sage/90">
          <Plus className="mr-1.5 h-4 w-4" />
          Add New Address
        </Button>
      </div>

      {/* Address cards */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <Card
            key={addr.id}
            className={cn(
              'transition-shadow hover:shadow-md',
              addr.isDefault && 'border-sage/40'
            )}
          >
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage/10">
                  <MapPin className="h-4 w-4 text-sage" />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-medium"
                    >
                      {addr.label}
                    </Badge>
                    {addr.isDefault && (
                      <Badge className="bg-sage/10 text-sage border-sage/20 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium text-charcoal">{addr.name}</p>
                  <p className="text-muted-foreground">{addr.street}</p>
                  <p className="text-muted-foreground">
                    {addr.suburb}, NSW {addr.postcode}
                  </p>
                  <p className="text-muted-foreground">{addr.phone}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sage/40 text-sage hover:bg-sage/5"
                >
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
