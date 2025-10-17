import express from 'express'
import { getOrCreateChat, getUserChats, getChatMessages } from '../controllers/chat_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// Get or create chat between two users
router.post('/create', authMiddleware, getOrCreateChat)

// Get all chats for current user
router.get('/list', authMiddleware, getUserChats)

// Get messages for a specific chat
router.get('/:chatId/messages', authMiddleware, getChatMessages)

export default router
