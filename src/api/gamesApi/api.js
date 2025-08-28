import axios from 'axios'

const GAMES_API_URL = process.env.NEXT_PUBLIC_GAMES_API_URL

const gamesApi = axios.create({
  baseURL: GAMES_API_URL,
})

export default gamesApi
