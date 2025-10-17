import api from './auth_api.js'

// Get or create chat between two users
export const getOrCreateChat = async (otherUserId, itemId = null) => {
  try {
    const response = await api.post('/chat/create', {
      otherUserId,
      itemId
    })
    return response.data
  } catch (error) {
    console.error('Create chat error:', error)
    throw error
  }
}

// Get all chats for current user
export const getUserChats = async () => {
  try {
    const response = await api.get('/chat/list')
    return response.data
  } catch (error) {
    console.error('Get chats error:', error)
    throw error
  }
}

// Get chat messages
export const getChatMessages = async (chatId) => {
  try {
    const response = await api.get(`/chat/${chatId}/messages`)
    return response.data
  } catch (error) {
    console.error('Get messages error:', error)
    throw error
  }
}

export default {
  getOrCreateChat,
  getUserChats,
  getChatMessages
}
