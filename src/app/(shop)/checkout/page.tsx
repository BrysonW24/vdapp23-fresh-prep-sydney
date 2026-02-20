'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StepIndicator } from '@/components/ui/step-indicator'
import {
  Check,
  CreditCard,
  MapPin,
  CalendarDays,
  Plus,
  ShoppingBag,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                  */
/* ------------------------------------------------------------------ */

const savedAddresses = [
  {
    id: '1',
    label: 'Home',
    name: 'Jane Smith',
    street: '42 Bondi Road',
    suburb: 'Bondi',
    postcode: '2026',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    name: 'Jane Smith',
    street: '100 George Street, Level 12',
    suburb: 'Sydney CBD',
    postcode: '2000',
    isDefault: false,
  },
]

const availableDates = [
  { day: 'Mon', date: '17 Feb', available: true },
  { day: 'Tue', date: '18 Feb', available: true },
  { day: 'Wed', date: '19 Feb', available: false },
  { day: 'Thu', date: '20 Feb', available: true },
  { day: 'Fri', date: '21 Feb', available: true },
  { day: 'Sun', date: '23 Feb', available: true },
]

const cartItems = [
  { name: 'Lemon Herb Chicken', qty: 2, price: 13.5 },
  { name: 'Teriyaki Salmon Bowl', qty: 1, price: 15.0 },
  { name: 'Vegan Buddha Bowl', qty: 1, price: 12.5 },
]

const steps = [
  { label: 'Address', description: 'Delivery location' },
  { label: 'Schedule', description: 'Delivery date' },
  { label: 'Payment', description: 'Secure checkout' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    savedAddresses.find((a) => a.isDefault)?.id ?? null
  )
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showNewAddress, setShowNewAddress] = useState(false)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = 7.0
  const total = subtotal + delivery

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
  }
  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading mb-8 text-3xl font-bold text-charcoal">
        Checkout
      </h1>

      {/* Step indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} className="mb-10" />

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main content area */}
        <div>
          {/* ---- Step 1: Address ---- */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-sage" />
                  Select Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => {
                      setSelectedAddress(addr.id)
                      setShowNewAddress(false)
                    }}
                    className={cn(
                      'w-full rounded-lg border p-4 text-left transition-colors',
                      selectedAddress === addr.id
                        ? 'border-sage bg-sage/5'
                        : 'border-gray-200 hover:border-sage/40'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-charcoal">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <Badge className="bg-sage/10 text-sage border-sage/20 text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{addr.name}</p>
                        <p className="text-muted-foreground">
                          {addr.street}, {addr.suburb} {addr.postcode}
                        </p>
                      </div>
                      {selectedAddress === addr.id && (
                        <Check className="h-5 w-5 shrink-0 text-sage" />
                      )}
                    </div>
                  </button>
                ))}

                {!showNewAddress ? (
                  <Button
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() => {
                      setShowNewAddress(true)
                      setSelectedAddress(null)
                    }}
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add New Address
                  </Button>
                ) : (
                  <div className="space-y-3 rounded-lg border border-sage/30 bg-sage/5 p-4">
                    <p className="text-sm font-medium text-charcoal">
                      New Address
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        placeholder="First name"
                        className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                      />
                      <input
                        placeholder="Last name"
                        className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                      />
                    </div>
                    <input
                      placeholder="Street address"
                      className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                    />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input
                        placeholder="Suburb"
                        className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                      />
                      <input
                        placeholder="State"
                        defaultValue="NSW"
                        className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                      />
                      <input
                        placeholder="Postcode"
                        className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                      />
                    </div>
                    <input
                      placeholder="Phone (optional)"
                      className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40"
                    />
                    <div className="flex gap-2">
                      <Button className="bg-sage text-white hover:bg-sage/90">
                        Save Address
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowNewAddress(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={nextStep}
                    disabled={!selectedAddress && !showNewAddress}
                    className="bg-sage text-white hover:bg-sage/90"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ---- Step 2: Delivery date ---- */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2 text-lg">
                  <CalendarDays className="h-5 w-5 text-sage" />
                  Choose Delivery Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Available delivery days for your selected postcode:
                </p>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {availableDates.map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      disabled={!d.available}
                      onClick={() => setSelectedDate(d.date)}
                      className={cn(
                        'flex flex-col items-center rounded-lg border p-3 text-sm transition-colors',
                        !d.available &&
                          'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300',
                        d.available &&
                          selectedDate !== d.date &&
                          'border-gray-200 hover:border-sage/40',
                        selectedDate === d.date &&
                          'border-sage bg-sage/5 font-medium text-sage'
                      )}
                    >
                      <span className="text-xs font-medium uppercase">
                        {d.day}
                      </span>
                      <span className="mt-0.5">{d.date}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!selectedDate}
                    className="bg-sage text-white hover:bg-sage/90"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ---- Step 3: Payment ---- */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-sage" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stripe Elements placeholder */}
                <div className="flex min-h-[180px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                  <div className="text-center">
                    <CreditCard className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="font-medium text-charcoal">
                      Payment form will be integrated here
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Stripe Elements &mdash; card details, Apple Pay, Google Pay
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Link href="/checkout/confirmation">
                    <Button className="bg-sage text-white hover:bg-sage/90">
                      Place Order &mdash; ${total.toFixed(2)}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ---- Order summary sidebar ---- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5 w-5 text-sage" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-charcoal">
                    {item.name}{' '}
                    <span className="text-muted-foreground">x{item.qty}</span>
                  </span>
                  <span className="font-medium text-charcoal">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-charcoal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-charcoal">${delivery.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between text-base font-semibold">
                <span className="text-charcoal">Total</span>
                <span className="text-charcoal">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
