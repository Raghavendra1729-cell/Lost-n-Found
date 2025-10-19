const API_BASE_URL = 'http://localhost:3000/api'

// Get headers for API requests
const getHeaders = () => {
    return {
        'Content-Type': 'application/json'
    }
}

// Get or create chat between two users for a specific item
export const getOrCreateChat = async (itemId, receiverId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/chat`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ itemId, receiverId })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to get or create chat')
        }

        return await response.json()
    } catch (error) {
        console.error('Get or create chat error:', error)
        throw error
    }
}

// Send a message
export const sendMessage = async (receiverId, content, itemId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ receiverId, content, itemId })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to send message')
        }

        return await response.json()
    } catch (error) {
        console.error('Send message error:', error)
        throw error
    }
}

// Get user's chats
export const getUserChats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/chats`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to get user chats')
        }

        return await response.json()
    } catch (error) {
        console.error('Get user chats error:', error)
        throw error
    }
}

// Mark messages as read
export const markMessagesAsRead = async (senderId, itemId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/mark-read`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ senderId, itemId })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to mark messages as read')
        }

        return await response.json()
    } catch (error) {
        console.error('Mark messages as read error:', error)
        throw error
    }
}

// Get chat messages
export const getChatMessages = async (chatId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/${chatId}/messages`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to get chat messages')
        }

        return await response.json()
    } catch (error) {
        console.error('Get chat messages error:', error)
        throw error
    }
}

// Resolve chat and mark related item as resolved
export const resolveChat = async (chatId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/${chatId}/resolve`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include'
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to resolve chat')
        }

        return await response.json()
    } catch (error) {
        console.error('Resolve chat error:', error)
        throw error
    }
}

// Get or create global chat between two users (not item-specific)
export const getOrCreateGlobalChat = async (receiverId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/global-chat`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ receiverId })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to get or create global chat')
        }

        return await response.json()
    } catch (error) {
        console.error('Get or create global chat error:', error)
        throw error
    }
}
