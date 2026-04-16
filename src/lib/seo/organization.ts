export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SeStudio',
  alternateName: 'Steam Engine Studio',
  url: 'https://sestudio.org/',
  logo: 'https://sestudio.org/logos/logo.svg',
  email: 'support@sestudio.org',
  sameAs: [
    'https://store.steampowered.com/publisher/sestudio',
    'https://x.com/SeStudioCompany',
    'https://github.com/SeStudio'
  ]
} as const;
