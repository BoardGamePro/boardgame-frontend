export const getFooterNavCategories = (t) => [
  {
    title: t('about.title'),
    items: [
      { name: t('about.aboutProject'), link: '/about' },
      { name: t('about.team'), link: '/team' },
    ],
  },
  {
    title: t('policies.title'),
    items: [
      { name: t('policies.terms'), link: '/terms' },
      { name: t('policies.privacy'), link: '/privacy' },
      { name: t('policies.sources'), link: '/sources' },
    ],
  },
  {
    title: t('contacts.title'),
    items: [
      { name: t('contacts.feedback'), link: '/feedback' },
      { name: t('contacts.support'), link: '/support' },
    ],
  },
]
