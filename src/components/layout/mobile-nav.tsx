'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const navLinks = [
    { href: '/meals', label: t('shopMeals') },
    { href: '/delivery-areas', label: t('deliveryAreas') },
    { href: '/macro-calculator', label: 'Macro Calculator' },
    { href: '/blog', label: t('blog') },
    { href: '/account', label: t('myAccount') },
  ]

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link
              href="/"
              className="font-heading font-bold text-sage text-lg"
              onClick={onClose}
            >
              Fresh Prep Sydney
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="text-charcoal hover:text-sage transition-colors"
              aria-label={t('closeMenu')}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul>
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href.split('#')[0]))

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block py-3 px-4 border-b border-border text-base font-medium transition-colors hover:bg-cream/50 ${
                        isActive ? 'text-sage bg-cream/30' : 'text-charcoal'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Language + Social */}
          <div className="p-4 border-t border-border space-y-3">
            <LanguageSwitcher />
            <p className="text-sm text-charcoal/60">{t('followUs')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
