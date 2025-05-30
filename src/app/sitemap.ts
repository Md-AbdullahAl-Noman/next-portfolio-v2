import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://Md Abdullah Al Noman.me',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://Md Abdullah Al Noman.me/projects',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
