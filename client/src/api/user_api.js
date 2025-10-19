import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Search users by name or email
export const searchUsers = async (searchTerm) => {
  try {
    console.log('🔍 Searching users:', searchTerm)
    const response = await api.get(`/users/search?q=${encodeURIComponent(searchTerm)}`)
    console.log('✅ Search response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Search users error:', error.response?.data || error.message)
    throw error
  }
}

// Get user profile
export const getUserProfile = async () => {
  try {
    console.log('🔄 Getting user profile...')
    const response = await api.get('/auth/profile')
    console.log('✅ Profile response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Profile error:', error.response?.data || error.message)
    throw error
  }
}

// Get user by ID
export const getUserById = async (userId) => {
  try {
    console.log('🔄 Getting user by ID:', userId)
    const response = await api.get(`/users/${userId}`)
    console.log('✅ User response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Get user error:', error.response?.data || error.message)
    throw error
  }
}
