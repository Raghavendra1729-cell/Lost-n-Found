import express from 'express'
import { uploadImage, deleteImage, getImageUrl, upload } from '../controllers/image_controllers.js'
import { authMiddleware } from '../middlewares/auth_middleware.js'

const router = express.Router()

// Upload image (requires authentication)
router.post('/upload', authMiddleware, upload.single('image'), uploadImage)

// Delete image (requires authentication)
router.delete('/delete/:publicId', authMiddleware, deleteImage)

// Get transformed image URL (public route)
router.get('/url/:publicId', getImageUrl)

export default router
