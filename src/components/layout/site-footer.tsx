'use client'

import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function SiteFooter() {
  const t = useTranslations('footer')

  const shopLinks = [
    { href: '/meals', label: t('allMeals') },
    { href: '/meals?filter=weekly', label: t('thisWeeksMenu') },
  ]

  const companyLinks = [
    { href: '/about', label: t('aboutUs') },
    { href: '/blog', label: 'Blog' },
    { href: '/delivery-areas', label: t('deliveryAreas') },
    { href: '/faqs', label: t('faqs') },
  ]

  const policyLinks = [
    { href: '/privacy', label: t('privacy') },
    { href: '/terms', label: t('terms') },
  ]

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-white text-xl font-bold mb-3">
              Fresh Prep Sydney
            </h3>
            <p className="text-sm text-cream/80 mb-4">
              {t('brandDescription')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@aunscookingka24"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-red-600 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/auns_janthana/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('shop')}</h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('stayUpdated')}</h4>
            <p className="text-sm text-cream/80 mb-3">
              {t('newsletterText')}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sage text-white text-sm font-medium rounded-md hover:bg-sage/90 transition-colors"
              >
                {t('join')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/60">
            {t('copyright')}
          </p>
          <ul className="flex items-center gap-6">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
