'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MobileNav } from '@/components/layout/mobile-nav'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { StickyCartBar } from '@/components/shop/sticky-cart-bar'
import { useCartStore } from '@/lib/stores/cart-store'

interface SiteLayoutProps {
  children: React.ReactNode
}

// Pages where the sticky cart bar should not appear
const HIDE_CART_BAR_PATHS = ['/cart', '/checkout']

export function SiteLayout({ children }: SiteLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const getItemCount = useCartStore((s) => s.getItemCount)
  const cartItemCount = getItemCount()

  const showCartBar = !HIDE_CART_BAR_PATHS.some((p) => pathname.startsWith(p))
  // Also hide on product detail pages (they have their own sticky ATC)
  const isProductDetail = /^\/meals\/[^/]+$/.test(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <SiteHeader
        cartItemCount={cartItemCount}
        onMobileMenuOpen={() => setIsMobileNavOpen(true)}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      {showCartBar && !isProductDetail && <StickyCartBar />}
    </div>
  )
}
