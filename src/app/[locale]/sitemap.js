export default function sitemap(){
  const baseUrl = 'https://edu.galahub.tz'
  
  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sw: `${baseUrl}/sw`,
        },
      },
    },
    {
      url: `${baseUrl}/sw`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sw: `${baseUrl}/sw`,
        },
      },
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sw: `${baseUrl}/sw`,
        },
      },
    },
    {
      url: `${baseUrl}/en/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/about-us`,
          sw: `${baseUrl}/sw/about-us`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/about-us`,
          sw: `${baseUrl}/sw/about-us`,
        },
      },
    },
    {
      url: `${baseUrl}/en/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cookies-policy`,
          sw: `${baseUrl}/sw/cookies-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cookies-policy`,
          sw: `${baseUrl}/sw/cookies-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/terms-and-privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms-and-privacy`,
          sw: `${baseUrl}/sw/terms-and-privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/terms-and-privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms-and-privacy`,
          sw: `${baseUrl}/sw/terms-and-privacy`,
        },
      },
    },
  ]
}