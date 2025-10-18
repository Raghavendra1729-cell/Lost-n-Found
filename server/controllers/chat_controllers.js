import Chat from '../models/chat_model.js'
import Object from '../models/object_model.js'

// Get or create chat between two users
export const getOrCreateChat = async (req, res) => {
  try {
    const { otherUserId, itemId } = req.body
    const currentUserId = req.user._id

    if (!otherUserId) {
      return res.status(400).json({ message: 'Other user ID is required' })
    }

    // Check if chat already exists between these users for this specific item
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, otherUserId] },
      itemId: itemId || null
    }).populate('participants', 'name email')

    if (!chat) {
      // Create new chat
      chat = await Chat.create({
        participants: [currentUserId, otherUserId],
        itemId: itemId || null,
        messages: [],
        unreadCounts: [
          { userId: currentUserId, count: 0 },
          { userId: otherUserId, count: 0 }
        ]
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
      participants: userId,
      status: 'active'
    })
    .populate('participants', 'name email')
    .populate('itemId', 'name type location status')
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

    // Mark messages as read for this user
    chat.messages.forEach(message => {
      if (message.senderId.toString() !== userId.toString()) {
        message.read = true
      }
    })

    // Reset unread count for this user
    const unreadCount = chat.unreadCounts.find(uc => uc.userId.toString() === userId.toString())
    if (unreadCount) {
      unreadCount.count = 0
    }

    await chat.save()

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
    const newMessage = {
      senderId,
      content,
      timestamp: new Date(),
      read: false
    }
    
    chat.messages.push(newMessage)

    // Update last message info
    chat.lastMessage = content
    chat.lastMessageTime = new Date()

    // Update unread counts for other participants
    chat.unreadCounts.forEach(uc => {
      if (uc.userId.toString() !== senderId.toString()) {
        uc.count += 1
      }
    })

    await chat.save()
    return chat.messages[chat.messages.length - 1]
  } catch (error) {
    console.error('Save message error:', error)
    throw error
  }
}

// Resolve chat and mark related item as resolved
export const resolveChat = async (req, res) => {
  try {
    const { chatId } = req.params
    const userId = req.user._id

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    // Mark chat as resolved
    chat.status = 'resolved'
    await chat.save()

    // If there's an associated item, mark it as resolved too
    if (chat.itemId) {
      await Object.findByIdAndUpdate(chat.itemId, { status: 'resolved' })
    }

    res.status(200).json({ message: 'Chat resolved successfully', chat })
  } catch (error) {
    console.error('Resolve chat error:', error)
    res.status(500).json({ message: 'Failed to resolve chat', error: error.message })
  }
}

// Archive chat
export const archiveChat = async (req, res) => {
  try {
    const { chatId } = req.params
    const userId = req.user._id

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    chat.status = 'archived'
    await chat.save()

    res.status(200).json({ message: 'Chat archived successfully', chat })
  } catch (error) {
    console.error('Archive chat error:', error)
    res.status(500).json({ message: 'Failed to archive chat', error: error.message })
  }
}

export default {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  saveMessage,
  resolveChat,
  archiveChat
}
