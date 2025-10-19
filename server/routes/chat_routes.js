import express from 'express'
import { getOrCreateChat, getUserChats, sendMessage, markMessagesAsRead, getOrCreateGlobalChat, getChatMessages } from '../controllers/chat_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

// Get or create chat between two users for a specific item
router.post('/chat', getOrCreateChat)

// Get all chats for current user
router.get('/chats', getUserChats)

// Get messages for a specific chat
router.get('/:chatId/messages', getChatMessages)

// Send a message
router.post('/message', sendMessage)

// Mark messages as read
router.post('/mark-read', markMessagesAsRead)

// Get or create global chat between two users (not item-specific)
router.post('/global-chat', getOrCreateGlobalChat)

export default router
