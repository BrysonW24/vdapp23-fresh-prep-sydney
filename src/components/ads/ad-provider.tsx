'use client'

import Script from 'next/script'

/**
 * Ad network script loader.
 * Reads NEXT_PUBLIC_AD_NETWORK env var to determine which ad network to load.
 * Values: 'adsense' | 'mediavine' | 'raptive' | '' (none)
 *
 * Also requires the corresponding site ID env var:
 * - NEXT_PUBLIC_ADSENSE_ID (e.g., "ca-pub-XXXXXXXXXX")
 * - NEXT_PUBLIC_MEDIAVINE_ID (e.g., "your-site-slug")
 * - NEXT_PUBLIC_RAPTIVE_ID (e.g., "67f6a623eeafe82d5a769613")
 */
export function AdProvider() {
  const network = process.env.NEXT_PUBLIC_AD_NETWORK || ''

  if (!network) return null

  if (network === 'adsense') {
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
    if (!adsenseId) return null
    return (
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    )
  }

  if (network === 'mediavine') {
    const mediavineId = process.env.NEXT_PUBLIC_MEDIAVINE_ID
    if (!mediavineId) return null
    return (
      <Script
        src={`https://scripts.mediavine.com/tags/${mediavineId}.js`}
        strategy="lazyOnload"
      />
    )
  }

  if (network === 'raptive') {
    const raptiveId = process.env.NEXT_PUBLIC_RAPTIVE_ID
    if (!raptiveId) return null
    return (
      <Script
        src={`https://ads.adthrive.com/sites/${raptiveId}/ads.min.js`}
        strategy="lazyOnload"
      />
    )
  }

  return null
}
