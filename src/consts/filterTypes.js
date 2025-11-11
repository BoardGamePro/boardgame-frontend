export const filterTypes = {
  players: {
    name: 'Players',
    values: [
      {
        text: '1 player',
        value: '1',
      },
      {
        text: '2 players',
        value: '2',
      },
      {
        text: '3-4 players',
        value: '3,4',
      },
      {
        text: '5-6 players',
        value: '5,6',
      },
      {
        text: '7+ players',
        value: '7',
      },
    ],
  },
  age: {
    name: 'Age',
    values: [
      {
        text: '6+',
        value: '6',
      },
      {
        text: '8+',
        value: '8',
      },
      {
        text: '10+',
        value: '10',
      },
      {
        text: '12+',
        value: '12',
      },
      {
        text: '14+',
        value: '14',
      },
      {
        text: '16+',
        value: '16',
      },
      {
        text: '18+',
        value: '18',
      },
    ],
  },
  year: {
    name: 'Year',
    min: 1900,
    max: new Date().getFullYear(),
  },
  rate: {
    name: 'Rate',
    min: 0,
    max: 10,
  },
}
