import { useQuery } from '@tanstack/react-query'
import gamesApi from './api'

const gameService = {
  getAll: async () => {
    const res = await gamesApi.get('/games')
    return res.data
  },
  getByName: async (name) => {
    const res = await gamesApi.get(`/games/${encodeURIComponent(name)}`)
    return res.data
  },
}

export const useGetAllGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: gameService.getAll,
  })
}

export const useGetGameByName = (name) => {
  return useQuery({
    queryKey: ['games', name],
    queryFn: () => gameService.getByName(name),
    enabled: !!name,
  })
}
