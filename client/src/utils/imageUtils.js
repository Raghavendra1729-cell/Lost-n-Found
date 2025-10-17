// Helper function to get image URL from object
export const getImageUrl = (imageData) => {
  if (!imageData) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
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
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
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
