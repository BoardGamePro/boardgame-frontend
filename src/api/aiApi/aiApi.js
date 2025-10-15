import { useAuth } from '@/app/[locale]/AuthProvider'
import api from './api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const aiService = {
  createChat: async ({ userId, title }) => {
    const res = await api.post('/chats', {
      user_id: userId,
      title,
    })

    return res.data
  },

  getChats: async (userId) => {
    const res = await api.get(`/chats?user_id=${userId}`)

    return res.data
  },

  getChatInfo: async (chatId) => {
    const res = await api.get(`/chats/${chatId}`)

    return res.data
  },

  deleteChat: async (chatId) => {
    const res = await api.delete(`/chats/${chatId}`)

    return res.data
  },

  getChatMessages: async ({ chatId, userId }) => {
    const res = await api.get(`/chats/${chatId}/messages?user_id=${userId}`)

    return res.data
  },

  sendMessage: async ({ userId, chatId, query }) => {
    const res = await api.post('/chat', {
      user_id: userId,
      chat_id: chatId,
      query,
      use_history: true,
    })

    return res.data
  },

  getResultByQueryMessage: async (jobId) => {
    const res = await api.get(`/result/${jobId}`)

    return res.data
  },
}

export const useGetChats = () => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['chats', user?.id],
    queryFn: () => aiService.getChats(user.id),
    enabled: !!user?.id,
  })
}

export const useGetChatInfo = (chatId) => {
  return useQuery({
    queryKey: ['chatInfo', chatId],
    queryFn: () => aiService.getChatInfo(chatId),
    enabled: !!chatId,
  })
}

export const useGetChatMessages = (chatId) => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['chatMessages', chatId, user?.id],
    queryFn: () => aiService.getChatMessages({ chatId, userId: user.id }),
    enabled: !!user?.id && !!chatId,
  })
}

export const useGetResultByQueryMessage = (jobId, options = {}) => {
  return useQuery({
    queryKey: ['result', jobId],
    queryFn: () => aiService.getResultByQueryMessage(jobId),
    enabled: !!jobId,
    refetchInterval: options.refetchInterval,
  })
}

export const useCreateChat = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ title }) => aiService.createChat({ userId: user.id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
  })
}

export const useSendMessage = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ chatId, query }) =>
      aiService.sendMessage({ userId: user.id, chatId, query }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chatMessages', variables.chatId],
      })
    },
  })
}

export const useDeleteChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ chatId }) => aiService.deleteChat(chatId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.removeQueries({ queryKey: ['chatInfo', variables.chatId] })
      queryClient.removeQueries({
        queryKey: ['chatMessages', variables.chatId],
      })
    },
  })
}
