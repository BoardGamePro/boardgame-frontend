export const getFilterTypes = (t) => ({
  players: {
    name: t('filters.players.title'),
    values: [
      { text: t('filters.players.one'), value: '1' },
      { text: t('filters.players.two'), value: '2' },
      { text: t('filters.players.threeFour'), value: '3,4' },
      { text: t('filters.players.fiveSix'), value: '5,6' },
      { text: t('filters.players.sevenPlus'), value: '7' },
    ],
  },
  age: {
    name: t('filters.age.title'),
    values: [
      { text: t('filters.age.sixPlus'), value: '6' },
      { text: t('filters.age.eightPlus'), value: '8' },
      { text: t('filters.age.tenPlus'), value: '10' },
      { text: t('filters.age.twelvePlus'), value: '12' },
      { text: t('filters.age.fourteenPlus'), value: '14' },
      { text: t('filters.age.sixteenPlus'), value: '16' },
      { text: t('filters.age.eighteenPlus'), value: '18' },
    ],
  },
  year: {
    name: t('filters.year.title'),
    min: 1900,
    max: new Date().getFullYear(),
  },
  rate: {
    name: t('filters.rate.title'),
    min: 0,
    max: 10,
  },
})
