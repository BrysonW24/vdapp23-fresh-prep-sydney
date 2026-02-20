'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { setLocale } from '@/i18n/actions'
import type { Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('language')
  const [isPending, startTransition] = useTransition()

  function handleChange(newLocale: Locale) {
    startTransition(async () => {
      await setLocale(newLocale)
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={() => handleChange(locale === 'en' ? 'ko' : 'en')}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-full border border-sage/30 px-3 py-1 text-xs font-medium text-charcoal transition-colors hover:bg-sage/10 disabled:opacity-50"
      aria-label={t('label')}
    >
      <span className="text-sm">{locale === 'en' ? '🇰🇷' : '🇦🇺'}</span>
      <span>{locale === 'en' ? '한국어' : 'English'}</span>
    </button>
  )
}
