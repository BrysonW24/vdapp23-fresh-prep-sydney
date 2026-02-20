'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function SettingsPage() {
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
          Account Settings
        </h1>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-charcoal"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    defaultValue="Jane Smith"
                    className={cn(
                      'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="settingsEmail"
                    className="text-sm font-medium text-charcoal"
                  >
                    Email
                  </label>
                  <input
                    id="settingsEmail"
                    type="email"
                    defaultValue="jane@example.com"
                    className={cn(
                      'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-charcoal"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  defaultValue="0412 345 678"
                  className={cn(
                    'flex h-10 w-full max-w-sm rounded-md border bg-white px-3 py-2 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                  )}
                />
              </div>

              <Button
                type="button"
                className="bg-sage text-white hover:bg-sage/90"
              >
                Save changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-charcoal"
                >
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className={cn(
                    'flex h-10 w-full max-w-sm rounded-md border bg-white px-3 py-2 text-sm',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-charcoal"
                  >
                    New password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Min 8 chars"
                    className={cn(
                      'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
                      'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmNewPassword"
                    className="text-sm font-medium text-charcoal"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    placeholder="Re-enter new password"
                    className={cn(
                      'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
                      'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage'
                    )}
                  />
                </div>
              </div>

              <Button
                type="button"
                className="bg-sage text-white hover:bg-sage/90"
              >
                Update password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
