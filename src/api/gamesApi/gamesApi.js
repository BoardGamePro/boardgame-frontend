import { useQuery } from '@tanstack/react-query'
import gamesApi from './api'

const getCurrentLang = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang') || 'ru'
  }
  return 'ru'
}

const gameService = {
  getAll: async () => {
    const lang = getCurrentLang()
    const res = await gamesApi.get('/games', {
      params: { language: lang },
    })
    return res.data
  },
  getByName: async (name) => {
    const lang = getCurrentLang()
    const res = await gamesApi.get(`/games/${encodeURIComponent(name)}`, {
      params: { language: lang },
    })
    return res.data
  },
}

export const useGetAllGames = () => {
  return useQuery({
    queryKey: ['games', getCurrentLang()],
    queryFn: gameService.getAll,
  })
}

export const useGetGameByName = (name) => {
  return useQuery({
    queryKey: ['games', name, getCurrentLang()],
    queryFn: () => gameService.getByName(name),
    enabled: !!name,
  })
}
