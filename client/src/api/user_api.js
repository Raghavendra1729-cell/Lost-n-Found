import api from './auth_api.js'

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
