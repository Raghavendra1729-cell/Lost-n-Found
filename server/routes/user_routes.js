import express from 'express'
import { searchUsers, getUserById } from '../controllers/user_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// All user routes require authentication
router.use(authMiddleware)

// Search users by name or email
router.get('/search', searchUsers)

// Get user by ID
router.get('/:userId', getUserById)

export default router
