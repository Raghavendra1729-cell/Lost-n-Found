import express from 'express'
import { getOrCreateChat, getUserChats, getChatMessages, resolveChat, archiveChat } from '../controllers/chat_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// Get or create chat between two users
router.post('/create', authMiddleware, getOrCreateChat)

// Get all chats for current user
router.get('/list', authMiddleware, getUserChats)

// Get messages for a specific chat
router.get('/:chatId/messages', authMiddleware, getChatMessages)

// Resolve chat and mark related item as resolved
router.post('/:chatId/resolve', authMiddleware, resolveChat)

// Archive chat
router.post('/:chatId/archive', authMiddleware, archiveChat)

export default router
