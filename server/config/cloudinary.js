import cloudinary from 'cloudinary'
import multer from 'multer'

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure multer for memory storage
const storage = multer.memoryStorage()

// Create multer upload middleware
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image and allow only JPEG/JPG
    if (file.mimetype.startsWith('image/') && 
        (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG/JPG image files are allowed!'), false)
    }
  }
})

// Helper function to delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    throw error
  }
}

// Helper function to get image URL with transformations
export const getImageUrl = (publicId, transformations = {}) => {
  return cloudinary.v2.url(publicId, {
    ...transformations,
    secure: true
  })
}

export default cloudinary
