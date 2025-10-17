import cloudinary from 'cloudinary'
import { upload } from '../config/cloudinary.js'

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    console.log('Upload request received:', {
      hasFile: !!req.file,
      fileSize: req.file?.size,
      fileName: req.file?.originalname,
      mimeType: req.file?.mimetype
    })

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' })
    }

    // Check file type
    if (!req.file.mimetype.match(/image\/(jpeg|jpg)/)) {
      return res.status(400).json({ 
        message: 'Only JPEG/JPG images are allowed',
        receivedType: req.file.mimetype
      })
    }

    // Check file size (5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ 
        message: 'File size must be less than 5MB',
        receivedSize: req.file.size
      })
    }

    console.log('Uploading to Cloudinary...')
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        {
          folder: 'lost-found-app',
          resource_type: 'image',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { format: 'jpg' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            console.log('Cloudinary upload successful:', result.public_id)
            resolve(result)
          }
        }
      ).end(req.file.buffer)
    })

    console.log('Upload completed successfully')

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id,
      imageData: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      }
    })
  } catch (error) {
    console.error('Image upload error:', error)
    res.status(500).json({
      message: 'Failed to upload image',
      error: error.message,
      details: error.toString()
    })
  }
}

// Delete image from Cloudinary
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' })
    }

    const result = await cloudinary.v2.uploader.destroy(publicId)

    if (result.result === 'ok') {
      res.status(200).json({ message: 'Image deleted successfully' })
    } else {
      res.status(404).json({ message: 'Image not found' })
    }
  } catch (error) {
    console.error('Image deletion error:', error)
    res.status(500).json({
      message: 'Failed to delete image',
      error: error.message
    })
  }
}

// Get transformed image URL
export const getImageUrl = (req, res) => {
  try {
    const { publicId } = req.params
    const { width, height, crop, quality } = req.query

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' })
    }

    const transformations = {}
    if (width) transformations.width = width
    if (height) transformations.height = height
    if (crop) transformations.crop = crop
    if (quality) transformations.quality = quality

    const imageUrl = cloudinary.v2.url(publicId, {
      ...transformations,
      secure: true
    })

    res.status(200).json({
      imageUrl,
      transformations
    })
  } catch (error) {
    console.error('Get image URL error:', error)
    res.status(500).json({
      message: 'Failed to get image URL',
      error: error.message
    })
  }
}

// Generate placeholder image
export const getPlaceholderImage = async (req, res) => {
  try {
    const { size } = req.params // e.g., "300x200"
    const [width, height] = size.split('x').map(Number)
    
    // Create a simple SVG placeholder
    const svg = `
      <svg width="${width || 300}" height="${height || 200}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#374151"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9CA3AF" text-anchor="middle" dy=".3em">
          No Image
        </text>
      </svg>
    `
    
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', 'public, max-age=31536000')
    res.send(svg)
  } catch (error) {
    console.error('Error generating placeholder:', error)
    res.status(500).json({ message: 'Failed to generate placeholder' })
  }
}

export { upload }
