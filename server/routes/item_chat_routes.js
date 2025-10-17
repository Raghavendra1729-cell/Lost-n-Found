import express from 'express'
import { getItemMessages, deleteItemMessages } from '../controllers/item_chat_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// Get messages for a specific item
router.get('/:itemId/messages', authMiddleware, getItemMessages)

// Delete messages for a specific item (optional)
router.delete('/:itemId/messages', authMiddleware, deleteItemMessages)

export default router

