import api from './auth_api.js'

// Get or create chat between two users for a specific item
export const getOrCreateChat = async (itemId, receiverId) => {
    try {
        const response = await api.post('/chat/chat', { itemId, receiverId })
        return response.data
    } catch (error) {
        console.error('Get or create chat error:', error)
        throw error
    }
}

// Send a message
export const sendMessage = async (receiverId, content, itemId) => {
    try {
        const response = await api.post('/chat/message', { receiverId, content, itemId })
        return response.data
    } catch (error) {
        console.error('Send message error:', error)
        throw error
    }
}

// Get user's chats
export const getUserChats = async () => {
    try {
        const response = await api.get('/chat/chats')
        return response.data
    } catch (error) {
        console.error('Get user chats error:', error)
        throw error
    }
}

// Mark messages as read
export const markMessagesAsRead = async (senderId, itemId) => {
    try {
        const response = await api.post('/chat/mark-read', { senderId, itemId })
        return response.data
    } catch (error) {
        console.error('Mark messages as read error:', error)
        throw error
    }
}

// Get chat messages
export const getChatMessages = async (chatId) => {
    try {
        const response = await api.get(`/chat/${chatId}/messages`)
        return response.data
    } catch (error) {
        console.error('Get chat messages error:', error)
        throw error
    }
}

// Resolve chat and mark related item as resolved
export const resolveChat = async (chatId) => {
    try {
        const response = await api.post(`/chat/${chatId}/resolve`)
        return response.data
    } catch (error) {
        console.error('Resolve chat error:', error)
        throw error
    }
}

// Get or create global chat between two users (not item-specific)
export const getOrCreateGlobalChat = async (receiverId) => {
    try {
        const response = await api.post('/chat/global-chat', { receiverId })
        return response.data
    } catch (error) {
        console.error('Get or create global chat error:', error)
        throw error
    }
}
