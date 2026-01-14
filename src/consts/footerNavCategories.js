import { useTranslations } from 'next-intl'

export function useFooterNavCategories() {
  const t = useTranslations('footer')

  return [
    {
      title: t('about.sectionTitle'),
      items: [
        { name: t('about.aboutProjectLink'), link: '/about' },
        { name: t('about.teamLink'), link: '/team' },
      ],
    },
    {
      title: t('policies.sectionTitle'),
      items: [
        { name: t('policies.termsLink'), link: '/terms' },
        { name: t('policies.privacyLink'), link: '/privacy' },
        { name: t('policies.sourcesLink'), link: '/sources' },
      ],
    },
    {
      title: t('contacts.sectionTitle'),
      items: [
        { name: t('contacts.feedbackLink'), link: '/feedback' },
        { name: t('contacts.supportLink'), link: '/support' },
      ],
    },
  ]
}
