import axios from 'axios'
import { authService } from './authApi'

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          'http://localhost:3000/auth/refresh',
          {},
          { withCredentials: true }
        )

        const newAccessToken = res.data['access_token']
        localStorage.setItem('accessToken', newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        await authService.logout()
      }
    }

    return Promise.reject(error)
  }
)

export default api
