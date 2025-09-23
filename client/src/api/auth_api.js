import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Important for cookies
  timeout: 10000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🔄 API Request:', config.method?.toUpperCase(), config.url, config.data)
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data)
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data)
    
    // Handle common errors
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - redirecting to login')
      // You can add redirect logic here later
    }
    
    return Promise.reject(error)
  }
)

// 🔗 AUTH API ENDPOINTS

// 1. Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw error
  }
}

// 2. Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error
  }
}

// 3. Logout user
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout')
    return response.data
  } catch (error) {
    throw error
  }
}

// 4. Get user profile
export const getUserProfile = async () => {
  try {
    console.log('🔄 Making GET request to /auth/profile')
    console.log('🔄 Request headers:', api.defaults.headers)
    console.log('🔄 With credentials:', api.defaults.withCredentials)
    const response = await api.get('/auth/profile')
    console.log('✅ Profile response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Profile request failed:', error)
    console.error('❌ Error response:', error.response?.data)
    console.error('❌ Error status:', error.response?.status)
    throw error
  }
}

// 5. Google OAuth
export const googleAuth = () => {
  // Redirect to Google OAuth
  window.location.href = 'http://localhost:3000/api/auth/google'
}

// 6. Handle Google OAuth callback
export const handleGoogleCallback = () => {
  // Check URL parameters for auth result
  const urlParams = new URLSearchParams(window.location.search)
  const authResult = urlParams.get('auth')
  const message = urlParams.get('message')
  const needsPhone = urlParams.get('needsPhone') === 'true'

  const cleanup = () => {
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  if (authResult === 'success') {
    console.log('✅ Google OAuth successful!')
    if (needsPhone) {
      // Don't redirect; signal caller to collect phone
      return { auth: 'success', needsPhone: true, cleanup }
    }
    cleanup()
    window.location.href = '/'
    return { auth: 'success', needsPhone: false }
  } else if (authResult === 'error') {
    console.log('❌ Google OAuth failed:', message)
    alert(`Google authentication failed: ${message}`)
    cleanup()
    return { auth: 'error', message }
  }

  return null
}

// 7. Update phone for authenticated user (used after Google OAuth)
export const updatePhone = async (phone) => {
  try {
    const response = await api.post('/auth/phone', { phone })
    return response.data
  } catch (error) {
    throw error
  }
}

export default api
