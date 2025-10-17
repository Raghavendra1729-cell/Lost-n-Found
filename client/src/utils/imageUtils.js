// Helper function to get image URL from object
export const getImageUrl = (imageData) => {
  if (!imageData) {
    return 'https://via.placeholder.com/300x200?text=No+Image'
  }
  
  // Handle new Cloudinary image structure
  if (typeof imageData === 'object' && imageData.url) {
    return imageData.url
  }
  
  // Handle old string image URLs
  if (typeof imageData === 'string' && imageData.length > 0) {
    return imageData
  }
  
  // Default placeholder
  return 'https://via.placeholder.com/300x200?text=No+Image'
}

// Helper function to get image dimensions
export const getImageDimensions = (imageData) => {
  if (!imageData || typeof imageData !== 'object') {
    return { width: null, height: null }
  }
  
  return {
    width: imageData.width || null,
    height: imageData.height || null
  }
}

// Helper function to get image info
export const getImageInfo = (imageData) => {
  if (!imageData || typeof imageData !== 'object') {
    return {
      format: 'unknown',
      size: null,
      hasImage: false
    }
  }
  
  return {
    format: imageData.format || 'unknown',
    size: imageData.size || null,
    hasImage: !!(imageData.url && imageData.url.length > 0)
  }
}

export default {
  getImageUrl,
  getImageDimensions,
  getImageInfo
}
