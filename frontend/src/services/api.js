import axios from 'axios'

// In dev: Vite proxy routes /api → localhost:8000 (see vite.config.js)
// In prod: set VITE_API_URL in your .env
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ── Request interceptor: attach Bearer token if present ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor: unwrap data, normalise errors ──
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  },
)

// ── Resource endpoints ──
// Rename "items" to whatever your resource is called

export const itemsApi = {
  getAll:   (params)       => api.get('/items', { params }),
  getById:  (id)           => api.get(`/items/${id}`),
  create:   (data)         => api.post('/items', data),
  update:   (id, data)     => api.patch(`/items/${id}`, data),
  remove:   (id)           => api.delete(`/items/${id}`),
}

export const healthApi = {
  check: () => api.get('/health'),
}

export default api
