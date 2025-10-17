import api from './auth_api'

export const getItemMessages = async (itemId) => {
  try {
    const response = await api.get(`/item-chat/${itemId}/messages`)
    return response.data
  } catch (error) {
    console.error('Error fetching item messages:', error)
    throw error
  }
}

export const deleteItemMessages = async (itemId) => {
  try {
    const response = await api.delete(`/item-chat/${itemId}/messages`)
    return response.data
  } catch (error) {
    console.error('Error deleting item messages:', error)
    throw error
  }
}

export default {
  getItemMessages,
  deleteItemMessages
}

