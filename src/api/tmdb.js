
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

if (!API_KEY) {
  console.warn('⚠️ Missing VITE_TMDB_API_KEY. Create .env from .env.example')
}

export const imgUrl = (path) => path ? `${IMG_BASE}${path}` : ''

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
})

// Guest session
export async function createGuestSession() {
  const { data } = await api.get('/authentication/guest_session/new')
  return data.guest_session_id
}

// Genres
export async function fetchGenres() {
  const { data } = await api.get('/genre/movie/list')
  return data.genres || []
}

// Search
export async function searchMovies({ query, page = 1 }) {
  const { data } = await api.get('/search/movie', { params: { query, page, include_adult: false } })
  return data
}

// Rate a movie (0.5 steps, 0.5-10)
export async function rateMovie({ movieId, value, guestSessionId }) {
  const { data } = await api.post(`/movie/${movieId}/rating`, { value }, { params: { guest_session_id: guestSessionId } })
  return data
}

// Rated movies by guest
export async function fetchRatedMovies({ guestSessionId, page = 1 }) {
  const { data } = await api.get(`/guest_session/${guestSessionId}/rated/movies`, { params: { page, sort_by: 'created_at.asc' } })
  return data
}
