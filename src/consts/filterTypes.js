import { useTranslations } from 'next-intl'

export function useFilterTypes() {
  const t = useTranslations('filters')

  return {
    players: {
      name: t('players.title'),
      values: [
        { text: t('players.one'), value: ',1' },
        { text: t('players.two'), value: ',2' },
        { text: t('players.threeToFour'), value: '3,4' },
        { text: t('players.fiveToSix'), value: '5,6' },
        { text: t('players.sevenPlus'), value: '7,' },
      ],
    },
    age: {
      name: t('age.title'),
      values: [
        { text: t('age.sixPlus'), value: '6' },
        { text: t('age.eightPlus'), value: '8' },
        { text: t('age.tenPlus'), value: '10' },
        { text: t('age.twelvePlus'), value: '12' },
        { text: t('age.fourteenPlus'), value: '14' },
        { text: t('age.sixteenPlus'), value: '16' },
        { text: t('age.eighteenPlus'), value: '18' },
      ],
    },
    year: {
      name: t('year.title'),
      min: 1900,
      max: new Date().getFullYear(),
    },
    rate: {
      name: t('rating.title'),
      min: 0,
      max: 10,
    },
  }
}
