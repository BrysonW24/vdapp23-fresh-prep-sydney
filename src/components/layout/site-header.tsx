'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ShoppingBag, User, Menu } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'

interface SiteHeaderProps {
  cartItemCount: number
  onMobileMenuOpen?: () => void
}

export function SiteHeader({ cartItemCount, onMobileMenuOpen }: SiteHeaderProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const navLinks = [
    { href: '/meals', label: t('shopMeals') },
    { href: '/delivery-areas', label: t('deliveryAreas') },
    { href: '/macro-calculator', label: 'Macro Calculator' },
    { href: '/blog', label: t('blog') },
  ]

  return (
    <header>
      <div className="h-3.5 bg-peach" />
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading font-bold text-sage text-xl">
            Fresh Prep Sydney
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href.split('#')[0]))

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-sage ${
                      isActive ? 'text-sage' : 'text-charcoal'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right Side: Language + Cart + Account + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/cart"
              className="relative text-charcoal hover:text-sage transition-colors"
              aria-label={t('cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sage text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              className="text-charcoal hover:text-sage transition-colors"
              aria-label={t('account')}
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              type="button"
              className="md:hidden text-charcoal hover:text-sage transition-colors"
              onClick={onMobileMenuOpen}
              aria-label={t('openMenu')}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
