import Chat from '../models/chat_model.js'

// Get or create chat between two users
export const getOrCreateChat = async (req, res) => {
  try {
    const { otherUserId, itemId } = req.body
    const currentUserId = req.user._id

    if (!otherUserId) {
      return res.status(400).json({ message: 'Other user ID is required' })
    }

    // Check if chat already exists between these users
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, otherUserId] }
    }).populate('participants', 'name email')

    if (!chat) {
      // Create new chat
      chat = await Chat.create({
        participants: [currentUserId, otherUserId],
        itemId: itemId || null,
        messages: []
      })
      
      // Populate participants
      await chat.populate('participants', 'name email')
    }

    res.status(200).json({ chat })
  } catch (error) {
    console.error('Chat creation error:', error)
    res.status(500).json({ message: 'Failed to create/get chat', error: error.message })
  }
}

// Get all chats for a user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id

    const chats = await Chat.find({
      participants: userId
    })
    .populate('participants', 'name email')
    .populate('itemId', 'name type location')
    .sort({ lastMessageTime: -1 })

    res.status(200).json({ chats })
  } catch (error) {
    console.error('Get user chats error:', error)
    res.status(500).json({ message: 'Failed to get chats', error: error.message })
  }
}

// Get chat messages
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params
    const userId = req.user._id

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    }).populate('participants', 'name email')

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    res.status(200).json({ 
      chat,
      messages: chat.messages 
    })
  } catch (error) {
    console.error('Get chat messages error:', error)
    res.status(500).json({ message: 'Failed to get messages', error: error.message })
  }
}

// Save message to database
export const saveMessage = async (chatId, senderId, content) => {
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    // Add message to chat
    chat.messages.push({
      senderId,
      content,
      timestamp: new Date()
    })

    // Update last message info
    chat.lastMessage = content
    chat.lastMessageTime = new Date()

    await chat.save()
    return chat.messages[chat.messages.length - 1]
  } catch (error) {
    console.error('Save message error:', error)
    throw error
  }
}

export default {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  saveMessage
}
