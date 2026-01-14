import { useTranslations } from 'next-intl'

export function useSortingTypes() {
  const t = useTranslations('sorting')

  return [
    {
      text: t('byRating'),
      value: 'rating',
    },
    {
      text: t('byYear'),
      value: 'year',
    },
  ]
}
