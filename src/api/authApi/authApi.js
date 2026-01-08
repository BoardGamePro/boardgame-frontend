import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from './api'
import { useAuth } from '@/app/[locale]/AuthProvider'

export const authService = {
  register: async ({ username, email, password }) => {
    const res = await api.post('/auth/register', {
      username,
      email,
      password,
    })

    return res.data
  },

  login: async ({ username, password }) => {
    const res = await api.post('auth/login', {
      username,
      password,
    })

    localStorage.setItem('accessToken', res.data['access_token'])

    const profile = await authService.getProfile()
    return profile
  },

  getProfile: async () => {
    const res = await api.get('users/me')

    return res.data
  },

  logout: async () => {
    await api.post('users/logout')
  },

  getUserById: async (userId) => {
    const res = await api.get(`/users/id/${userId}`)

    return res.data
  },

  changeProfile: async ({ bio, isProfilePublic, isPublicCollection }) => {
    await api.patch('/users/me/profile', {
      bio,
      is_profile_public: isProfilePublic,
      is_collection_public: isPublicCollection,
    })
  },

  getNotes: async ({ gameName, page }) => {
    const res = await api.get(`/comments/?game_name=${gameName}&page=${page}`)

    return res.data
  },

  addNote: async ({ gameName, page, text, title }) => {
    await api.post('/comments/', {
      game_name: gameName,
      page: String(page),
      comment_text: text,
      title,
    })
  },
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (userData) => {
      queryClient.setQueryData(['profile'], userData)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries(['profile'])
      setUser(null)
      localStorage.removeItem('accessToken')
    },
  })
}

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: ['userId', userId],
    queryFn: () => authService.getUserById(userId),
    retry: false,
  })
}

export const useChangeProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.changeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
  })
}

export const useGetNotes = ({ gameName, page }) => {
  return useQuery({
    queryKey: ['page', page],
    queryFn: () => authService.getNotes({ gameName, page }),
    retry: false,
  })
}

export const useAddNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.addNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['page'])
    },
  })
}
