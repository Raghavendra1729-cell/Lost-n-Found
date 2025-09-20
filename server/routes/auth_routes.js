import express from 'express'
import { register, login, logout, getProfile, googleAuth, googleCallback } from '../controllers/auth_controllers.js'
import authMiddleware from '../middlewares/auth_middleware.js'

const router = express.Router()

// Public routes (no auth required)
router.post('/register', register)
router.post('/login', login)

// Google OAuth routes
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)

// Protected routes (auth required)
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, getProfile)

export default router