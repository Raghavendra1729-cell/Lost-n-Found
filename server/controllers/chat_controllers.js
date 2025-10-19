import Chat from '../models/chat_model.js'
import Object from '../models/object_model.js'
import User from '../models/user_model.js'

// Get or create chat between two users
export const getOrCreateChat = async (req, res) => {
  try {
    const { itemId, receiverId } = req.body
    const currentUserId = req.user._id

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required' })
    }

    // Check if chat already exists between these users for this specific item
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, receiverId] },
      itemId: itemId || null
    }).populate('participants', 'name email _id')

    if (!chat) {
      // Create new chat
      chat = await Chat.create({
        participants: [currentUserId, receiverId],
        itemId: itemId || null,
        messages: [],
        unreadCounts: [
          { userId: currentUserId, count: 0 },
          { userId: receiverId, count: 0 }
        ]
      })
      
      // Populate participants
        await chat.populate('participants', 'name email _id')
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
    .populate('participants', 'name email _id')
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
    }).populate('participants', 'name email _id')

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

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, itemId } = req.body
    const senderId = req.user._id

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver ID and content are required' })
    }

    // Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
      itemId: itemId || null
    })

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        itemId: itemId || null,
        messages: [],
        unreadCounts: [
          { userId: senderId, count: 0 },
          { userId: receiverId, count: 1 }
        ]
      })
    }

    // Get sender information
    const sender = await User.findById(senderId)
    
    // Create message
    const message = {
      senderId,
      senderName: sender?.name || 'Unknown User',
      content,
      timestamp: new Date(),
      status: 'sent'
    }

    // Add message to chat
    chat.messages.push(message)
    
    // Update unread count for receiver
    const receiverUnread = chat.unreadCounts.find(u => u.userId.toString() === receiverId)
    if (receiverUnread) {
      receiverUnread.count += 1
    }

    await chat.save()

    res.json({
      success: true,
      message: {
        _id: message._id,
        senderId,
        content,
        timestamp: message.timestamp,
        status: 'sent'
      },
      chat: chat
    })
  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({ message: 'Failed to send message', error: error.message })
  }
}

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId, itemId } = req.body
    const currentUserId = req.user._id

    // Find chat
    const chat = await Chat.findOne({
      participants: { $all: [currentUserId, senderId] },
      itemId: itemId || null
    })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    // Reset unread count for current user
    const userUnread = chat.unreadCounts.find(u => u.userId.toString() === currentUserId)
    if (userUnread) {
      userUnread.count = 0
    }

    await chat.save()

    res.json({
      success: true,
      message: 'Messages marked as read'
    })
  } catch (error) {
    console.error('Mark messages as read error:', error)
    res.status(500).json({ message: 'Failed to mark messages as read', error: error.message })
  }
}

// Get or create global chat between two users (not item-specific)
export const getOrCreateGlobalChat = async (req, res) => {
  try {
    const { receiverId } = req.body
    const currentUserId = req.user._id

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required' })
    }

    // Check if global chat already exists between these users
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, receiverId] },
      itemId: null // Global chat has no itemId
    }).populate('participants', 'name email')

    if (!chat) {
      // Create new global chat
      chat = await Chat.create({
        participants: [currentUserId, receiverId],
        itemId: null, // Global chat
        messages: [],
        unreadCounts: [
          { userId: currentUserId, count: 0 },
          { userId: receiverId, count: 0 }
        ]
      })

      // Populate participants
        await chat.populate('participants', 'name email _id')
    }

    // Transform messages to include sender names
    const transformedMessages = chat.messages.map(msg => ({
      ...msg.toObject(),
      senderName: msg.senderName || 'Unknown User'
    }))

    res.json({
      success: true,
      chat: {
        ...chat.toObject(),
        messages: transformedMessages
      }
    })
  } catch (error) {
    console.error('Get or create global chat error:', error)
    res.status(500).json({ message: 'Failed to get or create global chat', error: error.message })
  }
}

export default {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  saveMessage,
  resolveChat,
  archiveChat,
  sendMessage,
  markMessagesAsRead,
  getOrCreateGlobalChat
}
