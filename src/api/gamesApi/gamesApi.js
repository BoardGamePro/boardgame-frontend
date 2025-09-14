import { useQuery } from '@tanstack/react-query'
import gamesApi from './api'
import { useLocale } from 'next-intl'

const getCurrentLang = () => {
  const locale = useLocale()

  if (!locale) return 'ru'
}

const gameService = {
  getAll: async (lang) => {
    const res = await gamesApi.get('/games', {
      params: { language: lang },
    })
    return res.data
  },
  getByName: async (name, lang) => {
    const res = await gamesApi.get(`/games/${encodeURIComponent(name)}`, {
      params: { language: lang },
    })
    return res.data
  },
}

export const useGetAllGames = () => {
  const locale = useLocale()

  return useQuery({
    queryKey: ['games', locale],
    queryFn: () => gameService.getAll(locale),
  })
}

export const useGetGameByName = (name) => {
  const locale = useLocale()

  return useQuery({
    queryKey: ['games', name, locale],
    queryFn: () => gameService.getByName(name, locale),
    enabled: !!name,
  })
}
