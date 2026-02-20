import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/account/', '/checkout/', '/dev-menu/'],
      },
    ],
    sitemap: 'https://freshprepsydney.com.au/sitemap.xml',
  }
}
