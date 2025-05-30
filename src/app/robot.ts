import type { MetadataRoute } from 'next'

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://Md Abdullah Al Noman.me/sitemap.xml',
  }
}
